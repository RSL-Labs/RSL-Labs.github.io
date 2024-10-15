class Tile{
	constructor(args){
		this.isTile = true;
		this.x = args.x;
		this.y = args.y;
		this.sprite = args.sprite;
		this.spritesheet = args.spritesheet;
		this.decor = [];
		this.passable = args.passable;
		this.isGoal = false;
		this.loot = [];
		
	}

	replace(newTileType){
		tiles[this.x][this.y] = new newTileType({x:this.x, y:this.y});

		return tiles[this.x][this.y];
	}

	draw(){
		if(this instanceof Wall && !(this instanceof Void)){
			draw.drawTile(this.spritesheet, palettes["HERO"]["VOID"], this.x, this.y, 0.5);
			draw.drawTile(this.spritesheet, palettes["HERO"]["VOID"], this.x+0.5, this.y, 0.5);
			draw.drawTile(this.spritesheet, palettes["HERO"]["VOID"], this.x, this.y+0.5, 0.5);
			draw.drawTile(this.spritesheet, palettes["HERO"]["VOID"], this.x+0.5, this.y+0.5, 0.5);
		}
		draw.drawTile(this.spritesheet, this.sprite, this.x, this.y);
		
		if(this instanceof Floor){
			if(this.name != ""){
				draw.drawTile(this.spritesheet, palettes["HERO"]["FLOOR_TILE_LIT"]+(setupSettings.special_dungeon==true?32:0), this.x, this.y);
			}else{
				if(this.isGoal == true){
					draw.drawTile(this.spritesheet, palettes["HERO"]["FLOOR_TILE_CORRECT"]+(setupSettings.special_dungeon==true?32:0), this.x, this.y);
				}else{
					draw.drawTile(this.spritesheet, palettes["HERO"]["FLOOR_TILE_INCORRECT"]+(setupSettings.special_dungeon==true?32:0), this.x, this.y);
				}

			}

			let displayName = this.name[0].split(/[\・|\/|-]/)
			let scaledTextSize = scaleFontToWidth(displayName[0], 22, tileSize*0.9*stretchScale)
			if(displayName.length>1 && scaleFontToWidth(displayName[1], 22, tileSize*0.9*stretchScale) < scaledTextSize){
				
				scaledTextSize = scaleFontToWidth(displayName[1], 22, tileSize*0.9*stretchScale)
			}
			displayName.forEach((e,i) => {
				draw.drawText(	e, 
								scaledTextSize,
								false, 
								(this.x*tileSize*stretchScale)-(tileSize*0.9)+shakeX, 
								this.y*tileSize-(tileSize/3)+shakeY+(tileSize*0.2*i), 
								`${this.name[0] == gameEngine.goal[0][0] && (gameEngine.settings.hint != "off" && gameEngine.mistake_count > 3) ? colorShift("aqua") : (this.isGoal && gameEngine.cheat) ? colorShift("rainbow") : "white"}`,
							);

			})



			if(this.effectCounter){
				this.effectCounter--;
				ctx.globalAlpha = this.effectCounter/30;

				let frame_index = perClock(2, "milliseconds", 2)-1;
				draw.drawSprite(	window[`effect${frame_index}_spritesheet`], 
										this.effect, 
										this.x, 
										this.y, 
										1,
									);
				ctx.globalAlpha = 1;
			}
		}
		
		if(this.loot.length){
			if(this.loot.some(e => e == "CHALICE")){
				draw.drawSprite(	this.spritesheet, 
									palettes["HERO"]["CHALICE"], 
									this.x+0.2, 
									this.y-(1/16), 
									0.6,
								);

			}else if(this.loot.length == 1 && this.loot[0] in palettes["HERO"]){
				draw.drawSprite(	this.spritesheet, 
									palettes["HERO"][this.loot[0]], 
									this.x+0.2, 
									this.y-(1/16), 
									0.6,
								);					

			}else{
				draw.drawSprite(	this.spritesheet, 
									palettes["HERO"]["CHEST"], 
									this.x+0.2, 
									this.y-(1/16), 
									0.6,
								);

			}
		}


		if(this.decor.length){
			let frame_index = perClock(2, "milliseconds", 2)-1;
			draw.drawSprite(decor_spritesheet, this.decor[0][frame_index], this.x, this.y+0.5);
		}
		// if(this.entity){
		// 	this.entity.draw()
		// }
	}

	setEffect(effectSprite, counter=30){
		this.effect = effectSprite;
		this.effectCounter = counter;
	}

	//manhattan distance
	dist(other){
		return Math.abs(this.x-other.x)+Math.abs(this.y-other.y);
	}

	getNeighbor(dx, dy){
		return map.getTile(this.x + dx, this.y + dy)
	}

	getAdjacentNeighbors(){
		return shuffle([
			this.getNeighbor(0, -1),
			this.getNeighbor(0, 1),
			this.getNeighbor(-1, 0),
			this.getNeighbor(1, 0)
		]);
	}

	getSurroundingNeighbors(){
		return shuffle([
			this.getNeighbor(0, -1),
			this.getNeighbor(0, 1),
			this.getNeighbor(-1, 0),
			this.getNeighbor(1, 0),
			this.getNeighbor(1, 1),
			this.getNeighbor(1, -1),
			this.getNeighbor(-1, 1),
			this.getNeighbor(-1, -1)
		]);
	}

	getSurroundingPassableNeighbors(){
		return this.getSurroundingNeighbors().filter(t => t.passable || t.flyable);
	}

	getAdjacentPassableNeighbors(){
		return this.getAdjacentNeighbors().filter(t => t.passable || t.flyable);
	}

	getConnectedTiles(property){
		let connectedTiles = [this];
		let frontier = [this];

		if(property == "passable"){
			while(frontier.length){
				let neighbors = frontier.pop()
									.getAdjacentPassableNeighbors()
									.filter(t => !connectedTiles.includes(t));

				connectedTiles = connectedTiles.concat(neighbors);
				frontier = frontier.concat(neighbors);
			}
			return connectedTiles;
		}else{
			while(frontier.length){
				let neighbors = frontier.pop()
									.getAdjacentNeighbors().filter(t => t[property])
									.filter(t => !connectedTiles.includes(t));

				connectedTiles = connectedTiles.concat(neighbors);
				frontier = frontier.concat(neighbors);
			}
			return connectedTiles;
		}
	}


	processLoot(entity){
			if(this.loot.length){
				this.loot.forEach(e => {
					if(e == "GOLD"){
						gold+=100;
						score+=100;

					}else if(e == "SWORD"){
						player.equip.SWORD = 7-gameEngine.settings.difficulty
						score+=50;

					}else if(e == "ARMOR"){
						player.equip.ARMOR = 7-gameEngine.settings.difficulty
						score+=50;
					
					}else if(["POTION", "REPEL"].includes(e)){
						if(!player.addItem("ITEM", e)){

							if(e == "REPEL"){
								itemList[e].func(player);
								//message: bag full, item used
							}else if(e == "POTION" && player.hp<player.maxHp){
								itemList[e].func(player);
								//message: bag full, item used
							}else{
								gold+=50
								//message: bag full, item not used, gold exchanged
							}
						}
						score+=50;
					}else if(e == "SCROLL"){
						if(!player.addItem("SCROLL")){
							gold+=50
							//message: bag full, gold exchanged
						}
						score+=50;
					}
				})

				game.playSound("treasure");
				this.loot.length = 0;
				map.spawnMonster();
			}


	}

}

class Floor extends Tile{
	constructor(args){
		super({x:args.x, y:args.y, spritesheet:tileset_spritesheet, sprite:args?.sprite ?? palettes["HERO"]["VOID"]+(setupSettings.special_dungeon==true?32:0), passable:true});
	};

	stepOn(entity){
		if(entity.isPlayer){
			this.processLoot(entity);
		};
	}
}

class Wall extends Tile{
	constructor(args){
		super({x:args.x, y:args.y, spritesheet:tileset_spritesheet, sprite:args?.sprite ?? palettes["HERO"]["WALL"]+(setupSettings.special_dungeon==true?32:0), passable:false});
		this.placeable = false;
	};

}

class Void extends Wall{
	constructor(args){
		super({x:args.x, y:args.y, sprite:palettes["HERO"]["VOID"]+(setupSettings.special_dungeon==true?32:0)});
		this.placeable = false;
		this.isVoid = true;
	};
}

class Exit extends Tile{
	constructor(args){
		super({x:args.x, y:args.y, spritesheet:tileset_spritesheet, sprite:palettes["HERO"]["STAIR"]+(setupSettings.special_dungeon==true?32:0), passable:true});
		if(gameEngine.level == gameEngine.current_library.length){
			this.sprite = palettes["HERO"]["FLOOR_PEDASTAL"]+(setupSettings.special_dungeon==true?32:0)
			this.loot = ["CHALICE"];
			this.playerOnly = true;
		}

	}

	stepOn(entity){
		if(entity.isPlayer){
			this.processLoot(entity);

			if(gameEngine.level == gameEngine.current_library.length){
				if(gameEngine.perfect_run == true){
					score+=50000;
				}
				gameEngine.won = true;
				game.addScore(score, true);
				game.playSound("success");
				Transition.fade = "toBlack";
				musicPlayer.newTrack("victory", false);
				music[musicPlayer.currentTrack].loop = false;
				Transition.onFinish = game.showVictory.bind(this);

			}else{
				if(gameEngine.perfect_level){
					gameEngine.perfect_level_streak++;
					score+=(1000*gameEngine.perfect_level_streak)
				}else{
					gameEngine.perfect_level = true;
				}
				gameEngine.level++;
				Transition.fade = "toBlack";
				game.playSound("newLevel");
				Transition.onFinish = game.nextLevel.bind(this,Math.min(player.maxHp, player.hp+1));
				//game.nextLevel(Math.min(player.maxHp, player.hp+1));
			}
		}
	}
}