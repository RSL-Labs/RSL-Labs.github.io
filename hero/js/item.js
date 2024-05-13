class ITEM{
	constructor(args){
		this.name = args.name;
		this.itemType = "ITEM"
		this.desc = itemList[args.name].desc;
	}
}

item_Translation={
	POTION:"ポーション",
	REPEL:"よけ",
}

itemList = {
	POTION: {
		desc: () => {return gameMenu.language == "ja" ? "HPを回復します。" : "Heals your HP."},
		func: function(entity){
			entity.heal(1);
		},
	},

	REPEL: {
		desc: () => {return gameMenu.language == "ja" ? "短時間モンスターを撃退します。" : "Repels monsters for a short time."},
		func: function(entity){
			entity.stinky = 12 - gameEngine.settings.difficulty;
			entity.tile.setEffect(palettes["HERO"]["EFFECTS"]["STINK"]);
			monsters.forEach(m => m.tile.setEffect(palettes["HERO"]["EFFECTS"]["STINK"]));
		},
	},


}