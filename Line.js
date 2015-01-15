function Line(parent, child, colour){
	this.parent = parent;
	this.child = child;
	this.svg = document.createElementNS(svgNS,"path");
	
	this.update();
	this.svg.setAttribute("fill","none");
	this.svg.setAttribute("stroke-width","3");
	this.svg.setAttribute("stroke",colour);
	parent.lines.push(this)
	parent.container.appendChild(this.svg);
	child.parentLines.push(this);
}

Line.prototype.update = function(){
	this.svg.setAttribute("d","M20,0 c"+(NODEH/2-20)+",0 "+((NODEH/2-20)-(10*((this.child.x-this.parent.x)/NODEH-1)))+","+(this.child.y-this.parent.y)+" "+(this.child.x-40-this.parent.x)+","+(this.child.y-this.parent.y));
}