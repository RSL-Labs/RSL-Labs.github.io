class ITEM{
	constructor(args){
		this.name = args.name;
		this.itemType = "ITEM"
		//this.desc = itemList[args.name].desc;
	}
}

itemList = {
	POTION: {
		func: function(entity){
			entity.heal(1);
		},
	},

	REPEL: {
		func: function(entity){
			entity.stinky = 12 - gameEngine.settings.difficulty;
			entity.tile.setEffect(palettes["HERO"]["EFFECTS"]["STINK"]);
			monsters.forEach(m => m.tile.setEffect(palettes["HERO"]["EFFECTS"]["STINK"]));
		},
	},


}