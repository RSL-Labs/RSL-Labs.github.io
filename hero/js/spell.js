class SPELL{
	constructor(args){
		this.name = args.name;
		this.itemType = "SCROLL";
	}
}

spellList = {
	WARP:  {
		func: function(entity){
			entity.move(map.randomPassableTile());
		},
	},

	STORM:  {
		func: function(entity){
			monsters.forEach(m => {m.move(map.randomPassableTile()); m.moveCooldown+=2})
		},
	},

	AURA:  {
		func: function(entity){
			entity.heal(1);
			player.tile.setEffect(palettes["HERO"]["EFFECTS"]["HEAL"]);
			entity.tile.getAdjacentNeighbors().forEach(t => {
				t.setEffect(palettes["HERO"]["EFFECTS"]["HEAL"]);
				if(t.entity){
					if(t.entity.mFamily == "SKELETON"){
						t.entity.hit(2, true);

					}else{
						t.entity.heal(1);

					}
				}
			})
		},
	},

	THUNDER:  {
		func: function(entity){
			let directions = [
					[0, -1],
					[0, 1],
					[-1,0],
					[1, 0],
				];

			for(let k=0; k<directions.length; k++){
				boltTravel(directions[k], palettes["HERO"]["EFFECTS"]["LIT_H"]-Math.abs(directions[k][1]), 2);	
			}
		},
	},

	FIREBALL:  {
		func: function(entity){
			//ballTravel(entity.lastMove, palettes["HERO"]["EFFECTS"]["FIREBOLT_H"]-Math.abs(entity.lastMove[1]), 3);
			ballTravel(entity.lastMove, palettes["HERO"]["EFFECTS"]["FIREBALL"], 3);
		},
	},

	FREEZE:  {
		func: function(entity){
			monsters.forEach(m => {
				m.moveCooldown+=3;
				m.tile.setEffect(palettes["HERO"]["EFFECTS"]["FREEZE"]);
			});
		},
	},

	STEAL:  {
		func: function(entity){
			monsters.forEach(m => {
				m.tile.loot.push("GOLD")
				m.tile.setEffect(palettes["HERO"]["EFFECTS"]["HEAL"]);
			});

		},
	},

	STUDY:  {
		func: function(entity){
			let wrong_tiles = floor_tiles.filter(t => t.name[0] != "" && !t.isGoal);
			wrong_tiles = shuffle(wrong_tiles);
			wrong_tiles.length = Math.ceil(wrong_tiles.length*(3/8));
			wrong_tiles.forEach(t => {
				t.name = [""];
				t.setEffect(palettes["HERO"]["EFFECTS"]["STUDY"]);
			});


		},
	},

	COPY:  {
		func: function(entity, index){
			let spellInventory = entity.items.filter(e => e != undefined && e.itemType == "SCROLL" && e.name != "CHEAT").map(e => e.name);

			entity.items[index] = new SPELL({name:shuffle(spellInventory)[0]});
			entity.tile.setEffect(palettes["HERO"]["EFFECTS"]["COPY"])
		},
	},

	CHEAT:  {
		func: function(entity){
			let penalty = shuffle(["GOLD", "HP", "SPAWN", "SCORE", "ITEM", "BONUS"])[0]
			entity.tile.setEffect(palettes["HERO"]["EFFECTS"]["CHEAT"]);


			switch(penalty){
				case "SPAWN":
					map.spawnMonster({force:true});
					break;
					//WILL ALWAYS HAPPEN SO NO FALLTHRU

				case "GOLD":
					if(gold){
						gold = Math.ceil(gold*0.5);
						break;
					}
					//FALLTHRU IF NO GOLD TO LOSE

				case "HP":
					if(entity.hp > 1){
						entity.hp = Math.max(1, Math.ceil(entity.hp*0.5));
						break;
					}
					//FALLTHRU IF NO HP TO LOSE (at min hp already)

				case "ITEM":
					let slots = entity.items.map((e,i) => {if(e != undefined){ return i}}).filter(e => e<4);

					if(slots.length){
						entity.items[shuffle(slots)[0]] = undefined;
						break;
					}
					//FALLTHRU IF NO ITEMS TO LOSE

				case "SCROLL":
					slots = entity.items.map((e,i) => {if(e != undefined){ return i}}).filter(e => e>3);

					if(slots.length > 1){
						entity.items[shuffle(slots)[0]] = undefined;
						break;
					}
					//FALLTHRU IF NO SCROLLS TO LOSE

				case "BONUS":
					if(player.equip.SWORD && player.equip.ARMOR){
						player.equip[shuffle(["SWORD","ARMOR"])[0]] = 0;
						break;
					}else{
						player.equip.SWORD ? player.equip.SWORD = 0 : player.equip.ARMOR = 0;
						break;
					}
					//FALLTHRU IF NO BONUSES TO LOSE

				case "SCORE":
					if(score){
						score = Math.max(0, score-1000);
						break;
					}
					//FALLTHRU IF NO SCORE TO LOSE (extremely rare case)

				default:
					//message: you have nothing to lose but honor
			}

			gameEngine.cheat = true;
			//map.getGoalTiles().forEach(t => t.cheated = true)
		},
	},
}

function ballTravel(direction, effect, damage){
	let newTile = player.tile;

	let increment = 0;
	while(true){
		let testTile = newTile.getNeighbor(direction[0], direction[1]);
		if(testTile.passable){
			newTile = testTile;
			
			setTimeout(proc.bind(this, newTile), 100*increment);
			function proc(newTile){
				newTile.setEffect(effect)
				if(newTile.entity){
					newTile.entity.hit(damage);
				}
			}
			if(newTile.entity){
				//break;
			}
		}else{
			break;
		}
		increment++;
	}
}

function boltTravel(direction, effect, damage){
	let newTile = player.tile;

	while(true){
		let testTile = newTile.getNeighbor(direction[0], direction[1]);
		if(testTile.passable){
			newTile = testTile;
			newTile.setEffect(effect)
			if(newTile.entity){
				newTile.entity.hit(damage);
			}
		}else{
			break;
		}
	}
}