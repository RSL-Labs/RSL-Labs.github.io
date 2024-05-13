messageSettings = {
	COLOR: "white",
	MAXCOUNT: "6",
}

class messageLog{
	constructor(initialMessage, color, maxLength){
		const iMessage = initialMessage || "DEFAULT";
		const c = color || "white";
		// this.log = [];
		// for(let i=0; i<50; i++){
		// 	this.log.push([iMessage+i, c])
		// }
		this.log = [[iMessage, c]];
		this.maxLength = maxLength ?? 6;
	}

	add(message, color){
		const c = color || "white";
		this.log.unshift([message, c]);
		
	}

	clear(){
		this.log = [];
	}
}