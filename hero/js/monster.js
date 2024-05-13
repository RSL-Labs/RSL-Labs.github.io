class Monster extends Entity{
	constructor(args){
		super({tile:args.tile, sprite:args.sprite, spritesheet:args?.spritesheet ?? enemy_spritesheet, hp:args.hp})
		this.offsetX = 0;
		this.offsetY = 0;
		this.lastMove = [0, 1];
		
	}


	draw(){
		if(this.teleportCounter > 0){
			let frame_index = perClock(2, "milliseconds", 2)-1;
			draw.drawSprite(gui_spritesheet, palettes["HERO"]["SPARKLE"][frame_index], this.getDisplayX()+0.25, this.getDisplayY()-(1/16), 0.6);

		}else{
			super.draw();
		}

		this.offsetX -= Math.sign(this.offsetX)*(1/8);
		this.offsetY -= Math.sign(this.offsetY)*(1/8);

	}

	drawHp(){
		for(let i=0; i<this.maxHp; i++){
			if(i<this.hp){
				draw.drawSprite(	tileset_spritesheet, 
							palettes["HERO"]["HP"], 
							this.getDisplayX()+0.1+(i%4)*(2/12), 
							this.getDisplayY()+(6/16)-Math.floor(i/4)*(4/16), 
							(0.4)
						);
			}else{
				draw.drawSprite(	tileset_spritesheet, 
							palettes["HERO"]["NP"], 
							this.getDisplayX()+0.1+(i%4)*(2/12), 
							this.getDisplayY()+(6/16)-Math.floor(i/4)*(4/16), 
							(0.4)
						);
			}
		}
	}

	update(){
		this.teleportCounter--;
		this.moveCooldown--;

		if(this.stunned || this.teleportCounter > 0){
			this.stunned = false;
			return
		}

		if(this.moveCooldown <= 0){
			this.doStuff();
			this.moveCooldown = gameEngine.settings.enemy_speed; 
		}

	}

	doStuff(){
		let neighbors = this.tile.getAdjacentPassableNeighbors().filter(t => !t.entity || t.entity.isPlayer);

		if(neighbors.length){
			neighbors.sort((a,b) => a.dist(player.tile) - b.dist(player.tile));
			if(["WIZARD", "BAT"].includes(this.mFamily)){
				neighbors = shuffle(neighbors);
			}
			if(player.stinky){
				neighbors.sort((a,b) => b.dist(player.tile) - a.dist(player.tile))
				this.tile.setEffect(palettes["HERO"]["EFFECTS"]["STINK"], 10)
				player.tile.setEffect(palettes["HERO"]["EFFECTS"]["STINK"], 10)
			}

			let newTile = neighbors[0];

			if(this.ability == "SWAP" && gameEngine.remaining > 0){
				if(roll(100)<10){
					game.playSound("spell");

					let swapTile = map.getGoalTiles()[0];

					[this.tile.name, this.tile.isGoal, swapTile.name, swapTile.isGoal] = [swapTile.name, swapTile.isGoal, this.tile.name, this.tile.isGoal]
					this.tile.setEffect(palettes["HERO"]["EFFECTS"]["SWAP"]);
					swapTile.setEffect(palettes["HERO"]["EFFECTS"]["SWAP"]);

				}else{
					this.tryMove(newTile.x - this.tile.x, newTile.y - this.tile.y);

				}
			}else{
				this.tryMove(newTile.x - this.tile.x, newTile.y - this.tile.y);

			}
		}

	}
	tryMove(dx, dy){
		let newTile = this.tile.getNeighbor(dx,dy);

		if(newTile.passable && (this.isPlayer || (!this.isPLayer && !newTile.playerOnly))){
			if(!newTile.entity){
				this.lastMove = [dx,dy];
				this.move(newTile);
				
			}else{
				if(this.isPlayer != newTile.entity.isPlayer){
					this.attackedThisTurn = true;
					newTile.entity.stunned = newTile.entity.behavior == "NOSTUN" ? false: true;
					if(this.ability == "STEAL" && gold > 0){
						gold = Math.max(0, gold-(50*gameEngine.settings.difficulty));
						this.gold+=1;

					}else{
						newTile.entity.hit(1);

					}
					game.playSound(`hit${roll(2)}`);

					shakeAmount = 5;

					this.offsetX = (newTile.x-this.tile.x)/2;
					this.offsetY = (newTile.y-this.tile.y)/2;
					
					if(this.ability == "STRONGHIT"){
						newTile.entity.hit(1);
						//KNOCKBACK FUNCTION

					}
				}
			}

			return true
		}
	}

	move(tile){
		if(this.tile){
			this.tile.entity = null;
			this.offsetX = this.tile.x - tile.x;
			this.offsetY = this.tile.y - tile.y;

		}
		this.tile = tile;
		tile.entity = this;
		tile.stepOn(this);
	}

	warp(tile){
		if(this.tile){
			this.tile.entity = null;
		}
		this.tile = tile;
		this.offsetX = 0;
		this.offsetY = 0;
		tile.entity = this;
		tile.stepOn(this);
	}

	hit(damage, magic=false){
		if(magic != true){
			if(!this.isPlayer){
				damage+=Math.sign(player.equip.SWORD);
				player.equip.SWORD = Math.max(0, player.equip.SWORD-1);
			}
			if(this.isPlayer){
				damage-=Math.sign(player.equip.ARMOR); 
				player.equip.ARMOR = Math.max(0, player.equip.ARMOR-1);
			}			
		}

		this.hp -= damage;
		if(this.hp <= 0){

			this.die();
			return
		}

	}

	heal(value){
		this.hp = Math.min(this.maxHp, this.hp+1)
	}

	die(){
		game.playSound(this.deathSound);
		this.dead = true;
		this.tile.entity = null;
		if(!this.isPlayer){
			score+=25;
			if(this.gold){
				for(let i=0;i<Math.floor(this.gold/gameEngine.settings.difficulty);i++){
					this.tile.loot.push("GOLD")
				}
			}
			if(this.loot.length && roll(100)<60){
				if(roll(100)<60){
					if(roll(100)<60){
						this.tile.loot.push(shuffle(this.loot)[0])
					}else{
						this.tile.loot.push(shuffle(Object.keys(itemList))[0])
					}
				}else{
					this.tile.loot.push("GOLD")
				}
			}
		}else{
			musicPlayer.newTrack("title");
		}
		this.spritesheet = tileset_spritesheet;
		this.sprite = palettes["HERO"]["REMAINS"];
	}
}

class MonsterFactory extends Monster{
	constructor(args){
		super({tile:args.tile, sprite:bestiary[args.mFamily].sprite, hp:bestiary[args.mFamily].hp});
		this.deathSound = bestiary[args.mFamily].deathSound;
		this.mFamily = args.mFamily;
		this.behavior = bestiary[args.mFamily].behavior;
		this.ability = bestiary[args.mFamily].ability;
		this.gold = 0;
		this.loot = [...bestiary[args.mFamily].loot];
		this.isMonster = true;
		this.teleportCounter = 2;
		this.moveCooldown = gameEngine.settings.enemy_speed;
		if(bestiary[args.mFamily]?.overrides && Object.keys(bestiary[args.mFamily].overrides)?.length){
			for(let [key, value] of Object.entries(bestiary[args.mFamily].overrides)){
				this[key] = value.bind(this)
			};
		};
	};
}

bestiary = {
	//trash mob
	BAT:{
		sprite:palettes["HERO"]["BAT"],
		hp:1,
		deathSound:"deathVermin",
		behavior:"NONE",
		ability:"NONE",
		loot: [],

	},

	//swaps tiles
	WIZARD:{
		sprite:palettes["HERO"]["WIZARD"],
		hp:2,
		deathSound:"deathHuman",
		behavior:"NOSTUN",
		ability:"SWAP",
		loot: ["SCROLL"],

	},

	//steals gold
	THIEF:{
		sprite:palettes["HERO"]["THIEF"],
		hp:3,
		deathSound:"deathHuman",
		behavior:"NONE",
		ability:"STEAL",
		overrides:{
			doStuff: function(){
				this.attackedThisTurn = false;
				Reflect.getPrototypeOf(this).doStuff.apply(this)

				// if(!this.attackedThisTurn){
				// 	Reflect.getPrototypeOf(this).doStuff.apply(this)
				// }
			}
		},
		loot: ["ARMOR"],

	},

	//attacks directly
	SKELETON:{
		sprite:palettes["HERO"]["SKELETON"],
		hp:4,
		deathSound:"deathBeast",
		behavior:"STUNLOCKED",
		ability:"NONE",
		overrides:{
			update: function(){
				let startedStunned = this.stunned;

				Reflect.getPrototypeOf(this).update.apply(this)

				if(!startedStunned && roll(100) < 25){
					this.stunned = true;
					//messageLog.add("Skeleton is thinking.")
				}
			}
		},
		loot: ["SWORD"],

	},
}