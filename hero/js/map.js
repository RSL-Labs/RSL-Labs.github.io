map = {
	generateLevel: function(){
		floor_tiles = [];
		
		generate.generateTiles_grid();

		tryTo(`generate map`, function(){
			return generate.generateTiles_grid() == map.randomPassableTile().getConnectedTiles("passable").length;
			//return generate.generateTiles_path() == map.randomPassableTile().getConnectedTiles("passable").length;
		})

		//generate.generateTiles_path();
		//generate.generateTiles_wander();
		//generate.generateTiles_stepper();

		map.bitmaskTiles();
		map.nameTiles();
		map.decorateTiles();
		map.generateMonsters();
		map.spawnTreasure();


	},


	bitmaskTiles: function(){
      	let wall_tile_select = 0
      	let wall_tile_dict = ["", "_N", "_S", "_NS", "_W", "_NW", "_SW", "_NSW", "_E", "_NE", "_SE", "_NSE", "_EW", "_EWN", "_EWS", "_ALL", "_ERR"];

		let shrink = numTiles-gameEngine.settings.map_size;

      	for(let x=shrink; x<numTilesX-shrink; x++){
			for(let y=shrink; y<numTilesY-shrink; y++){
				let check_tile = tiles[x][y];

	            if( check_tile instanceof Wall ){
	               wall_tile_select = 0;

	               if( map.onBounds(x,y-1) && tiles[x][y-1] instanceof Wall){
	                  wall_tile_select = wall_tile_select + 1;
	               }

	               if( map.onBounds(x, y+1) && tiles[x][y+1] instanceof Wall ){
	                  wall_tile_select = wall_tile_select + 2;
	                  check_tile.no_decor = true;

	               }

	               if( map.onBounds(x-1, y) && tiles[x-1][y] instanceof Wall ){
	                  wall_tile_select = wall_tile_select + 4;

	               }

	               if( map.onBounds(x+1, y) && tiles[x+1][y] instanceof Wall ){
	                  wall_tile_select = wall_tile_select + 8;

	               }

	               tiles[x][y].sprite = palettes["HERO"][`WALL${wall_tile_dict[wall_tile_select]}`]-(setupSettings.special_dungeon==true?0:32);

	            }
	        }
	    }
	},

	decorateTiles: function(){
		let shrink = numTiles-gameEngine.settings.map_size;

      	for(let x=shrink+1; x<numTilesX-shrink-1; x++){
			for(let y=shrink; y<numTilesY-shrink-1; y++){
				let check_tile = tiles[x][y];
				
				if(check_tile instanceof Wall && !check_tile.no_decor){
					if(roll(100) < 33){
						//check_tile.decor.push(palettes["DECOR"]["TABLE_LANTERN_ANIM"])
					}
				}
			}
		}
	},

	nameTiles: function(){
		let tilenamelist = gameEngine.current_list.map((e) => { 
																if (gameEngine.vocab_method == 1){
																	return e["EN"]
																}else{
																	return e["JP"]
																}
															}).slice(0, gameEngine.settings.choice_count)
		//tilenamelist = gameEngine.vocab_method == 1 ? tilenamelist[roll(tilenamelist.length)-1]["EN"] : tilenamelist[roll(tilenamelist.length)-1]["JP"]
		shuffle(floor_tiles).forEach((e,i) => {
			if(i<gameEngine.settings.target_tiles){
				e.name = gameEngine.goal[0];
				e.isGoal = true;

			}else{
				//e.name = gameEngine.vocab_method == 1 ? shuffle(gameEngine.current_list)[0]["EN"] : shuffle(gameEngine.current_list)[0]["JP"];
				//e.name = gameEngine.vocab_method == 1 ? gameEngine.current_list[roll(gameEngine.current_list.length)-1]["EN"] : gameEngine.current_list[roll(gameEngine.current_list.length)-1]["JP"];
				e.name = tilenamelist[roll(tilenamelist.length)-1];

				while(e.name == gameEngine.goal[0]){
					//e.name = gameEngine.vocab_method == 1 ? gameEngine.current_list[roll(gameEngine.current_list.length)-1]["EN"] : gameEngine.current_list[roll(gameEngine.current_list.length)-1]["JP"];
					e.name = tilenamelist[roll(tilenamelist.length)-1];
				}
			}
		})
	},

	inBounds: function(x, y){
		let shrink = numTiles-gameEngine.settings.map_size;

		return x>shrink && y>shrink && x<numTilesX-shrink-1 && y<numTilesY-shrink-1;
	},

	outBounds: function(x, y){
		let shrink = numTiles-gameEngine.settings.map_size;

		return x<shrink || y<shrink || x>numTilesX-shrink-1 || y>numTilesY-shrink-1;
	},

	onBounds: function(x, y){
		let shrink = numTiles-gameEngine.settings.map_size;

		return x>=shrink && y>=shrink && x<=numTilesX-shrink-1 && y<=numTilesY-shrink-1;
	},

	getTile: function(x, y){
		if(map.inBounds(x, y)){
			return tiles[x][y];

		}else{
			if(map.outBounds(x, y)){
				return new Void({x:x, y:y});

			}else{
				return new Wall({x:x, y:y});

			}
		}
	},

	getGoalTiles: function(){
		let goal_tiles = shuffle([...floor_tiles]);
		return goal_tiles.filter(t => t.name == gameEngine.goal[0])
	},

	getViewTiles: function(facing){
		let viewGrid = []

		for(let i=-4; i<=4; i++){
			viewGrid[i+4] = [];

			for(let j=-4; j<=4; j++){
				let [x, y] = [(player.tile.x+i), (player.tile.y+j)]

				if(map.inBounds(x,y)){
					viewGrid[i+4][j+4] = tiles[x][y] instanceof Wall ? 1 : 0;
				}else{
					viewGrid[i+4][j+4] = 1;
				}

			}
		}

		//DEFAULT IS -1x,0y: ADJUSTING DEFAULT TO 0x,-1y
		viewGrid.reverse();
		viewGrid = viewGrid[0].map((val, index) => viewGrid.map(row => row[index]).reverse())

		//ROTATE MATRIX TO VEIWPOINT
		if(facing[0] == -1){
			//CW90DEG
			viewGrid = viewGrid[0].map((val, index) => viewGrid.map(row => row[index]).reverse())

		}else if(facing[0] == 1){
			//CCW90DEG
			viewGrid = viewGrid[0].map((val, index) => viewGrid.map(row => row[row.length-1-index]))

		}else if(facing[1] == -1){
			//NO ROTATION NECESSARY

		}else if(facing[1] == 1){
			//CC90DEGx2
			viewGrid = viewGrid[0].map((val, index) => viewGrid.map(row => row[index]).reverse())
			viewGrid = viewGrid[0].map((val, index) => viewGrid.map(row => row[index]).reverse())
		}

		viewGrid.splice(0,1)
		viewGrid.length = 5;
		//console.log(player.lastMove, viewGrid);
		return viewGrid;

	},

	checkAnswer: function(){
		//INCORRECT TILE
		if(player.tile.name[0] != gameEngine.goal[0][0]){
			
			//TILE IS CLEARED
			if(player.tile.name[0] == ""){
				return
			}

			gameEngine.correct_streak = 0;
			gameEngine.perfect_level_streak = 0;
			gameEngine.perfect_level = false;
			gameEngine.perfect_run = false;

			player.tile.name = [""];
			
			map.spawnMonster();
			score = Math.max(0, score-gameEngine.settings.score_penalty)
			
			if(score == 0){
				player.hit(gameEngine.settings.hp_penalty);
			}

			game.playSound("fail");
			gameEngine.mistake_count++;
			if(gameEngine.settings.hint == "show"){
				gameEngine.mistake_count = 4;
			}

		//CORRECT TILE
		}else{
			player.heal(1);
			player.tile.name = [""];
			gameEngine.remaining--;
			gameEngine.correct_streak++;
			score+=(300+(gameEngine.correct_streak*10));

			game.playSound("success");

			if(gameEngine.remaining <= 0){
				map.randomPassableTile().replace(Exit);
			}
		};
	},

	randomPassableTile: function(){
		let tile;

		tryTo(`get random passable tile`, function(){
			let x = randomRange(0, numTiles-1);
			let y = randomRange(0, numTiles-1);

			tile = map.getTile(x,y);

			return tile.passable && !tile.entity

		});

		return tile;
	},

	generateMonsters: function(){
		monsters = [];

		for(let i=0; i<gameEngine.settings.enemy_count; i++){
			map.spawnMonster()
		}
	},

	spawnMonster: function(args){
		if(monsters.length >= gameEngine.settings.enemy_count && !args?.force){
			return
		}

		let mFamily = shuffle(Object.keys(bestiary))[0]
		let newMonster = new MonsterFactory({tile:map.randomPassableTile(), mFamily:mFamily})

		monsters.push(newMonster)
	},

	spawnTreasure: function(){
		treasure_tiles = shuffle(floor_tiles).filter(e => !e.entity);
		treasure_tiles.length = 3;
		
		treasure_tiles.forEach(t => t.loot.push("GOLD"));
	},
}