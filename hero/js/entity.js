class Entity{
	constructor(args){
		this.move(args.tile);
		this.sprite = args?.sprite ?? palettes["HERO"]["ERROR"];
		this.maxHp = args?.hp ?? 3;
		this.hp = this.maxHp;
		this.spritesheet = args?.spritesheet ?? tileset_spritesheet;
	}

	getDisplayX(){
		return this.tile.x + this.offsetX;
	}

	getDisplayY(){
		return this.tile.y + this.offsetY;
	}

	draw(){
		if(this.dead){return}
		let frame_index = perClock(2, "milliseconds", 2)-1;

		draw.drawSprite(	(Math.abs(this.offsetX)>1 || Math.abs(this.offsetY)>1) ? window[`effect${frame_index}_spritesheet`] : this.spritesheet, 
							(Math.abs(this.offsetX)>1 || Math.abs(this.offsetY)>1) ? palettes["HERO"]["EFFECTS"]["WARP"] : this.sprite, 
							this.getDisplayX()+0.125, 
							this.getDisplayY()-(1/16), 
							(5/8),
						);
		if(!this.isPlayer){
			this.drawHp();

		}
	}
}