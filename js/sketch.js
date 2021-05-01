class Boid{
	constructor(){	
		this.position = new p5.Vector(0,0);
		this.speed = new p5.Vector(0,0);		
	}
  
	target(){ return p5.Vector.add(this.position , this.speed);}
	step(){this.position = this.target();}
	moveTo(x,y){this.position.set(x,y);}
	draw(){
		stroke('purple');		
		strokeWeight(10);
		point(this.position);
	}
}

class Side{
	constructor(x,y){
		this.position = new p5.Vector(x,y);
		this.size = 200;
		this.distance = Math.sqrt(200*200+200*200);
		this.color='grey';
	}
	
	draw(){		
		strokeWeight(2);		
		stroke(this.color);
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
	textSize(32);
	text(Math.round(boid.position.x) + ":" + Math.round(boid.position.y), 10, 30);	
	if(!drawSides()){
		boid.speed.mult(-1);		
	}
	updateBoid();
	drawBoid();	
}

function updateBoid(){
	if(random(2)){
		boid.speed.rotate(random(-PI/45,PI/45));
	}
	boid.step();
}

function drawSides(){
	let result=false;
	for(let i=0;i<6;i++){
		sides[i].color = 'grey';
		let distance = p5.Vector.sub(sides[i].position,boid.position);	
		if((distance.x <= 0) && (distance.x >= -sides[i].size)){		  
		  if((distance.y <= 0) && (distance.y >= -sides[i].size)){
			sides[i].color = 'red';
		    result=true;
		  }
		}
		sides[i].draw();
	}	
	return result;
}

function drawBoid(){
	boid.draw();
}

