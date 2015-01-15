function Line(parent, child, colour){
	this.parent = parent;
	this.child = child;
	this.svg = document.createElementNS(svgNS,"path");
	
	this.svg.setAttribute("d","M20,0 c190,0 "+(this.child.x-210-this.parent.x)+","+(this.child.y-this.parent.y)+" "+(this.child.x-40-this.parent.x)+","+(this.child.y-this.parent.y));
	this.svg.setAttribute("fill","none");
	this.svg.setAttribute("stroke",colour);
	parent.lines.push(this)
	parent.container.appendChild(this.svg);
	child.parentLines.push(this);
}

Line.prototype.update = function(){
	this.svg.setAttribute("d","M20,0 c190,0 "+(this.child.x-210-this.parent.x)+","+(this.child.y-this.parent.y)+" "+(this.child.x-40-this.parent.x)+","+(this.child.y-this.parent.y));
}