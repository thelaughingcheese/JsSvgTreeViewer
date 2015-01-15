var svgNS = "http://www.w3.org/2000/svg";

var mouseX = 0, mouseY = 0;
var mouseDownX = 0; mouseDownY = 0, mouseIsDown = false;

var viewport;
var viewportScaler;
var viewportTranslater;
var viewportX = 0, viewportY = 0, viewportXStart = 0; viewportYStart = 0;
var viewportScale = 1.0;
var viewportHeight = 0, viewportWidth = 0;

var world;
var NODEH = 400;
var NODEV = 80;
var nodes = new Array();

// test and debug
var links = new Array();
//---------------

window.onload = function(){
	viewport = document.getElementById("viewport");
	viewportScaler = document.getElementById("viewportScale");
	viewportTranslater = document.getElementById("viewportTranslate");
	viewportHeight = viewport.scrollHeight;
	viewportWidth = viewport.clientWidth;
	viewportX = viewportWidth/2;
	viewportY = viewportHeight/2;
	viewportTranslate.setAttribute("transform","translate("+viewportX+","+viewportY+")");
	
	world = new World(viewportScaler);
	
	viewport.addEventListener("mousedown", viewportMouseDown,false);
	viewport.addEventListener("mouseup", viewportMouseUp, false);
	viewport.addEventListener("mousewheel", viewportScroll, false);
	
	// test and debug
	for(var i=0;i<100;i++){
		for(var v=i+1;v<101;v++){
			if(Math.random() > 0.9){
				var Link = new Array();
				Link.push(i);
				Link.push(v);
				links.push(Link);
			}
		}
	}
	
	nodes.push(new Node(0,0,70,world));
	//---------------
}

window.onmousemove = function(event){
	mouseX = event.clientX;
	mouseY = event.clientY;
	
	if(mouseIsDown){
		viewportX = mouseX - mouseDownX + viewportXStart;
		viewportY = mouseY - mouseDownY + viewportYStart;
		
		viewportTranslate.setAttribute("transform","translate("+viewportX+","+viewportY+")");
	}
	
	/*var rect = document.createElementNS(svgNS,"rect");
	rect.setAttribute("fill","black");
	rect.setAttribute("height","10");
	rect.setAttribute("width","10");
	rect.setAttribute("x",mouseX);
	rect.setAttribute("y",mouseY);
	rect.addEventListener("mouseup", function(event){
		//alert("NO CLICK MEH");
	}, false);
	viewport.appendChild(rect);*/
}

function viewportMouseDown(evt){
	if(evt.which == 1){
		mouseDownX = mouseX;
		mouseDownY = mouseY;
		viewportXStart = viewportX;
		viewportYStart = viewportY;
		mouseIsDown = true;
	}
}

function viewportMouseUp(evt){
	if(evt.which == 1){
		mouseIsDown = false;	
	}
}

function viewportScroll(evt){
	if(evt.wheelDelta >= 0){
		viewportX -= ((mouseX-viewportX)*0.2);
		viewportY -= ((mouseY-viewportY)*0.2);
		viewportScale *= 1.2;
	}
	else{
		viewportX += ((mouseX-viewportX)*0.2);
		viewportY += ((mouseY-viewportY)*0.2);
		viewportScale *= 0.8;
	}
	viewportTranslate.setAttribute("transform","translate("+viewportX+","+viewportY+")");
	viewportScaler.setAttribute("transform","scale(" + viewportScale + ")");
}

function World(container){
	this.container = container;
}

World.prototype.resize = function(){
}