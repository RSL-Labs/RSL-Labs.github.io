Transition = {
	fade:"none",
	fadeTimer:0,
	fadeMax:1000,
	onFinish: "none",

	fadeToBlack: async function(rebound=true){
		let timerMax = 20;
		if(this.fade == "toBlack" && this.fadeTimer <= timerMax){
			await (new Promise((resolve, reject) => {
															if(this.fade == "toBlack"){
																return setTimeout(() => {
																							resolve(true);
																						}, 1);
															}else{
																resolve(false);
															}
														}
													)
					);

			this.fadeTimer ++

			ctxMenu.clearRect(0, 0, viewSize*tileSize, viewSize*tileSize);
			ctxMenu.beginPath();
			ctxMenu.rect(0, 0, viewSize*tileSize, viewSize*tileSize);
			ctxMenu.fillStyle = `rgba(0,0,0,${1*((this.fadeTimer)/timerMax)})`;
			ctxMenu.fill();

		}

		if(this.fadeTimer >= timerMax){
			this.fade = "none";
			this.fadeTimer = 0;
			if(this.onFinish != "none"){
				this.onFinish();
				this.onFinish = "none";
				
				if(rebound){
					this.fade = "toVisible";

				}
			}
		}
		//if(on_finish){ on_finish() }


		return true;
	},

	fadeToVisible: async function(rebound=false){
		let timerMax = 30;
		if(this.fade == "toVisible" && this.fadeTimer <= timerMax){
			await (new Promise((resolve, reject) => {
															if(this.fade == "toVisible"){
																return setTimeout(() => {
																							resolve(true);
																						}, 1);
															}else{
																resolve(false);
															}
														}
													)
					);

			this.fadeTimer ++

			ctxMenu.clearRect(0, 0, viewSize*tileSize, viewSize*tileSize);
			ctxMenu.beginPath();
			ctxMenu.rect(0, 0, viewSize*tileSize, viewSize*tileSize);
			ctxMenu.fillStyle = `rgba(0,0,0,${1-((this.fadeTimer)/timerMax)})`;
			ctxMenu.fill();

		}
		
		if(this.fadeTimer >= timerMax){
			this.fade = "none";
			this.fadeTimer = 0;
			if(this.onFinish != "none"){
				this.onFinish();
				this.onFinish = "none";
				
				if(rebound){
					this.fade = "toBlack";

				}
			}
		}

	},


}