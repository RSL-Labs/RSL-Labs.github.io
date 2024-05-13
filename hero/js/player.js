class Player extends Monster{
	constructor(tile, hp=gameEngine.settings.startingHP){
		super({tile:tile, sprite:palettes["HERO"]["HERO"], spritesheet:tileset_spritesheet, hp:hp})
		this.isPlayer = true;
		this.deathSound = "deathHuman";
		this.teleportCounter = 0;
		this.equip = {SWORD:0, ARMOR:0};
		this.items = Array(8).fill(undefined);
		this.stinky = 0;

		if(globalDebug){
			this.debugActive()
		}
	}

	debugActive(){
		this.equip = {SWORD:6, ARMOR:6};
		gold = 1000;
		["ITEM","ITEM","ITEM","ITEM","SCROLL","SCROLL","SCROLL","SCROLL"].forEach(e => this.addItem(e))
	}

	tryMove(dx, dy){
		if(this.lastMove[0]!=dx || this.lastMove[1]!=dy){
			this.lastMove = [dx,dy];
			return;	
		}
		this.lastMove = [dx,dy];
		if(super.tryMove(dx, dy)){
			game.tick();
			gameEngine.mistake_count = Math.min(3, gameEngine.mistake_count);
			this.stinky = Math.max(0, this.stinky-1)
		}
	}

	addItem(itemType, itemName){
		let slots = this.items.map((e,i) => {if(e == undefined){ return i}})

		if(itemType == "ITEM"){
			if(slots.some(e => e <= 3)){
				if(itemName == undefined){
					itemName = shuffle(Object.keys(itemList))[0]
				}
				let newItem = new ITEM({name:itemName});
				this.items[this.items.indexOf(undefined)] = newItem;

				return true;

			}else{
				return false;
			}

		}else if(itemType == "SCROLL"){
			if(slots.some(e => e >= 4)){
				let newSpell = new SPELL({name:shuffle(Object.keys(spellList))[0]});
				this.items[this.items.indexOf(undefined,4)] = newSpell;

				return true;

			}else{
				return false;
			}
		}

		return false;
	}

	useItem(item, index){
		if(this.items[index]){
			if(item.itemType == "SCROLL"){
				if(spellList[item.name]){
					spellList[item.name].func(this, index);
					game.playSound("spell");
				}
			
			}else if(item.itemType == "ITEM"){
				if(itemList[item.name]){
					itemList[item.name].func(this);
					game.playSound("spell");
				}
			}

			if(item.name != "COPY"){
				this.items[index] = undefined;

			}
			game.tick();
		}
	}
}