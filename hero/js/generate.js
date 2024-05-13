generate = {

	generateTiles_grid: function(){
		let passableTiles = 0;
		tiles = [];
		floor_tiles = [];

		for(let i=0; i<numTilesX; i++){
			tiles[i] = [];

			for(let j=0; j<numTilesY; j++){
				if(Math.random() < gameEngine.settings.difficulty*0.1 || !map.inBounds(i,j)){
					if(map.outBounds(i,j)){
						tiles[i][j] = new Void({x:i, y:j});

					}else{
						tiles[i][j] = new Wall({x:i, y:j});

					}

				}else{
					tiles[i][j] = new Floor({x:i, y:j});
					floor_tiles.push(tiles[i][j])
					passableTiles++;
				}
			}
		}

		return passableTiles;
	},

	generateTiles_spread: function(){
		let passableTiles = 0;
		tiles = [];
		floor_tiles = [];

		for(let i=0; i<numTilesX; i++){
			tiles[i] = [];

			for(let j=0; j<numTilesY; j++){
				tiles[i][j] = new Void({x:i, y:j});
			}
		}

		for(let j=numTilesY-2; j>0; j--){
			let i = Math.floor(numTilesX/2);

			tiles[i][j] = new Floor({x:i, y:j});
			floor_tiles.push(tiles[i][j])
			passableTiles++;
		}

		while(floor_tiles.length && passableTiles<(numTilesX*numTilesY)/2){
			let tile = shuffle(floor_tiles).pop()

			let neighbors = tile.getAdjacentNeighbors().filter(e => !(e instanceof Floor) && inRange(e.x, 1, numTilesX-2) && inRange(e.y, 1, numTilesY-2));
					
			neighbors.forEach(n => {
				if(roll(100)> 60){
					tiles[n.x][n.y] = new Floor({x:n.x, y:n.y});
					floor_tiles.push(tiles[n.x][n.y])
					passableTiles++;
				}
			})
		}

		console.log(passableTiles, tiles)

		for(let i=0; i<numTilesX; i++){
			for(let j=0; j<numTilesY; j++){
				let tile = tiles[i][j];

				if(tile instanceof Floor){
					floor_tiles.push(tiles[i][j])
				}

				if(tile instanceof Void && tile.getSurroundingNeighbors().some(e => e instanceof Floor)){
					tiles[i][j] = new Wall({x:i, y:j});
				}
			}
		}


		return passableTiles;
	},

	generateTiles_wander: function(){
		let passableTiles = 0;
		let lifeTime = 20;
		tiles = [];
		floor_tiles = [];

		for(let i=0; i<numTilesX; i++){
			tiles[i] = [];

			for(let j=0; j<numTilesY; j++){
				tiles[i][j] = new Void({x:i, y:j});
			}
		}

		var i = Math.floor(numTilesX/2);
		var j = Math.floor(numTilesY/2);
		tiles[i][j] = new Floor({x:i, y:j});
		var tile = tiles[i][j];
		floor_tiles.push(tiles[i][j])

		while(floor_tiles.length < lifeTime){
			neighbors = shuffle(tile.getAdjacentNeighbors().filter(e => !(e instanceof Floor) && inRange(e.x, 1, numTilesX-2) && inRange(e.y, 1, numTilesY-2)))
			while(!neighbors.length){
				neighbors = shuffle(floor_tiles)[0].getAdjacentNeighbors().filter(e => !(e instanceof Floor) && inRange(e.x, 1, numTilesX-2) && inRange(e.y, 1, numTilesY-2))
			}

			tile = neighbors.pop();
			console.log(tile);
			[i, j] = [tile.x, tile.y];

			tiles[i][j] = new Floor({x:i, y:j});
			tile = tiles[i][j];
			floor_tiles.push(tiles[i][j])
			passableTiles++;
		}

		console.log(passableTiles, floor_tiles, tiles)
		for(let i=0; i<numTilesX; i++){
			for(let j=0; j<numTilesY; j++){
				let tile = tiles[i][j];

				if(tile instanceof Void){
					if(tile.getSurroundingNeighbors().some(e => e instanceof Floor)){
						tiles[i][j] = new Wall({x:i, y:j});
					}else{
						//DO NOTHING
					}
				}
			}
		}

		return passableTiles;
	},

	generateTiles_stepper: function(){
		let passableTiles = 0;
		let lifeTime = 20;
		tiles = [];
		floor_tiles = [];

		for(let i=0; i<numTilesX; i++){
			tiles[i] = [];

			for(let j=0; j<numTilesY; j++){
				tiles[i][j] = new Void({x:i, y:j});
			}
		}

		var i = Math.floor(numTilesX/2);
		var j = Math.floor(numTilesY/2);
		[i, j] = [1, numTilesY-2];
		
		tiles[i][j] = new Floor({x:i, y:j});
		var tile = tiles[i][j];
		floor_tiles.push(tiles[i][j])
		var move = {x:0,y:0};
		if(roll(100)>50){
			move.x = Math.random() < 0.5 ? 1 : -1;
		}else{
			move.y = Math.random() < 0.5 ? 1 : -1;
		}
		var stepMax = 3;
		var step = 0;

		while(floor_tiles.length < lifeTime){
			if(step == stepMax){
				step = 0;
				if(move.x == 0){
					move.x = Math.random() < 0.5 ? 1 : -1;
					move.y = 0;
				}else{
					move.y = Math.random() < 0.5 ? 1 : -1;
					move.x = 0;
				}
			}

			while(!inRange(i+move.x, 1, numTilesX-2) || !inRange(j+move.y, 1, numTilesY-2)){
				//tile = shuffle(floor_tiles)[0];
				tile = floor_tiles.at(-1);
				[i, j] = [tile.x, tile.y]

				if(roll(100)>50){
					move.x = Math.random() < 0.5 ? 1 : -1;
					move.y = 0;
				}else{
					move.y = Math.random() < 0.5 ? 1 : -1;
					move.x = 0;
				}
			}

			tile = tiles[i+move.x][j+move.y];
			//console.log(tile);
			[i, j] = [tile.x, tile.y];
			if(!floor_tiles.some(e => e.x == i && e.y ==j)){
				tiles[i][j] = new Floor({x:i, y:j});
				tile = tiles[i][j];
				floor_tiles.push(tiles[i][j])

				passableTiles++;
			}
			step++;
		}

		for(let i=0; i<numTilesX; i++){
			for(let j=0; j<numTilesY; j++){
				let tile = tiles[i][j];

				if(tile instanceof Void){
					if(tile.getSurroundingNeighbors().some(e => e instanceof Floor)){
						tiles[i][j] = new Wall({x:i, y:j});
					}else{
						//DO NOTHING
					}
				}
			}
		}
		console.log(passableTiles, floor_tiles, tiles)

		return passableTiles;
	},
}