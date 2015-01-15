function Node(x,y,depth,id,parent){
	this.x = x;
	this.y = y;
	this.depth = depth;
	this.id = id;
	this.loaded = false;
	this.spacing = 80;
	this.children = new Array();
	this.stepChildren = new Array();
	this.parent = parent;
	this.lines = new Array();
	this.parentLines = new Array();
	this.container = document.createElementNS(svgNS,"g");
	
	var box = document.createElementNS(svgNS,"rect");
	var number = document.createElementNS(svgNS,"text");
	box.setAttribute("fill","#ffa500");
	box.setAttribute("height","40");
	box.setAttribute("width","40");
	box.setAttribute("x",-20);
	box.setAttribute("y",-20);
	number.setAttribute("x",-8);
	number.setAttribute("y",6);
	number.textContent = id;
	number.style.font = "15px sans-serif";
	number.style.pointerEvents = "none";
	
	this.setPos(x,y);
	viewportScaler.appendChild(this.container);
	this.container.appendChild(box);
	this.container.appendChild(number);
	
	var self = this;
	box.addEventListener("mouseup",function(){self.getChildren()},false);
}

Node.prototype.setPos = function(_x,_y){
	var dx = _x - this.x;
	var dy = _y - this.y;
	
	this.x = _x;
	this.y = _y;
	this.container.setAttribute("transform","translate("+this.x+","+this.y+")");
	
	for(z in this.children){
		this.children[z].setPos(this.children[z].x+dx,this.children[z].y+dy);
	}
	for(z in this.parentLines){
		this.parentLines[z].update();
	}
	for(z in this.lines){
		this.lines[z].update();
	}
}

Node.prototype.setLocalPos = function(_x,_y){
	this.setPos(_x + this.parent.x, _y + this.parent.y);
}

Node.prototype.getChildren = function(){
	if(mouseX == mouseDownX && mouseY == mouseDownY && !this.loaded){
		var children = new Array();
		for(x in links){
			if(links[x][0] == this.id){
				console.log(links[x][0] + " " + links[x][1]);
				children.push(links[x]);
			}
		}
		
		for(x in children){
			var nodeI = this.findNode(children[x][1]);
			if(nodeI != -1){
				this.stepChildren.push(nodes[nodeI]);
			}
			else{
				var child = new Node(0,0,this.depth+1,children[x][1],this);
				this.children.push(child);
				nodes.push(child);
			}
		}
		
		this.spacing = Math.max(NODEV*this.children.length,NODEV);
		this.parent.resize();
		
		for(x in this.children){
			this.children[x].setLocalPos(NODEH,NODEV*2*x-(this.children.length-1)*NODEV);
			
			new Line(this,this.children[x],"black");
		}
		for(x in this.stepChildren){
			new Line(this,this.stepChildren[x],"red");
		}
		
		this.loaded = true;
	}
}

Node.prototype.findNode = function(id){
	for(y in nodes){
		if(nodes[y].id == id){
			return y;
		}
	}
	return -1;
}

Node.prototype.resize = function(){
	var newSpacing = 0;
	for(x in this.children){
		newSpacing += this.children[x].spacing;
	}
	this.spacing = newSpacing;

	var lastPos = 0;
	for(x in this.children){
		this.children[x].setLocalPos(NODEH,this.children[x].spacing+lastPos-this.spacing);
		lastPos += 2*this.children[x].spacing;
	}
	for(x in this.lines){
		this.lines[x].update();
	}

	this.parent.resize();
}