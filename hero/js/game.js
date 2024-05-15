class GameEngine{
	constructor(){
		this.level = 1;
		this.mistake_count = 0;
		this.remaining = 0;
		this.correct_streak = 0;
		this.perfect_level = true;
		this.perfect_level_streak = 0;
		this.perfect_run = true;
		this.won = false;
		this.cheat = false;
		this.current_library = [];
		this.current_list = [];

		let instanced_library = window[setupSettings.library][window[setupSettings.library].findIndex(e => e.CODE == setupSettings.code)]
		for(let entry of instanced_library.LIB){
			let insertion_index = roll(this.current_library.length);

			this.current_library.splice(insertion_index, 0, entry);
			this.current_list.splice(insertion_index, 0, {EN:[entry.EN],JP:[entry.JP]});
		}

		this.vocab_method = setupSettings.vocab_method;
		this.goal = this.current_list[this.level-1]
		this.goal = this.vocab_method == 1 ? [this.goal.EN, this.goal.JP] : [this.goal.JP, this.goal.EN];

		this.settings = {};
		this.settingsTable = {
					EASY: 	{name:"EASY", 	difficulty: 1,	map_size: 8,	target_tiles: 3,	choice_count: 3,	startingHP: 7,	score_penalty: 0, 	hp_penalty: 0, 	enemy_speed:3, 	enemy_count:3,	hint: "show"},
					MEDIUM: {name:"MEDIUM", difficulty: 2,	map_size: 8, 	target_tiles: 4,	choice_count: 4,	startingHP: 6,	score_penalty: 100, hp_penalty: 0,	enemy_speed:3, 	enemy_count:4,	hint: "mistake"},
					HARD: 	{name:"HARD", 	difficulty: 3,	map_size: 8, 	target_tiles: 5,	choice_count: 6,	startingHP: 5,	score_penalty: 100, hp_penalty: 1, 	enemy_speed:2, 	enemy_count:5,	hint: "mistake"},
					CRAZY: 	{name:"CRAZY", 	difficulty: 4,	map_size: 8, 	target_tiles: 5,	choice_count: 9,	startingHP: 4,	score_penalty: 200,	hp_penalty: 1, 	enemy_speed:2, 	enemy_count:6,	hint: "off"},
		}
		this.messages = new messageLog("WELCOME!", "gold");
	}

	setSettings(args){
		for(let [k,v] of Object.entries(this.settingsTable[args.difficulty])){
			this.settings[k] = v
		}
	}

	updateProperties(args){
		for(let [k, v] of Object.entries(args)){
			this[k] = v
		}
	}
}


draw = {

	setupCanvas: function(){
		//MAIN CANVAS
		canvasDOM = document.querySelector("canvas");
		ctxDOM = canvasDOM.getContext("2d");

		canvasDOM.width = tileSize*(numGrid+uiWidth);
		canvasDOM.height = tileSize*numGrid;
		canvasDOM.style.width = `${canvasDOM.width}px`;
		canvasDOM.style.height = `${canvasDOM.height}px`;
		ctxDOM.imageSmoothingEnabled = false;

		//VIRTUAL CANVASES
		//GAME CANVAS
		canvas = document.createElement("canvas");
		ctx = canvas.getContext("2d");

		canvas.width = tileSize*(numGrid+uiWidth);
		canvas.height = tileSize*numGrid;
		canvas.style.width = `${canvas.width}px`;
		canvas.style.height = `${canvas.height}px`;
		ctx.imageSmoothingEnabled = false;

		//MENU CANVAS
		canvasMenu = document.createElement("canvas");
		ctxMenu = canvasMenu.getContext("2d");

		canvasMenu.width = tileSize*(numGrid+uiWidth);
		canvasMenu.height = tileSize*numGrid;
		canvasMenu.style.width = `${canvasMenu.width}px`;
		canvasMenu.style.height = `${canvasMenu.height}px`;
		ctxMenu.imageSmoothingEnabled = false;

	},

	drawScreen: function(){
		ctxDOM.clearRect(0, 0, canvasDOM.width, canvasDOM.height)

		if(["running", "dead"].includes(gameState)){
			ctx.clearRect(0,0,canvas.width,canvas.height);

			draw.screenshake();

			for(let i=0; i<numTilesX; i++){
				for(let j=0; j<numTilesY; j++){
					//map.getTile(i,j).draw();
					tiles[i][j].draw()
				}
			}

			monsters.forEach((m) => m.draw());

			player.draw();

			draw.drawUI();


		}else if(gameState == "loading"){
			game.showLoading()

		}else if(gameState == "title"){
			game.showTitle()
		
		}else if(gameState == "victory"){
			game.showVictory()
		}

		if(gameState == "dead"){
			gameMenu.dialog(["GOOD LUCK NEXT TIME. TRY AGAIN!"], {header:"YOU LOST!", colorBkgd:"red"})
		}

		ctxDOM.drawImage(canvas, 0, 0);
		
		if(["menu", "titlemenu"].includes(gameState)){
			gameMenu.update();
			
			if(["menu"].includes(gameState)){
				draw.drawUI();
			}

			ctxDOM.drawImage(canvasMenu, 0, 0);
		}

		if(Transition.fade != "none"){
			if(Transition.fade == "toVisible"){
				Transition.fadeToVisible();

			}
			if(Transition.fade == "toBlack"){
				Transition.fadeToBlack();

			}

			ctxDOM.drawImage(canvasMenu, 0, 0);
		}

	},

	drawUI: function(){
		let hintText = `${GTDICT("HINT")}: `;
		if(gameEngine.settings.hint == "show"){
			hintText += `${gameEngine.goal[0][0]}`;

		}else if(gameEngine.settings.hint == "mistake"){
			hintText += gameEngine.mistake_count == 0 	? ""
											:gameEngine.mistake_count == 1 ? `${" _".repeat(gameEngine.goal[0][0].length)}`
											:gameEngine.mistake_count == 2 ? `${gameEngine.goal[0][0][0]}${" _".repeat(gameEngine.goal[0][0].length-1)}`
											:gameEngine.mistake_count == 3 ? `${gameEngine.goal[0][0][0]}${gameEngine.goal[0][0][1]}${" _".repeat(gameEngine.goal[0][0].length-2)}`
											:`${gameEngine.goal[0][0]}`

		}else{
			hintText = "";
			
		}
		hintText = hintText.replace(/[\-]/,"")

		let topBoxText = gameMenu.language == "ja"　?　`レベル: ${gameEngine.level} / ${Object.keys(gameEngine.current_library).length}  ゴール: "${gameEngine.goal[1]}"    後: ${gameEngine.remaining}    ${hintText}`
														:`Level: ${gameEngine.level} / ${Object.keys(gameEngine.current_library).length}  Goal: "${gameEngine.goal[1]}"    Remaining: ${gameEngine.remaining}    ${hintText}`;
		let topBox = new textBox({
									name:[topBoxText.replace(/[\-]/,"")], 
									colorText:"white", 
									//x:(numTiles*0.5)*tileSize*stretchScale-((numTiles-1)*tileSize*stretchScale)/2 ,
									x:0.5*tileSize*stretchScale,
									y:uiTop,
									w:(numTiles)*tileSize*stretchScale, 
									h:spacing(2), 
									centerX:true, 
									centerY:true,
								});
		topBox.drawSelf();

		let hpText = `HP: ${"❤︎".repeat(player.hp)}${"♡".repeat(player.maxHp-player.hp)}`;
		let swordText = player.equip.SWORD > 0 ? `${gameMenu.language == "ja"?"攻撃":"ATK"}⇧ ${"▮".repeat(player.equip.SWORD)}${"▯".repeat(6-player.equip.SWORD)}` : "";
		let armorText = player.equip.ARMOR > 0 ? `${gameMenu.language == "ja"?"防御":"DEF"}⇧ ${"▮".repeat(player.equip.ARMOR)}${"▯".repeat(6-player.equip.ARMOR)}` : "";
		let bottomBoxText = gameMenu.language == "ja"　?　`スコアー: ${score}   ゴールド: ${gold}   ${hpText}   ${swordText}  ${armorText}`
		 												:`Score: ${score}   Gold: ${gold}   ${hpText}   ${swordText}  ${armorText}`;
		let bottomBox = new textBox({
										name:[bottomBoxText.replace(/[\-]/,"")],
										colorText:"white",
										x:0.5*tileSize*stretchScale,
										y:(numTilesY-1)*tileSize+spacing(1.5),
										w:(numTiles)*tileSize*stretchScale,
										h:spacing(2),
										centerX:true,
										centerY:true,
									});
		bottomBox.drawSelf();

		//let hpText = `HP: ${"❤".repeat(player.hp)}${"♡".repeat(player.maxHp-player.hp)}`;
		//let hpText = `HP: ${"▮".repeat(player.hp)}${"▯".repeat(player.maxHp-player.hp)}`;


		// let statPanelText = gameMenu.language == "ja"　? [`コード: ${setupSettings.code}`,`難易度: ${gameEngine.settings.name}`,"",`レベル: ${gameEngine.level} / ${Object.keys(gameEngine.current_library).length}`,`スコアー: ${score}`, `ゴールド: ${gold}`," "," ",`${hpText}`,` `]
		// 												:[`Code: ${setupSettings.code}`,`Difficulty: ${gameEngine.settings.name}`,"",`Level: ${gameEngine.level} / ${Object.keys(gameEngine.current_library).length}`, `Score: ${score}`,`Gold: ${gold}`," "," ",`${hpText}`,` `];
		// let statPanelBox = new textBox({name:statPanelText, colorText:"gold", x:(uiStart)*tileSize, y:uiTop, w:4*tileSize, h:spacing(12), centerY:true});
		// statPanelBox.drawSelf();

		// if(player.equip.SWORD > 0){
		// 	let swordPanelBox = new textBox({name:[`        ${"▮".repeat(player.equip.SWORD)}${"▯".repeat(6-player.equip.SWORD)}   ${gameMenu.language == "ja"?"攻撃":"ATK"}⇧`], colorText:"gold", x:(uiStart)*tileSize, y:uiTop+spacing(13), w:4*tileSize, h:spacing(2), centerY:true});
		// 	swordPanelBox.drawSelf();
		// 	draw.drawSprite(tileset_spritesheet, palettes["HERO"]["SWORD"], (uiStart+(2/16)), 3+(3/8), (3/8));
		// }
		// if(player.equip.ARMOR > 0){
		// 	let armorPanelBox = new textBox({name:[`        ${"▮".repeat(player.equip.ARMOR)}${"▯".repeat(6-player.equip.ARMOR)}   ${gameMenu.language == "ja"?"防御":"DEF"}⇧`], colorText:"gold", x:(uiStart)*tileSize, y:uiTop+spacing(16), w:4*tileSize, h:spacing(2), centerY:true});
		// 	armorPanelBox.drawSelf();
		// 	draw.drawSprite(tileset_spritesheet, palettes["HERO"]["ARMOR"], (uiStart+(2/16)), 4+(1/8), (3/8));

		// }
		if(player.items.some(e => e != undefined)){
			player.items.forEach((e, i, a) => {
				if(e != undefined){
					let itemName = gameMenu.language == "ja" ? window[`${e.itemType.toLowerCase()}_Translation`][e.name] : e.name;
					let itemText = `(${i+1}) ${itemName}  `;
					let itemPanelBox = new textBox({
													name:[itemText], 
													colorText:`${i<4?"aqua":"darkorange"}`, 
													x:(uiStart-0.5)*tileSize, 
													y:(uiTop)+(Math.floor(i/1)*spacing(3))+(i>3 ? spacing(4) : 0), 
													w:(14/8)*tileSize, 
													h:spacing(2), 
													centerY:true})
					itemPanelBox.drawSelf();
				}
			})
		}

	},

	drawTile: function(spritesheet, sprite_index, x, y, scale=1, colorWithAlpha="rgba(0,0,0,0)"){
		let indexOffsetY = 0;
		let sw = spritesheet.tw;
		let tScale = Math.floor(tileSize*scale) || tileSize;

		if(sprite_index >= sw){
			indexOffsetY = Math.floor(sprite_index/sw);
		}else{
			indexOffsetY = 0;
		}

		ctx.drawImage(
			spritesheet, 									//sheetname
			(((sprite_index%sw)/sw)*sw)*16,					//sheet x
			(16*indexOffsetY),								//sheet y
			16,												//sprite width
			16,												//sprite height
			Math.floor(x*tileSize*stretchScale)+shakeX,		//actual x
			Math.floor(y*tileSize)+shakeY,					//actual y
			tScale*stretchScale,											//scale x
			tScale,							//scale y
			);
	},

	drawSprite: function(spritesheet, sprite_index, x, y, scale=1, colorWithAlpha="rgba(0,0,0,0)"){
		let indexOffsetY = 0;
		let sw = spritesheet.tw;
		let tScale = Math.floor(tileSize*scale) || tileSize;

		if(sprite_index >= sw){
			indexOffsetY = Math.floor(sprite_index/sw);
		}else{
			indexOffsetY = 0;
		}

		ctx.drawImage(
			spritesheet, 									//sheetname
			(((sprite_index%sw)/sw)*sw)*16,					//sheet x
			(16*indexOffsetY),								//sheet y
			16,												//sprite width
			16,												//sprite height
			Math.floor(x*tileSize*stretchScale)+shakeX,							//actual x
			Math.floor(y*tileSize)+shakeY,							//actual y
			tScale,											//scale x
			tScale,											//scale y
			);
	},
	
	drawText: function(text, size, centered, textX, textY, color, weight){
		ctx.fillStyle = color;
		const tWeight = weight || "normal"
		const fFamily = "Arial"
		ctx.font = `${tWeight} ${size}px ${fFamily}`;
		if(centered){
			textX = (canvas.width-ctx.measureText(text).width)/2-tileSize;
		}

		if(Array.isArray(text)){
			text.forEach((e,i,a) => ctx.fillText(e+`${i != a.length-1 ? "/" : " "}`, textX+tileSize, textY+tileSize+((size)*i)));
		}else{
			ctx.fillText(text, textX+tileSize, textY+tileSize);

		}
	},

	drawScores(){
		let scores = game.getScores();

		if(scores.length){
			let newestScore = scores.pop();
			//scores = scores.filter(e=> typeof e.score === `number` && e.contents !== undefined )
			scores.sort((a,b) => b.score - a.score);
			scores.unshift(newestScore);

			let highscoreMatrix = [["CONTENTS"], ["DIFFICULTY"], ["STYLE"], ["WORDS"], ["SCORE"], ["VICTORY"], ["PERFECT"]];

			for(let i=0; i<Math.min(10, scores.length);i++){
				highscoreMatrix[0].push(scores[i].contents);
				highscoreMatrix[1].push(scores[i].difficulty);
				highscoreMatrix[2].push(scores[i].method);
				highscoreMatrix[3].push(scores[i].levels);
				highscoreMatrix[4].push(scores[i].score);
				highscoreMatrix[5].push(scores[i].complete ? "YES" : "NO");
				highscoreMatrix[6].push(scores[i].perfect ? "★" : "-");
			}

			highscoreMatrix.forEach((c, ci) => {
				c.forEach((r, ri) => {
					draw.drawText(
						`${ri>0?" ":""}${r}`,
						15,
						false,
						tileSize+tileSize*((1.6)*ci)-(ci == 0 ? tileSize*1.6 : 0),
						canvas.height/2+(ri*spacing(1.1)),
						ri == 0 ? "white" : ri == 1 ? colorShift("rainbow") : "gold",
					);

				})
			})
		}
	},

	screenshake(){
		if(shakeAmount){
			shakeAmount--;
		}

		let shakeAngle = Math.random()*Math.PI*2;
		shakeX = Math.round(Math.cos(shakeAngle)*shakeAmount);
		shakeY = Math.round(Math.sin(shakeAngle)*shakeAmount);

	},
}

game = {

	initSounds: function(){
		sounds = {
			hit1: new Audio(`sfx/hit1.wav`),
			hit2: new Audio(`sfx/hit2.wav`),
			deathVermin: new Audio(`sfx/death_vermin.wav`),
			deathHuman: new Audio(`sfx/death_human.wav`),
			deathBeast: new Audio(`sfx/death_beast.wav`),
			treasure: new Audio(`sfx/coins.wav`),
			newLevel: new Audio(`sfx/stairs.wav`),
			spell: new Audio(`sfx/magic.wav`),
			success: new Audio(`sfx/success.wav`),
			fail: new Audio(`sfx/fail.wav`),
			buttonAccept: new Audio(`sfx/buttonAccept.wav`),
			buttonCancel: new Audio(`sfx/buttonCancel.wav`),
			buttonMove: new Audio(`sfx/buttonMove.wav`),
		};

		soundPlayer = {volume:0.5};
		soundPlayer.play = function(sound){
			let newSound = sounds[sound];

			newSound.play();
			newSound.volume = soundPlayer.volume;

		}

		music = {
			title: new Audio(`sfx/music/BeepBox-Song-Progression2-A-chip.mp3`),
			dungeon1: new Audio(`sfx/music/BeepBox-SongA-ALT-loop4.mp3`),
			dungeon2: new Audio(`sfx/music/BeepBox-SongB-loop4.mp3`),
			dungeon3: new Audio(`sfx/music/BeepBox-SongC-loop4.mp3`),
			victory: new Audio(`sfx/music/BeepBox-Fanfare.mp3`),
		}

		musicPlayer = {
					currentTrack: "title",

					play: function(){
						musicPlayer.stop();
						music[musicPlayer.currentTrack].currentTime = 0;
						music[musicPlayer.currentTrack].play();
						music[musicPlayer.currentTrack].loop = true;
						music[musicPlayer.currentTrack].volume = 0.1;
					},

					pause: function(){
						music[musicPlayer.currentTrack].pause();	
					},

					resume: function(){
						music[musicPlayer.currentTrack].play();
						music[musicPlayer.currentTrack].loop = true;
						music[musicPlayer.currentTrack].volume = 0.1;
					},


					stop: function(){
						music[musicPlayer.currentTrack].pause();	
						music[musicPlayer.currentTrack].currentTime = 0;
					},

					newTrack: function(track, loop){
						musicPlayer.stop();
						musicPlayer.currentTrack = track;

						if(music[musicPlayer.currentTrack] && gameMenu.settings.music && !gameMenu.settings.isMuted){
							music[musicPlayer.currentTrack].play();
							music[musicPlayer.currentTrack].currentTime = 0;
							music[musicPlayer.currentTrack].loop = loop || true;
							music[musicPlayer.currentTrack].volume = 0.1;
						}
					},
				};

	},

	playSound: function(soundName){
		sounds[soundName].volume = gameMenu.settings.sfx == true ? 0.5 : 0.0;
		sounds[soundName].play();
		sounds[soundName].currentTime = 0;

	},

	getScores: function(){
		if(localStorage["scores"]){
			return JSON.parse(localStorage["scores"]);

		}else{
			return [];

		}
	},

	addScore: function(score, won){
		let scores = game.getScores();
		//scores = scores.filter(e=> typeof e.score === `number` && e.contents !== undefined )
		let scoreObject = {	
							contents:window[setupSettings.library][window[setupSettings.library].findIndex(e => e.CODE == setupSettings.code)][["NAME"]],
							difficulty:gameEngine.settings.name,
							method:gameEngine.vocab_method == 1 ? "JP → EN" : "EN → JP",
							levels:`${gameEngine.level}/${gameEngine.current_library.length}`,
							score: score,
							complete: won,
							perfect:gameEngine.perfect_run,
						};

		scores.push(scoreObject);

		localStorage["scores"] = JSON.stringify(scores);
	},

	tick: function(){
		for(let i=monsters.length-1; i>=0;i--){
			if(!monsters[i].dead){
				monsters[i].update();
			}else{
				monsters.splice(i,1);
			}

		}

		if(player.dead){
			gameEngine.perfect_run = false;
			game.addScore(score, false);
			gameState = "dead";

		}

		spawnCounter--;
		if(spawnCounter <= 0){
			map.spawnMonster();
			spawnCounter = spawnRate;
			spawnRate = Math.max(5, spawnRate-1);
		}
	},

	showLoading: function(){
		gameState = "loading";
		ctx.fillStyle = 'rgba(0,0,0,0.75)';
		ctx.fillRect(0,0,canvas.width, canvas.height);
			
		draw.drawText(`${gameMenu.language == "ja" ? "クリックしてください": "click to start"}`, 52, true, 0, spacing(24), colorShift("red"));

		ctx.drawImage(title_logo, (canvas.width/2)-(canvas.width*0.9)/2, tileSize, (canvas.width*0.9), (title_logo.height/title_logo.width)*(canvas.width*0.9))
	},

	showTitle: function(){
		ctx.fillStyle = `rgba(0,0,0,0.75)`;
		ctx.fillRect(0,0,canvas.width,canvas.height);

		gameState = "title";

		ctx.drawImage(title_logo, (canvas.width/2)-(canvas.width*0.8)/2, tileSize, (canvas.width*0.8), (title_logo.height/title_logo.width)*(canvas.width*0.8))

		let frame_index = perClock(palettes["DECOR"]["WALL_TORCH_ANIM"].length, "milliseconds", palettes["DECOR"]["WALL_TORCH_ANIM"].length)-1;
		draw.drawSprite(decor_spritesheet, palettes["DECOR"]["WALL_TORCH_ANIM"][frame_index], -0.25, 1.5, 2);
		draw.drawSprite(decor_spritesheet, palettes["DECOR"]["WALL_TORCH_ANIM"][frame_index], 14, 1.5, 2);

		draw.drawScores();
	},

	showVictory: function(){
		ctx.fillStyle = `rgba(0,0,0,0.75)`;
		ctx.fillRect(0,0,canvas.width,canvas.height);

		gameState = "victory";

		if(gameEngine.won){
			draw.drawSprite(tileset_spritesheet, palettes["HERO"]["CHALICE"], (canvas.width/tileSize/2)-0.5, 0.75, 1);
			draw.drawText(`VICTORY!`, 96, true, 0, 2.5*tileSize, "gold");
			draw.drawText(`You are a hero!`, 45, true, 0, 3*tileSize, colorShift("rainbow"));

		}else{
			draw.drawSprite(tileset_spritesheet, palettes["HERO"]["DEFEAT"], (canvas.width/tileSize/2)-0.5, 0.75, 1);
			draw.drawText(`DEFEAT!`, 96, true, 0, 2.5*tileSize, "orange");
			draw.drawText(`You are not the hero...`, 45, true, 0, 3*tileSize, colorShift("brown"));
		}

		let frame_index = perClock(palettes["DECOR"]["WALL_TORCH_ANIM"].length, "milliseconds", palettes["DECOR"]["WALL_TORCH_ANIM"].length)-1;
		draw.drawSprite(decor_spritesheet, palettes["DECOR"]["WALL_TORCH_ANIM"][frame_index], -0.25, 1.5, 2);
		draw.drawSprite(decor_spritesheet, palettes["DECOR"]["WALL_TORCH_ANIM"][frame_index], 13.25, 1.5, 2);

		draw.drawScores();
	},

	startGame: function(){
		gameEngine = new GameEngine();
		gameMenu.close()

		gameEngine.setSettings({difficulty:setupSettings.difficulty})
		score = 0;
		gold = 0;
		game.startLevel();

		gameState = "running";

	},

	startLevel: function(playerHP=gameEngine.settings.startingHP){
		spawnRate = 15;
		spawnCounter = spawnCounter = spawnRate;

		map.generateLevel();

		player = new Player(map.randomPassableTile());
		if(map.getTile(1,numTilesY-2).entity){
			map.getTile(1,numTilesY-2).entity.dead = true;
			map.getTile(1,numTilesY-2).entity = null
		};

		player.warp(map.getTile(1,numTilesY-2));
		let neighbor = player.tile.getAdjacentPassableNeighbors()[0];
		player.lastMove = [neighbor.x-player.tile.x, neighbor.y-player.tile.y];
		player.hp = playerHP;
		gameEngine.remaining = checkRemaining(gameEngine.goal[0][0]);
		
		musicPlayer.newTrack(`dungeon${roll(3)}`);
		//game.playMusic(`dungeon${roll(3)}`);
	},

	nextLevel: function(playerHP){
		gameEngine.goal = gameEngine.current_list[gameEngine.level-1];
		gameEngine.goal = gameEngine.vocab_method == 1 ? [gameEngine.goal.EN, gameEngine.goal.JP] : [gameEngine.goal.JP, gameEngine.goal.EN];
		gameEngine.mistake_count = 0;
		gameEngine.cheat = false;

		map.generateLevel();
		//player = new Player(map.randomPassableTile());
		//player.warp(map.randomPassableTile());
		if(map.getTile(1,numTilesY-2).entity){
			map.getTile(1,numTilesY-2).entity.dead = true;
			map.getTile(1,numTilesY-2).entity = null
		};

		player.warp(map.getTile(1,numTilesY-2));
		let neighbor = player.tile.getAdjacentPassableNeighbors()[0];
		player.lastMove = [neighbor.x-player.tile.x, neighbor.y-player.tile.y];
		player.hp = playerHP;
		gameEngine.remaining = checkRemaining(gameEngine.goal[0][0]);

	}

}