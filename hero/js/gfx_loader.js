palettes = {

	HERO:{
		ERROR:25,
		EMPTY_ENTITY:9,

		//GUI
		// HP:16,
		// NP:20,
		HP:102,
		NP:103,
		SPARKLE: [102,103],

		//PLAYER
		HERO:32,
		DEFEAT:129,

		//TERRAIN
		VOID:31,
		VOID_STAR:31,
		FLOOR:1,
		FLOOR_TILE_LIT:26,
		FLOOR_TILE_UNLIT:27,
		FLOOR_TILE_CORRECT:28,
		FLOOR_TILE_INCORRECT:29,
		FLOOR_PEDASTAL:30,
		STAIR:2,
		WALL:41,
		WALL_N:42,
		WALL_S:43,
		WALL_NS:44,
		WALL_W:45,
		WALL_NW:46,
		WALL_SW:47,
		WALL_NSW:48,
		WALL_E:49,
		WALL_NE:50,
		WALL_SE:51,
		WALL_NSE:52,
		WALL_EW:53,
		WALL_EWS:54,
		WALL_EWN:55,
		WALL_ALL:56,
		WALL_ERR:57,

		//EFFECTS
		EFFECTS:{
			SWAP:85,
			WARP:68,
			HEAL:70,
			LIT_V:18,
			LIT_H:19,
			FIREBALL:82,
			FREEZE:59,
			STEAL:78,
			STUDY:79,
			COPY:77,
			CHEAT:73,
			STINK:83,
		},

		//ENEMIES
		REMAINS:161,
		BAT:20,
		WIZARD:80,
		THIEF:10,
		SKELETON:150,

		//ITEMS
		CHEST:132,
		GOLD:69,
		POTION:64,
		SCROLL:66,
		CHALICE:67,
		DAGGER:96,
		SWORD:97,
		ARMOR:131,
		REPEL:98,
	},

	DECOR: {
		
		WALL_TORCH:419,
		WALL_TORCH_ANIM:[419,420,420,420,419,419,420],

	},
}

gfx_loader = {

	load_gfx: function(){
		title_logo = new Image();
		title_logo.src = "gfx/Cool Text - English    Hero 450560715032401.png";
		title_logo.width = 954;
		title_logo.height = 272;

		gui_spritesheet = new Image();
		gui_spritesheet.src = 'gfx/GUI0.png';
		gui_spritesheet.tw = 16;
		gui_spritesheet.th = 23;

		enemy_spritesheet = new Image();
		enemy_spritesheet.src = 'gfx/enemies_16x16.png';
		enemy_spritesheet.tw = 10;
		enemy_spritesheet.th = 30;

		effect0_spritesheet = new Image();
		effect0_spritesheet.src = 'gfx/Effect0.png';
		effect0_spritesheet.tw = 9;
		effect0_spritesheet.th = 6;

		effect1_spritesheet = new Image();
		effect1_spritesheet.src = 'gfx/Effect1.png';
		effect1_spritesheet.tw = 9;
		effect1_spritesheet.th = 6;

		tileset_spritesheet = new Image();
		tileset_spritesheet.src = `gfx/tileset_16x16.png`;
		tileset_spritesheet.tw = 32;
		tileset_spritesheet.th = 8;

		decor_spritesheet = new Image();
		decor_spritesheet.src = 'gfx/decor_16x16.png';
		decor_spritesheet.tw = 32;
		decor_spritesheet.th = 32;

	},
}