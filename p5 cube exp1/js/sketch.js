class Boid{
	constructor(){	
		this.position = new p5.Vector(0,0);
		this.speed = new p5.Vector(0,0);		
	}
  
	target(){ return p5.Vector.add(this.position , this.speed);}
	step(){this.position = this.target();}
	moveTo(x,y){this.position.set(x,y);}
}

class Side{
	constructor(x,y){
		this.position = new p5.Vector(x,y);
		this.size = 200;
		this.distance = Math.sqrt(200*200+200*200);
	}
	
	draw(){
		square(this.position.x,this.position.y,this.size);	
	}
}

var sides = [
                new Side(200,0),
				new Side(200,200),
				new Side(200,400),
				new Side(200,600),
				new Side(0,400),
				new Side(400,400)
			]

var boid = new Boid();	

function setup() {
	createCanvas(600, 800);
	frameRate(30);		
	boid.position.x = random(200,400);
	boid.speed.y = 5;
	boid.speed.rotate(random(PI+PI));
}

function draw() {
	updateBoid();
	drawSides();
	drawBoid();	
}

function updateBoid(){
	let originSide = hitWhichSide(boid.position);
	let targetSide = hitWhichSide(boid.target());
	if(targetSide==-1){
		if(boid.position.x < 200){
			if(boid.position.y < 200){
			
			}else if(boid.position.y < 400){
			
			}else if(boid.position.y < 600){
			
			}else if(boid.position.y < 800){
			
			}				
		}else if(boid.position.x >= 400){
		  boid.moveTo(boid.position.y,boid.position.x);
		}
		console.log(originSide);
	}else{		
		boid.step();
	}
}

function drawSides(){
	for(let i=0;i<6;i++){
		sides[i].draw();
	}
}

function drawBoid(){
	ellipse(boid.position.x,boid.position.y,5);
}

function hitWhichSide(point){
	let side = 6;
	for(side=0;side<6;side++){
	  if(hitSide(sides[side],point)){
		  return side;
	  }	  
	}	
	return -1;
}

function hitSide(side,point){
	if(side.position.x <= point.x){
	  if(side.position.y <= point.y){
	    return side.position.dist(point) <= side.distance;
	  }
	}
	return false;
}

function hitPoint(point1,point2,point3,point4){
  const ua = ((point4.x - point3.x) * (point1.y - point3.y) - 
             (point4.y - point3.y) * (point1.x - point3.x)) /
            ((point4.y - point3.y) * (point2.x - point1.x) - 
             (point4.x - point3.x) * (point2.y - point1.y));
  
  const ub = ((point2.x - point1.x) * (point1.y - point3.y) - 
             (point2.y - point1.y) * (point1.x - point3.x)) /
            ((point4.y - point3.y) * (point2.x - point1.x) - 
             (point4.x - point3.x) * (point2.y - point1.y));
  
  const x = point1.x + ua * (point2.x - point1.x);
  const y = point1.y + ua * (point2.y - point1.y);
  
  return [x, y]
}