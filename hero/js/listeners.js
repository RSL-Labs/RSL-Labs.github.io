function playerInput(dx,dy){
	if(Transition.fade != "none"){ return };

	player.tryMove(dx,dy);
}

function addMultipleEventListener(element, events, handler) {
  events.forEach(e => element.addEventListener(e, handler))
}

function setupListeners() {
	//MOUSE LISTENERS
	document.querySelector("html").onclick = function(e){
	
		if(gameState == "running"){
			if(Transition.fade != "none"){ return };

			for(let i=0; i<ui.buttons.length; i++){
				if(ui.buttons[i].clickCheck({x:e.offsetX ,y:e.offsetY})){
					break
				};
			}

		//So player can check what active inventory they had after death
		}else{
			for(let i=0; i<Math.min(ui.buttons.length, 2); i++){
				if(ui.buttons[i].clickCheck({x:e.offsetX ,y:e.offsetY})){
					break
				};
			}
		}

		if(gameState == "loading"){
			if(gameMenu.settings.music){
				musicPlayer.newTrack("title");
			}

			game.showTitle();
		}
	}

	document.querySelector("html").onmousedown = function(e) {
		//console.log(e);
		
		if(e.button == 0){
			//NOTHING

		}else if(e.button == 1){
			e.preventDefault();
			middleClick(e);

		}else if(e.button == 2){
			//NOTHING

		}
	}

	document.querySelector("html").oncontextmenu = function(e) {
		window.event.returnValue = false;
	}

	document.querySelector("html").onwheel = function(e) {
		if(gameMenu.currentMenus.length){
			if(e.deltaY < 0){
				gameMenu.update("up")//document.querySelector(".buttonUp").dispatchEvent(new Event("buttonUpClick"));
			}else if(e.deltaY > 0){
				gameMenu.update("down")//document.querySelector(".buttonDown").dispatchEvent(new Event("buttonDownClick"));
			}
		}

	}

	window.addEventListener("wheel", e => e.preventDefault(), { passive:false })

	//SCREEN GAMEPAD INPUTS
	function inputUp(e){
		if(gameState == "running") playerInput(0, -1);
		if(["menu", "titlemenu"].includes(gameState)) gameMenu.update("up");
		if(gameState == "use"){
			player.use({key:"move", value:-1})
		}		
	}

	function inputDown(e){
		if(gameState == "running") playerInput(0, 1);
		if(["menu", "titlemenu"].includes(gameState)) gameMenu.update("down");
		if(gameState == "use"){
			player.use({key:"move", value:1})
		}
	}

	function inputLeft(e){
		if(gameState == "running") playerInput(-1, 0);
		if(["menu", "titlemenu"].includes(gameState)) gameMenu.update("left");
		if(gameState == "use"){
			player.use({key:"move", value:-1})
		}
	}
	
	function inputRight(e){
		if(gameState == "running") playerInput(1, 0);
		if(["menu", "titlemenu"].includes(gameState)) gameMenu.update("right");
		if(gameState == "use"){
			player.use({key:"move", value:1})
		}
	}
	
	
	function inputSelect(e){

		if(gameState == "title"){
			gameMenu.open("mainMenu", "titlemenu");

		}else if(gameState == "dead"){
			musicPlayer.newTrack("title");
			game.showTitle();

		}else if(gameState == "running"){
			if(Transition.fade != "none"){ return };

			map.checkAnswer();

		}else if(["menu", "titlemenu"].includes(gameState)){
			gameMenu.update("select"); 

		}else if(gameState == "use"){
			ui.buttons[ui.currentButton].func();
			gameState = "running";
		}
	}

	function inputCancel(e){
		if(gameState == "title"){
			gameMenu.open("mainMenu", "titlemenu");

		}else if(gameState == "titlemenu"){
			gameMenu.cancel();

		}else if(gameState == "dead"){
			musicPlayer.newTrack("title");
			game.showTitle();

		}else if(gameState == "menu" || gameState == "npc"){
			gameMenu.cancel();

		}else if(gameState == "use"){
			playSound("buttonCancel");
			gameState = "running"; 
		}
	}

	function inputMute(e){
		gameMenu.settings.isMuted = !gameMenu.settings.isMuted;
		if(gameMenu.settings.isMuted){
			document.getElementById("buttonMute").innerHTML="🔇";
			musicPlayer.pause();
		}else{
			document.getElementById("buttonMute").innerHTML="🔊";
			musicPlayer.newTrack(musicPlayer.currentTrack);
		}
	}

	function inputMenu(e){

		if(gameState == "title"){
			gameMenu.open("mainMenu", "titlemenu");

		}else if(gameState == "running" && !player.inMinecart){
			if(Transition.fade != "none"){ return };
			
			player.isMoving = false;
			gameMenu.open("gameMain");

		}else if(gameState == "menu"){
			gameMenu.cancel()

		};
	}

	//KEYBOARD INPUTS (forwards to on-screen inputs)
	document.querySelector("html").onkeydown = function(e) {

		if(e.key != "F5" && e.key && gameState == "title"){e.preventDefault(); inputMenu(); return}

		if(e.key=="w" || e.key=="ArrowUp"){ e.preventDefault(); inputUp() };
		if(e.key=="s" || e.key=="ArrowDown"){ e.preventDefault(); inputDown() };
		if(e.key=="a" || e.key=="ArrowLeft"){ inputLeft() };
		if(e.key=="d" || e.key=="ArrowRight"){ inputRight() };

		if(e.key==" " || e.key=="Enter"){ e.preventDefault(); inputSelect() };

		if(["Escape","e","Delete"].includes(e.key)){ 
			if(gameState == "menu"){
				if(["Escape","Delete"].includes(e.key)){
					gameMenu.close();
				}else if(e.key == "e"){
					inputCancel();
				}
				
				return;
			};

			if(gameState == "victory"){
				gameState = "loading";

			}else if(gameState == "running"){
				inputMenu();
			}
		};
			
		if(e.key=="r" || e.key=="Backspace"){ inputCancel() };

		
		if(gameState != "title" && e.key=="o" && globalDebug){

			//SOME DEBUG FUNCTIONS
			console.group("Debug Stats:");
			console.log(gameMenu.language);
			console.log(gameMenu);
			console.log(gameEngine);
			console.log(player);
			console.log(player.tile.getSurroundingNeighbors());
			//console.log(Particles)
			console.groupEnd();

			gameEngine.cheat = !gameEngine.cheat;

		}

		if(gameState == "running"){
			if(Transition.fade != "none"){ return };

			if(e.code.includes("Digit") || (e.code.includes("Numpad") && e.getModifierState("NumLock"))){
				let key = e.code.slice(-1);

				if(inRange(key, 1, 8) && player.items.at(key-1) ) {player.useItem(player.items.at(key-1), key-1)};
			}
		}
	};

}