class Boid{
	constructor(){	
		this.position = new p5.Vector(0,0);
		this.speed = new p5.Vector(0,0);	
		this.color = [random(255),random(255),random(255)];
		this.strokeWeight = random(1,10);
	}
  
	target(){ return p5.Vector.add(this.position , this.speed);}
	step(){this.position = this.target();}
	moveTo(x,y){this.position.set(x,y);}
	draw(){		
		stroke(this.color);	
		strokeWeight(this.strokeWeight);
		point(this.position);
	}
	update(){
		if(random(2)){
			this.speed.rotate(random(-PI/45,PI/45));
		}
		this.step();
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

var boids = [];
var boidCount = 2048;

function setup(){   
	createCanvas(600, 800);
	frameRate(30);	

    for(let i=0;i<boidCount;i++){
		let boid = new Boid();
		boids[i] = boid;
		boid.position.x = random(200,400);
		boid.position.y = random(0,800);
		boid.speed.y = random(1,10);
		boid.speed.rotate(random(PI+PI));		
	}
}

function draw() {
	strokeWeight(1);	
	stroke('grey');
	rect(0,0,600,800);
	for(let i=0;i<sides.length;i++){
	  sides[i].draw();
	}
	for(let i=0;i<boids.length;i++){	
		let side = outsideBorders(boids[i]);
		if(side == -1){
			boids[i].speed.mult(-1);		
		}
		boids[i].update();
		boids[i].draw();				
	}	
}

function outsideBorders(boid){
	for(let i=0;i<sides.length;i++){		
		let distance = p5.Vector.sub(sides[i].position,boid.target());
		if((distance.x < 0) && (distance.x >= -sides[i].size)){		  
		  if((distance.y < 0) && (distance.y >= -sides[i].size)){
			return i;
		  }
		}		
	}
	return -1;
}
