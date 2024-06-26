function GTDICT(indexText){
	let indexLanguage = navigator.language.toUpperCase();
	if(indexLanguage.includes("EN")){
		indexLanguage = "EN";
	}

	if(gameMenu?.settings.language[0] == "日本語" || indexLanguage == "JP"){
		indexLanguage = "JP"
	}else{
		indexLanguage = "EN"
	}

	let dictTable = {
			//TEMPLATE
					TEMP1:{
						EN:"HELLO",
						JP:"こんにちは",
					},

			//MENU TEXT
					MAINMENU:{
						EN:"MAIN MENU",
						JP:"メイン　メニュー",
					},
					START:{
						EN:"START ADVENTURE",
						JP:"冒険を始める",
					},
					CONTENTS:{
						EN:"CHOOSE YOUR CONTENTS",
						JP:"コンテンツを選ぼう",
					},
					CODE:{
						EN:"ENTER A CODE",
						JP:"コード入力",
					},
					ENTERCODE:{
						EN:"Please Enter the code.",
						JP:"コードを入力してください。",
					},
					CODEERROR:{
						EN:"Wrong or Unknown Code, Please Try Again!",
						JP:"コードが間違っているか不明です。もう一度入力してください。",
					},
					DIFFICULTY:{
						EN:"CHOOSE YOUR DIFFICULTY",
						JP:"難易度を選ぼう",
					},
					EASY:{
						EN:"EASY",
						JP:"かんたん",
					},
					EASYDESC:{
						EN:["   Answers: 3",	"   HP: +7", "   Mistake: No Penalty ", 			"   Enemy Speed: Slow", 		"   Enemy Count: 3", 	"   Hint: Always"],
						JP:["   答えの数: 3",		"   HP: +7", "   間違え: ペナルティなし ", 				"   敵の速さ: おそい", 				"   敵の数: 3", 			"   ヒント: ずっと"],
					},
					MEDIUM:{
						EN:"MEDIUM",
						JP:"ふつう",
					},
					MEDIUMDESC:{
						EN:["   Answers: 4",	"   HP: +6", "   Mistake: Score ⁻100", 				"   Enemy Speed: Normal", 		"   Enemy Count: 4", 	"   Hint: On Mistake"],
						JP:["   答えの数: 4",		"   HP: +6", "   間違え: スコアー　 ⁻100", 				"   敵の速さ: ふつう", 				"   敵の数: 4", 			"   ヒント: 間違えから"],
					},
					HARD:{
						EN:"HARD",
						JP:"むずかしい",
					},
					HARDDESC:{
						EN:["   Answers: 5",	"   HP: +5", "   Mistake: Score ⁻100 ➜ HP ⁻1 ", 	"   Enemy Speed: Normal", 		"   Enemy Count: 5", 	"   Hint: On Mistake"],
						JP:["   答えの数: 5",		"   HP: +5", "   間違え: スコアー　 ⁻100 ➜ HP ⁻1 ", 	"   敵の速さ: ふつう", 				"   敵の数: 5", 			"   ヒント: 間違えから"],
					},
					CRAZY:{
						EN:"CRAZY",
						JP:"おバカ",
					},
					CRAZYDESC:{
						EN:["   Answers: 5",	"   HP: +4", "   Mistake: Score ⁻100 & HP ⁻1", 		"   Enemy Speed: Fast Speed", 	"   Enemy Count: 5", 	"   Hint: None"],
						JP:["   答えの数: 5",		"   HP: +4", "   間違え: スコアー　 ⁻100 & HP ⁻1", 		"   敵の速さ: はやい", 				"   敵の数: 5", 			"   ヒント: なし"],
					},
					STYLE:{
						EN:"CHOOSE YOUR STYLE:",
						JP:"様式を選ぼう",
					},
					STYLETEXTEN:{
						EN:"JAPANESE to ENGLISH",
						JP:"日本語　=>　英語",
					},
					STYLEDESCEN:{
						EN:["Goal Word in Japanese", "Map Answers in English."],
						JP:["ゴールは日本語", "マップは英語"],
					},
					STYLETEXTJP:{
						EN:"ENGLISH to JAPANESE",
						JP:"英語　　=>　日本語",
					},
					STYLEDESCJP:{
						EN:["Goal Word in English", "Map Answers in Japanese."],
						JP:["ゴールは英語", "マップは日本語"],
					},
					MENU:{
						EN:"MENU",
						JP:"メニュー",
					},
					BAG:{
						EN:"BAG",
						JP:"バッグ",
					},
					EMPTYBAG:{
						EN:"The bag is empty.",
						JP:"バッグが空です。",
					},
					SETTINGS:{
						EN:"SETTINGS",
						JP:"設定",
					},
					SFX:{
						EN:"SFX",
						JP:"音",
					},
					BGM:{
						EN:"BGM",
						JP:"音楽",
					},
					ON:{
						EN:"ON",
						JP:"オン",
					},
					OFF:{
						EN:"OFF",
						JP:"オッフ",
					},
					BACKGROUND:{
						EN:"BG COLOR",
						JP:"背景色",
					},
					LANGUAGE:{
						EN:"LANGUAGE",
						JP:"言語",
					},
					QUIT:{
						EN:"QUIT",
						JP:"やめる",
					},
					QUITTEXT:{
						EN:"Do you want to quit?",
						JP:"このゲームをやめましょうか？",
					},
					CONFIRM:{
						EN:"Confirm?",
						JP:"よろしい？",
					},
					CANCEL:{
						EN:"CANCEL",
						JP:"キャンセル",
					},
					ACCEPT:{
						EN:"ACCEPT",
						JP:"はい",
					},

			//UI TEXT
					HINT:{
						EN:"HINT",
						JP:"ヒント",
					},

			//GAME TEXT
					GAME1:{
						EN:"",
						JP:"",
					},

			//ITEM TEXT
					POTION:{
						EN:"POTION",
						JP:"ポーション",
					},
					POTIONDESC:{
						EN:"Heals your HP.",
						JP:"HPを回復します。",
					},
					REPEL:{
						EN:"REPEL",
						JP:"化物よけ",
					},
					REPELDESC:{
						EN:"Repels monsters for a short time.",
						JP:"短時間モンスターを撃退します。",
					},

			//SCROLL TEXT
					WARP:{
						EN:"WARP",
						JP:"ワープ",
					},
					WARPDESC:{
						EN:"Moves you to a random tile.",
						JP:"ランダムなタイルに移動させます。",
					},
					STORM:{
						EN:"STORM",
						JP:"ストーム",
					},
					STORMDESC:{
						EN:"Moves all monsters to a random tile.",
						JP:"すべてのモンスターをランダムなタイルに移動させます。",
					},
					AURA:{
						EN:"AURA",
						JP:"オーラ",
					},
					AURADESC:{
						EN:"Heals yours, and surrounding monsters' HP.",
						JP:"自分と周囲のモンスターのHPを回復します。",
					},
					THUNDER:{
						EN:"THUNDER",
						JP:"サンダー",
					},
					THUNDERDESC:{
						EN:"Shoots lightning in four directions around you.",
						JP:"周囲4方向に稲妻を発射します。",
					},
					FIREBALL:{
						EN:"FIREBALL",
						JP:"ファイボール",
					},
					FIREBALLDESC:{
						EN:"Shoots a ball of fire in the last direction that you moved.",
						JP:"先に移動した方向に火の玉を発射します。",
					},
					FREEZE:{
						EN:"FREEZE",
						JP:"フリーズ",
					},
					FREEZEDESC:{
						EN:"Freezes monsters for a short time.",
						JP:"モンスターを短時間凍結させます。",
					},
					STEAL:{
						EN:"STEAL",
						JP:"ぬすむ",
					},
					STEALDESC:{
						EN:"All enemies drop some gold.",
						JP:"すべての敵がゴールドを落とします。",
					},
					STUDY:{
						EN:"STUDY",
						JP:"がくしゅう",
					},
					STUDYDESC:{
						EN:"Clears some incorrect answer tiles.",
						JP:"いくつかの不正解なタイルを消去します。",
					},
					COPY:{
						EN:"COPY",
						JP:"コピー",
					},
					COPYDESC:{
						EN:"Copies one of another scroll in your bag.",
						JP:"バッグ内の別の巻物を 1 つをコピーします。",
					},
					CHEAT:{
						EN:"CHEAT",
						JP:"チート",
					},
					CHEATDESC:{
						EN:"Highlights all remaining correct answer tiles,\n　　but has a random penalty.",
						JP:"残りの正解タイルをすべて強調表示しますが\n　　ランダムなペナルティが発生します。",
					},
		}

	return dictTable[indexText][indexLanguage];
}

class textBox{
	constructor(opts){
	this.name = opts.name;

	this.states = [];
	this.colorBkgd = gameState == "running" ? (opts.colorBkgd || "darkblue") : "black";
	this.colorOutline = opts.colorOutline || "white";
	this.colorText = opts.colorText || "white";

	this.x = opts.x;
	this.y = opts.y;
	this.h = opts.h;
	this.w = opts.w;
	this.centerX = opts?.centerX ?? false
	this.centerY = opts?.centerY ?? false
	
	this.x2 = opts.x+opts.w;
	this.y2 = opts.y+opts.h;


	}

	drawSelf(){
		//FILL
		const gradient = ctx.createLinearGradient(0, this.y, 0, this.y+this.h);
		const colorStops = nameToGradient(gameMenu.settings.colorBkgd[0]);
		gradient.addColorStop(0, colorStops[0]);
		gradient.addColorStop(0.5, colorStops[1]);
		gradient.addColorStop(1, colorStops[2]);
		ctx.globalAlpha = 0.9;
		ctx.beginPath();
		ctx.fillStyle = gradient;
		ctx.roundRect(this.x, this.y, this.w, this.h, 8);
		ctx.fill();
		ctx.globalAlpha = 1;
		
		//BORDER
		ctx.lineWidth = 4;
		ctx.strokeStyle = "grey";
		ctx.beginPath();
		ctx.roundRect(this.x, this.y, this.w, this.h, 8);
		ctx.stroke();
		ctx.lineWidth = 2.5;
		ctx.strokeStyle = "white";
		ctx.beginPath();
		ctx.roundRect(this.x, this.y, this.w, this.h, 8);
		ctx.stroke();

		//TEXT
		ctx.fillStyle = this.colorText;
		let defaultSize = 20
		ctx.font = `normal ${defaultSize}px Arial`;
		let name_width_table = this.name.map(e => ctx.measureText(e).width);
		//let name_height = this.name.length*ctx.measureText("j").fontBoundingBoxAscent;
		let name_height = ctx.measureText("j").fontBoundingBoxDescent+ctx.measureText("h").fontBoundingBoxAscent;

		while(name_width_table.some(e => e > this.w-10) || name_height > this.h-10){
			defaultSize--;
			ctx.font = `normal ${defaultSize}px Arial`;

			name_width_table = this.name.map(e => ctx.measureText(e).width);
			name_height = ctx.measureText("j").fontBoundingBoxDescent+ctx.measureText("h").fontBoundingBoxAscent;

		}

		let textX = this.centerX == true ? this.x+(this.w*0.5)-(ctx.measureText(this.name[0]).width*0.5)-tileSize : this.x+10-tileSize;
		let textY = this.centerY == true ? this.y+(this.h*0.5)-(name_height)-spacing(2.5) : this.y+10-tileSize*0.5;

		if(this.name instanceof Array){

			// var line_shrink = 0;

			// for(let i=0; i<this.name.length; i++){
			// 	if(i>0){ line_shrink = this.name.length - 2 };

			// 	ctx.font = "normal "+(12-(line_shrink*2))+"px Meiryo";
			// 	let centerX = (this.w/2) - ctx.measureText(this.name[i]).width/2;

			// 	ctx.fillText(this.name[i], textX+centerX, textY+(i*(14-(line_shrink*2))));	
			// }
			this.name.forEach((e,i) => {
				draw.drawText(
					this.name[i],
					defaultSize,
					false,
					textX,
					textY+i*defaultSize,
					this.colorText,
				);
			})

		}else{
			draw.drawText(
					this.name,
					defaultSize,
					false,
					textX,
					textY,
					this.colorText,
				);
		};
	}
}

class menuButton extends textBox{
	constructor(opts){
		super(opts)
		this.func = opts.func;
		this.name = [this.name[0]].concat(wrapText(this.name[1],8,2));

	}

	drawSelf(){
		ctx.lineWidth = "2";
		ctx.strokeStyle = this.colorOutline;
		ctx.fillStyle = this.colorBkgd;
		ctx.beginPath();
		ctx.roundRect(this.x, this.y, this.w, this.h, 8);
		ctx.fill();
		ctx.stroke();

		ctx.fillStyle = this.colorText;
		ctx.font = "normal 14px Arial";
		let textX = this.x;
		let textY = this.y+12;

		if(this.name instanceof Array){
			var line_shrink = 0;

			for(let i=0; i<this.name.length; i++){
				if(i>0){ line_shrink = this.name.length - 2 };

				ctx.font = "normal "+(12-(line_shrink*2))+"px Arial";
				let centerX = (this.w/2) - ctx.measureText(this.name[i]).width/2;

				ctx.fillText(this.name[i], textX+centerX, textY+(i*(14-(line_shrink*2))));	
			}

		}else{
			ctx.fillText(this.name, textX, textY);
		}
	}

	clickCheck(data){
		if(this.x <= data.x && data.x <= this.x2 && this.y <= data.y && data.y <= this.y2){
			this.func();
			return true;
		}else{
			return false;
		}
	}
}

class GameMenu{
	constructor(){
		this.currentMenus = [];
		this.isActive = false;
		this.isDirty = true;
		this.loading = false;
		this.currentOption = 0;
		this.prevOption = 0;
		this.lastOptionDir = 0;
		//this.language = "EN";
		this.language = navigator.language.toUpperCase();
		if(this.language.includes("EN")){
			this.language = "EN"
		}

		this.defaults = {
				header : "DEFAULT",
				text: "",
				x : 20,
				y : 20,
				width : viewSize*tileSize - 40,
				height : viewHalf*tileSize,
				alpha : 0.9,
				//textColor: "white",
				optionsSelectable:true,
				border : {
					color : "white",
					width : 4,
					},
				}

		this.settings = {
				isMuted : false,

				colorBkgd : ["blue","maroon","darkgreen","black","dimgray"],
				colorOutline : this.defaults.border.color,
				colorText : ["white","black"],
				sfx : true,
				music : true,
				language: ["English", "日本語"],
			}

		this.applySettings();

	}

	applySettings(){
		this.menuData = {
			default: this.defaults,

			// title : {
			// 	header : GTDICT("TITLE"),
			// 	text: "",
			// 	x : viewHalf*tileSize,
			// 	y : viewHalf*tileSize,
			// 	width : viewHalf*tileSize,
			// 	//heightOverride: spacing(8),
			// 	center: true,
			// 	border : "default",
			// },

			settings : {
				header : GTDICT("SETTINGS"),
				text: "",
				x:this.currentMenus[0] == "mainMenu" ? (viewHalf+1)*tileSize : 0.5*tileSize*stretchScale,//(numTilesX-4)*tileSize,
				y:spacing(4),
				width : 4*tileSize,
				//heightOverride: spacing(4),
				border : "default",
				options:[
					{menu_id:"SFX", text:`${GTDICT("SFX")}: `+(this.settings.sfx ? `${GTDICT("ON")}` : `${GTDICT("OFF")}`)},
					{menu_id:"MSC", text:`${GTDICT("BGM")}: `+(this.settings.music ? `${GTDICT("ON")}` : `${GTDICT("OFF")}`)},
					{menu_id:"BKGD", text:`${GTDICT("BACKGROUND")}: `+toTitleCase(this.settings.colorBkgd[0])},
					{menu_id:"LANG", text:`${GTDICT("LANGUAGE")}: ${(this.settings.language[0])}`},
					],
			},

			mainMenu : {
				header : GTDICT("MAINMENU"),
				text: "",
				x : viewHalf*tileSize+tileSize,
				y : spacing(4),
				width : spacing(16),
				//heightOverride: spacing(3),
				center: true,
				border : "default",
				options:[ 
					{menu_id:"STARTGAME",text:GTDICT("START")},
					{menu_id:"SETTINGS",text:GTDICT("SETTINGS")},
					],
			},

			contentSelect: {
				header : GTDICT("CONTENTS"),
				text: "",
				x : viewHalf*spacing(4),
				y : spacing(1),
				center: true,
				options:[{menu_id:"CONTENTS",text:"CONTENTS", icon:" ", color:"white", v_index:0, l_index:0}],
				optionsDisplayLength:6,
				width:spacing(30),
				heightOverride: spacing(26),
				optionsSelectable:true,
			},

			difficultySelect : {
				header : GTDICT("DIFFICULTY"),
				text: "",
				x : viewHalf*tileSize,
				y : tileSize,
				width : spacing(24),
				heightOverride: spacing(14),
				center: true,
				border : "default",
				options:[ 
					{menu_id:"CHOOSEDIFFICULTY", text:GTDICT("EASY"), 	diff:"EASY",	detail:["=======================",...GTDICT("EASYDESC")]},

					{menu_id:"CHOOSEDIFFICULTY", text:GTDICT("MEDIUM"), diff:"MEDIUM",	detail:["=======================",...GTDICT("MEDIUMDESC")]},

					{menu_id:"CHOOSEDIFFICULTY", text:GTDICT("HARD"),	diff:"HARD",	detail:["=======================",...GTDICT("HARDDESC")]},

					{menu_id:"CHOOSEDIFFICULTY", text:GTDICT("CRAZY"),	diff:"CRAZY",	detail:["=======================",...GTDICT("CRAZYDESC")]},
					],
				optionsDisplayLength:4,
			},

			methodSelect : {
				header : GTDICT("STYLE"),
				text: "",
				x : viewHalf*tileSize,
				y : tileSize,
				width : spacing(20),
				heightOverride: spacing(12),
				center: true,
				border : "default",
				options:[ 
							{menu_id:"CHOOSEMETHOD", text:GTDICT("STYLETEXTEN"), method:1, detail:["=====================",...GTDICT("STYLEDESCEN")]},
							{menu_id:"CHOOSEMETHOD", text:GTDICT("STYLETEXTJP"), method:2, detail:["=====================",...GTDICT("STYLEDESCJP")]},
					],
				optionsDisplayLength:2,
			},

			gameMain : {
				header : GTDICT("MENU"),
				text: "",
				x : 0.5*tileSize*stretchScale,//(numTilesX-3)*tileSize,
				y : tileSize,
				width : tileSize*2,
				border : "default",
				options:[ 
					{menu_id:"BAG", 		text:GTDICT("BAG")},
					//{menu_id:"MESSAGE",		text:this.language == "ja" ? "メッセージ" : "MESSAGES"},
					//{menu_id:"STATUS",		text:this.language == "ja" ? "情報" : "INFO"},
					//{menu_id:"HELP",		text:this.language == "ja" ? "ヘルプ" : "HELP"},
					{menu_id:"SETTINGS",	text:GTDICT("SETTINGS")},
					{menu_id:"QUIT",		text:GTDICT("QUIT")},
					],
			},

			bag : {
				header : GTDICT("BAG"),
				text: "",
				x : 0.5*tileSize*stretchScale,//(numTilesX-7)*tileSize,
				y : tileSize,
				width:spacing(28),
				heightOverride: spacing(16),
				options:[{menu_id:"BAG", text:"DUMMY", icon:" ", color:"white", v_index:0, l_index:0}],
				optionsDisplayLength:9,
			},

			// message: {
			// 	header : this.language == "ja" ? "メッセージ" : "MESSAGE LOG",
			// 	x : viewHalf*tileSize-spacing(8),
			// 	y : tileSize,
			// 	width:spacing(30),
			// 	heightOverride: spacing(28),
			// 	options:[{menu_id:"MESSAGE",text:"MESSAGE", icon:" ", color:"white", v_index:0}],
			// 	optionsDisplayLength:12,
			// 	optionsSelectable:false,
			// },

			// status : {
			// 	header : this.language == "ja" ? "情報" : "STATUS",
			// 	text: "",
			// },

			gameMainCanvas : {
				x : 20,
				y : 20,
				width : viewSize*tileSize - 160,
				border : "default",
			},

			dialog : {
				header : " ",
				text: [],
				x: spacing(14),
				y: uiTop+spacing(6),
				width: spacing(20),
				heightOverride : spacing(4),
				options:[],
			},

			gameOver : {
				header : "GAME OVER",
				text: "",
				x : spacing(14),
				y : viewHalf*tileSize,
				width : spacing(20),
				//heightOverride : spacing(3),
				color: "black",
				textColor: "red",
				border : {
					color: "red",
					width: 6,
				},
			},

			cancelOk : {
				header : GTDICT("CONFIRM"),
				text: "",
				x : spacing(14),
				y : (viewHalf/2)*tileSize,
				width:spacing(20),
				options: [
					{menu_id:"CANCEL", text:GTDICT("CANCEL")},
					// {menu_id:"ACCEPT", text:"OK"},
				],
			},
		}

	}

	async inputDelay(delay=250){
		this.loading = true;
		await (new Promise((resolve, reject) => {
															if(this.loading == true){
																return setTimeout(() => {
																							resolve(true);
																						}, delay);
															}else{
																resolve(false);
															}
														}
													)
		)

		this.loading = false;
	}

	drawBoxLine(opts){
		ctxMenu.globalAlpha = 1;
		ctxMenu.beginPath();
		ctxMenu.lineWidth = opts.lineWidth;
		ctxMenu.strokeStyle = opts.color
		ctxMenu.roundRect(opts.x, opts.y, opts.width, opts.height, 8);
		ctxMenu.stroke();
	}

	drawBoxFill(opts){
		const gradient = ctx.createLinearGradient(0, opts.y, 0, opts.y+opts.height);
		const colorStops = nameToGradient(opts.color);
		gradient.addColorStop(0, colorStops[0]);
		gradient.addColorStop(0.5, colorStops[1]);
		gradient.addColorStop(1, colorStops[2]);

		ctxMenu.globalAlpha = opts.alpha;
		ctxMenu.beginPath();
		ctxMenu.fillStyle = gradient;
		ctxMenu.roundRect(opts.x, opts.y, opts.width, opts.height, 8);
		ctxMenu.fill();
		ctxMenu.globalAlpha = 1;
	}

	drawText(opts){
		const tWeight = opts.weight || "normal "

		ctxMenu.globalAlpha = 1;
		ctxMenu.fillStyle = opts.textColor;
		ctxMenu.font = tWeight + opts.size + "px Arial";
		ctxMenu.strokeStyle = this.settings.colorText[1];
	    ctxMenu.lineWidth = ((opts.size/14)*1);
	    ctxMenu.lineJoin="round";
	    ctx.textAlign = "right";
	    //ctxMenu.miterLimit=ctxMenu.lineWidth*0.25;
		if(opts.text.includes("\n")){
			const text_array = opts.text.split("\n");
			text_array.forEach((e,index) => {
					//ctxMenu.strokeText(e, opts.textX, opts.textY+((opts.size)*index));
					ctxMenu.fillText(e.replace(/[\-]/,""), opts.textX, opts.textY+((opts.size)*index))
				});
			
		}else{
			//ctxMenu.strokeText(opts.text, opts.textX, opts.textY);
			ctxMenu.fillText(opts.text.replace(/[\-]/,""), opts.textX, opts.textY);

		}
	    ctx.textAlign = "left";

	}

	drawGfx(opts){
		let sprite_index = opts.sprite_index;
		let indexOffsetY = 0;
		let sw = opts.spritesheet.tw;
		let tScale = opts.scale;
		if(sprite_index >= sw){
			indexOffsetY = Math.floor(sprite_index/sw);
		}else{
			indexOffsetY = 0;
		}

		ctxMenu.drawImage(
			opts.spritesheet, 								//sheetname
			(((sprite_index%sw)/sw)*sw)*16,					//sheet x
			(16*indexOffsetY),								//sheet y
			16,												//sprite width
			16,												//sprite height
			opts.x,											//actual x
			opts.y,											//actual y
			tScale,											//scale x
			tScale,											//scale y
			);
	}

	draw(menuName){		
		let menuDefaults = this.menuData["default"];
		let menuSettings = this.menuData[menuName] || menuDefaults;
		for( var property in menuDefaults){
			if(menuSettings[property] == undefined){
				menuSettings[property] = menuDefaults[property];
			}
		}

		//DRAW MENU TITLE AND DIVIDER BAR
		if(menuSettings.header && menuSettings.header != " "){
			//HEADERBOX
			this.drawBoxFill({
				x:menuSettings.x,
				y:menuSettings.y-menuDefaults.border.width,
				width:menuSettings.width,
				height:spacing(4),
				color:menuSettings?.colorBkgd ?? this.settings.colorBkgd[0],
				alpha:menuSettings.alpha,
			})

			//HEADER TEXT
			ctx.font = "normal 20px Arial";
			this.drawText({
				text:menuSettings.header,
				size:scaleFontToWidth(menuSettings.header, 20, menuSettings.width*0.8),
				centered:true,
				textX:menuSettings.x + (menuSettings.width/2) - Math.floor(ctx.measureText(menuSettings.header).width/2),
				textY:menuSettings.y+(spacing(2.5))-(ctx.measureText(menuSettings.header).fontBoundingBoxAscent*0.5),
				textColor:this.settings.colorText[0],
				weight:"bold ",
			})
		}

		//MENU LISTBOX
		if(menuSettings?.options.length || menuSettings?.text.length ){
			//DRAW MENU LISTBOX
			this.drawBoxFill({
				x:menuSettings.x,
				y:menuSettings.y+tileSize*1,
				width:menuSettings.width,
				height: menuSettings.heightOverride ? menuSettings.heightOverride
						:menuSettings.optionsDisplayLength || 
							(menuSettings?.options && menuSettings.options.some(opt => "desc" in opt)) ||
							(menuSettings?.text && menuSettings.text.length) ? spacing(22)
						:spacing(Math.max(3, menuSettings.options.length+1)*1.1),
				color:menuSettings?.colorBkgd ?? this.settings.colorBkgd[0],
				alpha:menuSettings.alpha,
			})
		}

		//MENU LISTBOX DESC TEXT WITH DIVIDER IF DESC EXISTS FOR CURRENT OPTION)
		if(menuSettings?.options && menuSettings.options.some(opt => "desc" in opt)){
			var textY = menuSettings.y+(menuSettings.header == " " ? spacing(2) : spacing(6))-spacing(1);

			this.drawBoxFill({
				x:menuSettings.x+spacing(4),
				y:textY+spacing(1.1*menuSettings.options.length)+(spacing(1.1)*1),
				width:menuSettings.width-spacing(8),
				height:4,
				color:this.settings.colorText[0],
				alpha:1,
			})

			let descText = (menuSettings.options[gameMenu.currentOption]["desc"] ? 
		                      [`   ${menuSettings.options[gameMenu.currentOption]["desc"]()}`] 
		                      : [])
			descText.forEach((t, index) => {
				this.drawText({
					text: t.replace(/[\-]/,""),
					size:menuSettings.size || 16,
					centered:true,
					textX:menuSettings.x+spacing(2),
					textY:textY+spacing(menuSettings.options.length+4),
					textColor:this.settings.colorText[0],
				})

			})
		}

		//MENU LISTBOX TEXT IF EXISTS WITHOUT ANY OPTIONS
		if(menuSettings?.text && menuSettings.text.length){
			let longest_text = [...menuSettings.text].sort((a,b) => b.length - a.length)[0].text

			menuSettings.text.forEach((t, index) => {
				var textY = menuSettings.y+(menuSettings.header == " " ? spacing(2) : spacing(6))-spacing(1);

				this.drawText({
					text:t.replace(/[\-]/,""),
					size:scaleFontToWidth(longest_text, 16, menuSettings.width*0.8),
					centered:true,
					textX:menuSettings.x + 20,
					textY:textY+spacing(1.1*menuSettings.options.length)+(spacing(1.1)*index),
					textColor:this.settings.colorText[0],
				})
			})
		}

		//MENU OPTIONS CONFIGURATION
		if(menuName == "difficultySelect"){
			this.difficultySelectMenu(menuSettings.options[this.currentOption], menuSettings.current);
		}else if(menuName == "contentSelect"){
			this.contentSelectMenu(menuSettings.options[this.currentOption], menuSettings.current);
		}else if(menuName == "methodSelect"){
			this.methodSelectMenu(menuSettings.options[this.currentOption], menuSettings.current);
		}else if(menuName == "bag"){
			this.bagMenu(menuSettings.options[this.currentOption], menuSettings.current);
		}else if(menuName == "status"){
			this.statusMenu();
		}else if(menuName == "message"){
			this.messageMenu(menuSettings.options[this.currentOption]);
		}else if(menuName == "settings"){
			this.settingsMenu();
		}else if(menuName == "dialog"){
			this.dialogMenu();
		}

		//DRAW MENU OPTIONS & CURSOR
		if(menuSettings.options){
			var menuW = menuSettings.width;
			var menuH = (menuSettings.options.length+1)*spacing(1.1)

			for(let i=0; i<menuSettings.options.length; i++){
				var textX = menuSettings.x+spacing(2);
				var textY = menuSettings.y+(menuSettings.header == " " ? spacing(2) : spacing(6))-spacing(0.5);

				if(menuSettings.dir == "horizontal"){
					textX=textX+(menuSettings.options[i][1].length*(14*i));
				}else{
					textY=textY+((spacing(1.1))*i);
				}

				let longest_option = [...menuSettings.options].sort((a,b) => b.text.length - a.text.length)[0].text
				this.drawText({
					text:menuSettings.options[i].text,
					size:scaleFontToWidth(longest_option, 16, menuSettings.width*0.8),
					textX:textX,
					textY:textY,
					textColor:this.settings.colorText[0],
				});

				//DRAW ICON IF INDEXED
				if(typeof(menuSettings.options[i].icon) == "number"){
					this.drawGfx({
						spritesheet:ui_spritesheet, 
						sprite_index:menuSettings.options[i].icon, 
						x:textX,
						y:textY-16,
						scale:18,
					});

				}

				//DRAW CURRENT OPTION CURSOR
				if(i == this.currentOption && menuSettings.hideCursor != true){
					let sprite_index = 15;
					let indexOffsetY = 0;
					let sw = ui_spritesheet.tw;
					let tScale = tileSize*0.5;
					if(sprite_index >= sw){
						indexOffsetY = Math.floor(sprite_index/sw);
					}else{
						indexOffsetY = 0;
					}

					ctxMenu.drawImage(
						ui_spritesheet, 								//sheetname
						(((sprite_index%sw)/sw)*sw)*16,					//sheet x
						(16*indexOffsetY),								//sheet y
						16,												//sprite width
						16,												//sprite height
						textX-spacing(2),								//actual x
						textY-spacing(1.25),							//actual y
						tScale,											//scale x
						tScale,											//scale y
						);
				}
			}
		}

		//DRAW MENU BORDERS
		if(menuSettings.border != "none"){
			//HEADER BOX
			this.drawBoxLine({
				x:menuSettings.x,
				y:menuSettings.y-menuDefaults.border.width,
				width:menuSettings.width,
				height:spacing(4),
				color:"grey",
				lineWidth:menuDefaults.border.width,
			})
			this.drawBoxLine({
				x:menuSettings.x,
				y:menuSettings.y-menuDefaults.border.width,
				width:menuSettings.width,
				height:spacing(4),
				color:"white",
				lineWidth:menuDefaults.border.width-1.5,
			})

			//MENU BOX
			this.drawBoxLine({
				x:menuSettings.x,
				y:menuSettings.y+tileSize*1,
				width:menuSettings.width,
				height: menuSettings.heightOverride ? menuSettings.heightOverride
					:menuSettings.optionsDisplayLength || 
						(menuSettings?.options && menuSettings.options.some(opt => "desc" in opt)) ||
						(menuSettings?.text && menuSettings.text.length) ? spacing(44)
					:spacing(Math.max(2, menuSettings.options.length+1)*1.1),
				color:"grey",
				lineWidth:menuDefaults.border.width,
			})
			this.drawBoxLine({
				x:menuSettings.x,
				y:menuSettings.y+tileSize*1,
				width:menuSettings.width,
				height: menuSettings.heightOverride ? menuSettings.heightOverride
					:menuSettings.optionsDisplayLength || 
						(menuSettings?.options && menuSettings.options.some(opt => "desc" in opt)) ||
						(menuSettings?.text && menuSettings.text.length) ? spacing(44)
					:spacing(Math.max(2, menuSettings.options.length+1)*1.1),
				color:"white",
				lineWidth:menuDefaults.border.width-1.5,
			})
		}
	}

	update(input){

		if(input){
			
			let menu = this.menuData[this.currentMenus.slice(-1)] ?? {options:false};
			let options = menu.options ?? false;
			
			if(options != false){
				this.isDirty = true;
				if(input == "up" || input == "left"){
					game.playSound("buttonMove");
					this.lastOptionDir = -1;

					if(this.currentOption <= 0){
						this.currentOption = options.length-1;

					}else{
						this.currentOption -= 1;
					}
				
				}else if(input == "down" || input == "right"){
					game.playSound("buttonMove");
					this.lastOptionDir = 1;

					if(this.currentOption >= options.length-1){
						this.currentOption = 0;
					}else{
						this.currentOption += 1;
					}
				}else if(input == "select"){
					
					let selection = options[this.currentOption]?.menu_id ?? false;


					if(selection == "STARTGAME") {this.currentOption = 0; this.contentSelectMenu()};
					if(selection == "CHOOSECONTENTS" && options[this.currentOption].code == "UNKNOWN") {this.currentOption = 0; this.codeEntry()};
					if(selection == "CHOOSECONTENTS" && options[this.currentOption].code != "UNKNOWN") {
						setupSettings.special_dungeon=false;
						setupSettings.code = options[this.currentOption].code;
						this.currentOption = 0;
						this.difficultySelectMenu()
					};

					if(selection == "CHOOSEDIFFICULTY") {setupSettings.difficulty = options[this.currentOption].diff; this.currentOption = 0; this.methodSelectMenu()};
					if(selection == "CHOOSEMETHOD") {setupSettings.vocab_method = options[this.currentOption].method; this.nameMenu(options[this.currentOption].text, "Player One")};

					if(selection == "BAG") {this.bagMenu(options[this.currentOption], "BAG_SORT_ITEM")};
					
					if(selection == "STATUS") this.statusMenu();
					
					if(selection == "MESSAGE") {this.messageMenu(options[this.currentOption])};
					if(selection == "MESSAGE_MSG") {this.messageMenu(options[this.currentOption])};
					
					if(selection == "SETTINGS") this.settingsMenu();
					if(selection == "SFX") this.settingsMenu("SFX");
					if(selection == "MSC") this.settingsMenu("MSC");
					if(selection == "LANG") this.settingsMenu("LANG");
					if(selection == "BKGD") this.settingsMenu("BKGD");
					// if(selection == "TEXT") this.settingsMenu("TEXT");

					if(selection == "QUIT") this.acceptMenu({msg:GTDICT("QUITTEXT") ,func:this.quitMenu.bind(this)});

					if(selection == "CANCEL") this.cancel();
					if(selection == "ACCEPT") {menu.accept()}; //game.playSound("buttonAccept")};

					if(this.currentMenus.length == 0) return;
					if(this.menuData[this.currentMenus.slice(-1)].options != undefined && this.currentOption >= this.menuData[this.currentMenus.slice(-1)].options.length) this.currentOption = 0;
					
				}


			}
		}		

		if((this.isActive && this.isDirty) || ["difficultySelect", "contentSelect", "methodSelect"].includes(this.currentMenus.at(-1))){
			ctxMenu.clearRect(0, 0, canvasMenu.width, canvasMenu.height);
			this.draw(this.currentMenus.slice(-1));
			this.isDirty = false;
		}
	}

	util_scrollmenu(menu_id, list, display_length, list_current, sortMethod){
		var list_start = Math.max(0,list_current-display_length);
		var menuSettings = this.menuData[this.currentMenus.slice(-1)]
		var offset = menuSettings.options.length;
		menuSettings.optionsLengthActual = list.length+offset;

		var templist = [];

		if(menu_id == "CHOOSECONTENTS"){
			templist = list.map((x, index) => {													
													return {
														menu_id:x.menu_id,
														name:x.text, //item name
														text:x.text,
														detail:x.detail,
														icon:" ", //icon
														color:"white", //text color
														data:x,
														code:x.code,
														sort:index,
														v_index:index, //in view check
														l_index:index, //post sort order
														s_index:index, //natural order
													}
			})
		}else if(menu_id == "BAG"){
			templist = list.map((x, index) => {
													var d_ratio = x.durability !== undefined ? x.durability/x.max_durability : 1;
													var title_text = GTDICT(x.name);
													
													//console.log(x.data.itemtype == "COLLECTIBLE" ? monsterIndex.filter(m => m.COLLECTIBLE.name == x.data.name)[0] : " ")
													return {
														menu_id:menu_id,
														//name:x.data.name, //item name
														name:GTDICT(x.name),
														icon:" ", //icon
														text:title_text,
														color:"white", //text color
														desc: function(){
															let description = [GTDICT(`${x.name}DESC`)]
															while(description.length<7){
																description.push("\n ");
															}

															return description.join(``)
														},
														itemtype:x.itemtype, //item type
														data:x.data,
														sort:x.itemtype,
														v_index:index, //in view check
														l_index:index, //post sort order
														s_index:x.index, //natural order
													}
			})

		// }else if(menu_id == "MESSAGE"){
		// 	templist = list.map((x, index) => {
		// 											return {
		// 												menu_id:`${menu_id}_MSG`,
		// 												text:x[0], //text value
		// 												icon:" ", //no ICON
		// 												color:x[1], //text color value
		// 												v_index:index, //for whether it is in veiw scope
		// 												l_index:index, //for its order in the list after sorting
		// 												s_index:index, //for its order in the source data
		// 												sort:false, //SORTING INDICES (false if not sortable)
		// 												misc1:0,
		// 											}

		// 	})


		}

		if(templist.length >= display_length){
			if(this.lastOptionDir == -1){
				if(this.currentOption == display_length-1){
					list_current = list.length-1;
					menuSettings.sub_current = list.length-1;
					templist = rotateArray(templist, list_current-(this.currentOption)+offset)


				}else{ 
					if(this.currentOption != 0){
						if(this.currentOption == 2){

							if(list_current > 2){
								this.currentOption += 1;
							}else if(list_current > 1){
								this.currentOption += offset;
							}
						}

						templist = rotateArray(templist, list_current-(this.currentOption)+offset)
					}
					
				}


			}else if(this.lastOptionDir == 1){

				
				if(this.currentOption != 0){
					if(this.currentOption == (display_length-2)){

						if(list_current < list.length-2){
							this.currentOption -= 1;
						}
					}

					templist = rotateArray(templist, list_current-(this.currentOption)+offset)

				}
			}

			templist.length = display_length-offset;
		}

		templist.forEach((e, index) => { 
				templist[index].v_index = index; 
				if(templist[index].v_index == this.currentOption-offset){
					if(templist[index].color != "gray"){
						templist[index].color = "gold"
					}else{
						templist[index].color = "darkgray"
					}
				}
			} );
		
		return templist;
	}

	dialog(text_arr, args){
		this.currentOption = 0;
		this.isActive = !this.isActive;
		this.isDirty = true;
		this.menuSettings = this.setupSubmenu("dialog");
		this.menuSettings.header = args?.header ?? "DIALOG";
		this.menuSettings.colorBkgd = args?.colorBkgd ?? gameMenu.settings.colorBkgd[0];
		this.menuSettings.text = text_arr;
		gameState = "menu";
	}

	open(menuState, special){
		this.currentOption = 0;
		this.isActive = !this.isActive;
		this.isDirty = true;
		this.currentMenus.push(menuState);
		gameState = special || "menu";

		game.playSound("buttonAccept");
	}

	close(){
		ctxMenu.clearRect(0, 0, canvas.width, canvas.height);
		this.currentMenus = [];
		this.isActive = !this.isActive;
		this.isDirty = true;

		if(gameState == "menu" || gameState == "dialog"){
			if(player.dead){
				gameState = "victory";
			}else{
				gameState = "running";

			}

		}else{
			gameState = "title";
		}
	}

	cancel(){
		if(this.currentMenus.length > 1){
			this.isDirty = true;
			this.currentMenus.pop();
			//this.currentOption = 0;
			[this.currentOption, this.prevOption] = [this.prevOption, 0];
			//this.prevOption = 0;
			this.inputDelay(100);
		}else{
			this.close();
		}
		game.playSound("buttonCancel");

	}

	setupSubmenu(menu_id){
		if(this.currentMenus.at(-1) != menu_id){
			game.playSound("buttonAccept");
			this.currentMenus.push(menu_id);
			this.prevOption = this.currentOption;
			this.currentOption = 0;

			let menuDefaults = this.menuData["default"];
			this.menuData[this.currentMenus.at(-1)] = {...menuDefaults, ...this.menuData[this.currentMenus.at(-1)]};

			this.inputDelay();

		}

		return this.menuData[this.currentMenus.at(-1)]

	}

	acceptMenu(args){
		var menuSettings = this.setupSubmenu("cancelOk");
		let menu = this.menuData[this.currentMenus.at(-1)]
		
		menu.header = args.msg || GTDICT("CONFIRM");
		menu.options = [
				{menu_id:"CANCEL", text:GTDICT("CANCEL")},
				...(args.options != undefined ? args.options : []),
				...(args.options == undefined ? [{menu_id:"ACCEPT", text:GTDICT("ACCEPT")}] : []),
			]

		menu.accept = args.func || function(){return};

	}

	settingsMenu(option){
		var menuSettings = this.setupSubmenu("settings");

		if(this.currentMenus[0] == "mainMenu"){
			menuSettings.x = (viewHalf+1)*tileSize;
		}else{
			//menuSettings.x = (numTilesX-4)*tileSize;
			menuSettings.x = 0.5*tileSize*stretchScale
		}

		if(option == "SFX") this.settings.sfx = !this.settings.sfx;
		if(option == "MSC"){
			this.settings.music = !this.settings.music;
			if(this.settings.music && !this.settings.isMuted){
				musicPlayer.resume();
			}else{
				musicPlayer.pause();
			}

		}
		if(option == "LANG"){
			this.settings.language = rotateArray(this.settings.language)

			if(this.settings.language[0] == "日本語"){
				this.language = "ja";
			}else{
				this.language = "en";
			}

			this.applySettings();
		}
		if(option == "BKGD"){
			this.settings.colorBkgd = rotateArray(this.settings.colorBkgd)

			if(this.settings.colorBkgd[0] == "white"){
				while(this.settings.colorText[0] == "white"){
					this.settings.colorText = rotateArray(this.settings.colorText)
				}

			}else{
				while(this.settings.colorText[0] != "white"){
					this.settings.colorText = rotateArray(this.settings.colorText)
				}
			}
		};

		if(option){
			this.menuData.settings.options = [
											{menu_id:"SFX", text:`${GTDICT("SFX")}: `+(this.settings.sfx ? `${GTDICT("ON")}` : `${GTDICT("OFF")}`)},
											{menu_id:"MSC", text:`${GTDICT("BGM")}: `+(this.settings.music ? `${GTDICT("ON")}` : `${GTDICT("OFF")}`)},
											{menu_id:"BKGD", text:`${GTDICT("BACKGROUND")}: `+toTitleCase(this.settings.colorBkgd[0])},
											{menu_id:"LANG", text:`${GTDICT("LANGUAGE")}: ${(this.settings.language[0])}`},
										];
		};
	}

	contentSelectMenu(selection, option){
		var menuSettings = this.setupSubmenu("contentSelect");

		let libraries = window[setupSettings.library].map(lib => {
			let local_library = {LIB: [{EN:"ENGLISH:", JP:"日本語:"},...lib.LIB]}
			let descText = [];

			local_library.LIB.forEach(entry => {
				ctxMenu.font = "14px Arial";
				let [entryEN, entryJP] = [entry.EN, entry.JP];
				let en_entry_width = ctx.measureText(entryEN).width;

				let pad_count = Math.max(0, Math.floor((tileSize*2 - en_entry_width)/(ctx.measureText(" ").width)));
				entryEN = `${" ".repeat(pad_count)}${entryEN}`

				descText.push(`${entryEN}　　　　${entryJP}`);
			})

			
			descText.unshift(["=========================================="])

			return {menu_id:"CHOOSECONTENTS", text:`${lib.NAME} (${lib.CODE})`, code:lib.CODE, detail:descText} 
		})

		libraries = libraries.filter(e => !e.code.includes("!"))

		menuSettings.sub_current = selection?.l_index ?? 0;
		menuSettings.options = [{menu_id:"CHOOSECONTENTS", text:`[${GTDICT("CODE")}]`, code:"UNKNOWN", detail:["=========================================="," ",`             ${GTDICT("CODE")}`], icon:" ", color:"white", v_index:0, l_index:0}];
		menuSettings.options = menuSettings.options.concat(this.util_scrollmenu("CHOOSECONTENTS", libraries, menuSettings.optionsDisplayLength, menuSettings.sub_current, menuSettings.current));
		
		var detail = !!option ? option.detail : menuSettings.options[this.currentOption].detail
		menuSettings.text = detail.map((t, index) => `${t}`)
	}

	difficultySelectMenu(option){
		var menuSettings = this.setupSubmenu("difficultySelect");
		var detail = !!option ? option.detail : menuSettings.options[this.currentOption].detail

		menuSettings.text = detail.map((t, index) => `           ${t}`)
	}

	methodSelectMenu(option){
		var menuSettings = this.setupSubmenu("methodSelect");
		var detail = !!option ? option.detail : menuSettings.options[this.currentOption].detail

		menuSettings.text = detail.map((t, index) => `           ${t}`)
	}

	codeEntry(){
		game.playSound("buttonAccept");
		var menuSettings = this.setupSubmenu("codeEntry");

		let codePrompt = prompt(GTDICT("ENTERCODE"));

		if(codePrompt != null) {
			if(codePrompt.at(-1)=="*"){
				setupSettings.special_dungeon = true;
				codePrompt = codePrompt.substring(0, codePrompt.length-1);
			}else{
				setupSettings.special_dungeon = false;
			}

			if(Object.values(window[setupSettings.library]).some(e => e.CODE == codePrompt)){
				setupSettings.code = codePrompt; 
				this.currentOption = 0; 
				this.cancel();
				this.difficultySelectMenu();

			}else{
				alert(GTDICT("CODEERROR"));
				this.cancel();

			}

		}else{
			this.cancel();
		};

	}

	nameMenu(characterName=player){
		game.playSound("buttonAccept");

		// let name = prompt("What is your name? \n(in 12 characters or less)", characterName) || "Joe";
		// while(name.length > 16){
		// 	name = prompt("What is your name? \n(Please use less than 12 characters!)", characterName) || "Nanashi";
		// }

		Transition.fade = "toBlack";
		Transition.onFinish = game.startGame.bind(this);
		
	}

	bagMenu(selection, menu_choice){
		var menuSettings = this.setupSubmenu("bag");

		menuSettings.current = "BAG_SORT_ITEM"

		var playerItems = []; 
		player.items.forEach((item, index) => {
				if(item != undefined){
					playerItems.push({display:`${item.itemType}: ${GTDICT(item.name)}`+item.name, name:item.name, itemtype:item.itemType, index:index, data: {...item} });
				}
			});

		menuSettings.sub_current = selection?.l_index || 0;
		if(!player.items.length){
			playerItems = [{display:`${GTDICT("EMPTYBAG")}`,name:`${GTDICT("EMPTYBAG")}`, itemtype:"ITEM", index:0, data: {} }]
		}
		menuSettings.options = this.util_scrollmenu("BAG", playerItems, menuSettings.optionsDisplayLength, menuSettings.sub_current, menuSettings.current);
		menuSettings.sub_current = menuSettings.options[this.currentOption]?.l_index ?? 0;		
	}

	quitMenu(){
		game.playSound("buttonAccept");
		this.currentMenus = [];
		this.currentOption = 0;
		this.isActive = !this.isActive;
		ui={buttons:[]}

		//tick("all")
		ctxDOM.clearRect(0, 0, canvasDOM.width, canvasDOM.height);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		//gameState = "dead";

		musicPlayer.newTrack("title");
		game.showLoading();
	}

	dialogMenu(text="TEST"){
		var menuSettings = this.setupSubmenu("dialog");

		shuffle(menuSettings.text)[0];
		// let talkText = shuffle(menuSettings.text)[0];
		// menuSettings.text = [talkText];
	}

}