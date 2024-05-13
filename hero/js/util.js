Array.prototype.last = function() {
    return this[this.length - 1];
}

toTitleCase = function(str) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}

wrapText = function(str, len, lim) {
  var limit = lim || 99;

  if(str.length > len){
    str = str.split(' ', limit);
  }



  return str;
}

function splitString (str, len){
    let arr = str?.split(' ');
    let result=[]
    let subStr=arr[0]
    for(let i = 1; i < arr.length; i++){
        let word = arr[i]
        if(subStr.length + word.length + 1 <= len){
            subStr = subStr + ' ' + word
        }
        else{
            result.push(subStr);
            subStr = word
        }
    }
    if(subStr.length){result.push(subStr)}
    return result
}

function splitOnCapital(str) {
  return str
    .trim()
    .split(/(?=[A-Z])/)
    .map(element => element.trim());
}

function scaleFontToWidth(text, size, width){
  ctx.font = `normal ${size}px Noto Sans Japanese`;
  let textWidth = ctx.measureText(text).width;

  while(textWidth > width){
    size--;
    ctx.font = `normal ${size}px Noto Sans Japanese`;
    textWidth = ctx.measureText(text).width;
    if(size<8){
      break
    }
  }

  return size
}

function tryTo(description, callback){
	for(let timeout=2000; timeout>0;timeout--){
		if(callback()){
			return;
		}
	}
	throw 'Timeout while trying to '+description;
}

function randomRange(min, max){
	return Math.floor(Math.random()*(max-min+1))+min;
}

function randomElement(array){
  return shuffle(array)[0]
}

function roll(max, min){
  return randomRange(min || 1, max || 100)
}

function diceroll(diceroll){
  let repeat = Number(diceroll.split(/[\+d]+/)[0]);
  let sides = Number(diceroll.split(/[\+d]+/)[1]);
  let base = Number(diceroll.split(/[\+d]+/)[2]);

  if([repeat, sides, base].every(e => e == 0)){return 0};
  
  let value = base + Array(repeat).fill(sides).map(e=>roll(e)).reduce((e,v)=>e+v)

  return value
}

function inRange(value, min, max){

	if(min <= value && value <= max){
		return true;

	}else{
		return false;
		
	}
}

function decimalPlaces(x, places){
  return Number.parseFloat(x).toFixed(places || 2)
}

function rotateArray(arr, count = 1){
  return [...arr.slice(count, arr.length), ...arr.slice(0, count)];
};

function arrayRange(start, stop, step){
    let steps = step || 1;
    let range_array = Array.from( { length: (stop - start) / steps + 1 }, (value, index) => start + index * steps );
    return range_array;
}

function colorShift(color){
	let date = new Date;

	if(color == "rainbow"){

		return "hsl("+((date.getMilliseconds()/1000)*(360))+",70%,50%)";

	}else if(color != undefined){
		let hueValue = nameToHue(color);

		//return "hsl("+hueValue+","+(Math.abs((date.getMilliseconds()/1000)*(100)-50)+50)+"%,50%)";
    return "hsl("+hueValue+",75%,"+(Math.abs((date.getMilliseconds()/1000)*(100)-50)+25)+"%)";


	}else{

		return "hsl(0,0%,"+(Math.abs((date.getMilliseconds()/1000)*(100)-50)+50)+"%)";
	}
}

function nameToHue(name) {
  let fakeDiv = document.createElement("div");
  fakeDiv.style.color = name;
  document.body.appendChild(fakeDiv);

  let cs = window.getComputedStyle(fakeDiv),
      pv = cs.getPropertyValue("color");

  document.body.removeChild(fakeDiv);

  // Code ripped from RGBToHSL() (except pv is substringed)
  let rgb = pv.substr(4).split(")")[0].split(","),
      r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255,
      cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  if (delta == 0)
    h = 0;
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  else if (cmax == g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0)
    h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return h;
}


function nameToHSL(name) {
  let fakeDiv = document.createElement("div");
  fakeDiv.style.color = name;
  document.body.appendChild(fakeDiv);

  let cs = window.getComputedStyle(fakeDiv),
      pv = cs.getPropertyValue("color");

  document.body.removeChild(fakeDiv);

  // Code ripped from RGBToHSL() (except pv is substringed)
  let rgb = pv.substr(4).split(")")[0].split(","),
      r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255,
      cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  if (delta == 0)
    h = 0;
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  else if (cmax == g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return "hsl(" + h + "," + s + "%," + l + "%)";
}

function nameToGradient(name) {
  let fakeDiv = document.createElement("div");
  fakeDiv.style.color = name;
  document.body.appendChild(fakeDiv);

  let cs = window.getComputedStyle(fakeDiv),
      pv = cs.getPropertyValue("color");

  document.body.removeChild(fakeDiv);

  // Code ripped from RGBToHSL() (except pv is substringed)
  let rgb = pv.substr(4).split(")")[0].split(","),
      r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255,
      cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  if (delta == 0)
    h = 0;
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  else if (cmax == g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [  
            `hsl(${h},${s}%,${Math.min(100, l+20)}%)`,
            `hsl(${h},${s}%,${l}%)`,
            `hsl(${h},${s}%,${Math.max(0, l-20)}%)`,
            // `hsl(${h},${s}%,${l}%)`,
            // `hsl(${h},${s}%,${Math.min(100, l-15)}%)`,
            // `hsl(${h},${s}%,${Math.min(100, l-30)}%)`,
            ];
}

function getTransitionSteps(colorFrom, colorTo, steps) {
    var stepList = [],
        from = parseColor(colorFrom),
        to = parseColor(colorTo);

    var stepAmountR = Math.floor((to.R - from.R) / steps);
    var stepAmountG = Math.floor((to.G - from.G) / steps);
    var stepAmountB = Math.floor((to.B - from.B) / steps);

    stepList.push(colorFrom);
    for (var i = 0; i <= steps; i++) {
        var minMax;
        // Red
        minMax = stepAmountR > 0 ? Math.min : Math.max;
        from.R = minMax(from.R + stepAmountR, to.R);

        // Green
        minMax = stepAmountG > 0 ? Math.min : Math.max;
        from.G = minMax(from.G + stepAmountG, to.G);

        // Blue
        minMax = stepAmountB > 0 ? Math.min : Math.max;
        from.B = minMax(from.B + stepAmountB, to.B);
        stepList.push(from.isHex ? rgbToHex(from.R, from.G, from.B) : "rgb(" + from.R + ", " + from.G + ", " + from.B + ")");
    }
    stepList.push(colorTo);
    return stepList;
};

function parseColor(color) {
    var isHex = color.indexOf("#") != -1;
    if (isHex) {
        return { isHex: true, R: hexToR(color), G: hexToG(color), B: hexToB(color) };
    } else {
        var parsed = color
            .substring(4, color.length - 1)
            .replace(/ /g, '')
            .split(',');
        return {
            R: parseInt(parsed[0]),
            G: parseInt(parsed[1]),
            B: parseInt(parsed[2])
        };
    }
};

var hexToR = function(h) { return parseInt((cutHex(h)).substring(0, 2), 16); };
var hexToG = function(h) { return parseInt((cutHex(h)).substring(2, 4), 16); };
var hexToB = function(h) { return parseInt((cutHex(h)).substring(4, 6), 16); };
var cutHex = function(h) { return (h.charAt(0) == "#") ? h.substring(1, 7) : h; };

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


function audioWaveform(noise_level){
  class Perlin {
    constructor() {
      // Quick and dirty permutation table
      this.perm = (() => {
        const tmp = Array.from({ length: 256 }, () => Math.floor(Math.random() * 256));
        return tmp.concat(tmp)
      })();
    }
    
    grad(i, x) {
      const h = i & 0xf;
      const grad = 1 + (h & 7);
      
      if ((h & 8) !== 0) {
        return -grad * x;
      }
      
      return grad * x;
    }
    
    getValue(x) {
      const i0 = Math.floor(x);
      const i1 = i0 + 1;
      
      const x0 = x - i0;
      const x1 = x0 - 1;
      
      let t0 = 1 - x0 * x0;
      t0 *= t0;
      
      let t1 = 1 - x1 * x1;
      t1 *= t1;
      
      const n0 = t0 * t0 * this.grad(this.perm[i0 & 0xff], x0);
      const n1 = t1 * t1 * this.grad(this.perm[i1 & 0xff], x1);
      
      return 0.395 * (n0 + n1);
    }
  }

  const sample = [
    0.03, 
    0.04,
    0.07,
    0.23,
    0.18,
    0.5,
    0.20,
    0.5,
    0.35,
    0.35,
    0.25,
    0.3,
    0.12,
    0.07,
    0.23,
    0.5,
    0.29,
    0.4,
    0.2,
    0.13,
    0.05,
    0.15,
    0.2,
    0.15,
    0.12,
    0.08,
    0.05,
    0.04,
    0.03,
    0.03,
  ];

  const jumpTime = 125;

  const segmentElements = [];

  // Set init sizes of each segment
  sample.forEach((value, i) => {
    segmentElements.push(200);
  });


  function jump() {  
    const noise = new Perlin();
      
    segmentElements.forEach((segmentElement, i) => {
      let value = 
        // normalize [-1, 1] => [0, 1]
        (noise.getValue(i * 0.1) + 1) / 2 
        // multiply by random value
        * Math.random()
        * sample[i]*(noise_level*0.01);
      
      // Adding a minimum
      //value = value < 0.01 ? 0.01 : value;

      //Clamping the maximum
      value = Math.min(0.03, value);

      // segmentElement.style.transition = `transform ${ jumpTime }ms linear`;
      // segmentElement.style.transform = `scale3d(1, ${ value }, 1)`
      segmentElements[i] *= value;
    })
  }

  jump()

  return segmentElements

}

function shuffle(arr){
	let temp, r;
	for (let i = 1; i < arr.length; i++) {
		r = randomRange(0,i);
		temp = arr[i];
		arr[i] = arr[r];
		arr[r] = temp;
    //[temp, arr[i], arr[r]] = [arr[i], arr[r], temp];
	}
	return arr;
}

//manhattan distance
function getDistanceMan(obj1, obj2){
	return Math.abs(obj1.tile.x-obj2.tile.x)+Math.abs(obj1.tile.y-obj2.tile.y);
}

//pythagorean distance
function getDistancePyth(obj1, obj2){
  
  return Math.hypot((obj1.tile.x-obj2.tile.x), (obj1.tile.y-obj2.tile.y));
  //return Math.sqrt((obj1.tile.x-obj2.tile.x)**2+(obj1.tile.y-obj2.tile.y)**2);
}

function getPyth(obj1, obj2){

  return Math.hypot((obj1.x-obj2.x), (obj1.y-obj2.y))
  //return Math.sqrt((obj1.x-obj2.x)**2+(obj1.y-obj2.y)**2);
}


function bresenSight(obj1, obj2){
  let[x0, x1, y0, y1]  = [obj1.tile.x, obj2.tile.x, obj1.tile.y, obj2.tile.y];

  let dx =  Math.abs(x1-x0);
  let sx = x0<x1 ? 1 : -1;
  let dy = -Math.abs(y1-y0);
  let sy = y0<y1 ? 1 : -1; 
  let err = dx+dy;
  let e2; /* error value e_xy */

  let visible = true;

  while(!(x0==x1 && y0==y1)){
    if(x0==x1 && y0==y1){
      break
    
    }
    
    e2 = 2*err;
    
    if(e2 >= dy){
      err += dy;
      x0 += sx;
    
    } /* e_xy+e_x > 0 */
    
    if(e2 <= dx){
      err += dx;
      y0 += sy;

    } /* e_xy+e_y < 0 */

    if(!(getTile(x0, y0) instanceof Floor)){
      visible = false;
      break
      
    }

  }

  return visible
}

function bresenLight(obj1, obj2){
  let[x0, x1, y0, y1]  = [obj1.tile.x, obj2.tile.x, obj1.tile.y, obj2.tile.y];

  let dx =  Math.abs(x1-x0);
  let sx = x0<x1 ? 1 : -1;
  let dy = -Math.abs(y1-y0);
  let sy = y0<y1 ? 1 : -1; 
  let err = dx+dy;
  let e2; /* error value e_xy */

  let lit = true;

  while(!(x0==x1 && y0==y1)){
    if(x0==x1 && y0==y1){
      break
    
    }
    
    e2 = 2*err;
    
    if(e2 >= dy){
      err += dy;
      x0 += sx;
    
    } /* e_xy+e_x > 0 */
    
    if(e2 <= dx){
      err += dx;
      y0 += sy;

    } /* e_xy+e_y < 0 */

    if(!(getTile(x0, y0) instanceof Floor)){
      lit = false;
      break
      
    }

  }

  return lit
}


function rightPad(textArray){
	textArray.forEach((text,i,a) => {
		if(!text.includes("undefined")){
      a[i]+=`　`.repeat(12-text.toString().length);
    }
	});
	return textArray.join("");
}

function perClock(variable, time_unit, division){
	let date = new Date();
	let time_now;
  let time_max;

	if(time_unit == "seconds"){
		time_now = date.getSeconds();
		time_max = 60;
	}else if(time_unit == "milliseconds"){
		time_now = date.getMilliseconds();
		time_max = 1000;
	}else{
    time_now = date.getMilliseconds();
    time_max = 1000;
  }

	for(let i = 1; i <= division; i++){
		if(time_now/time_max >= i/division && time_now/time_max < (i+1)/division){
      variable = variable*((i)/division);
      break
		}
	}

	return variable
}

function compareArrays(a, b){
  return JSON.stringify(a) === JSON.stringify(b);
}