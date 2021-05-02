class Boid{
	constructor(){	
		this.position = new p5.Vector(0,0);		
		this.speed = new p5.Vector(0,0);	
		this.target =  new p5.Vector((this.position.x + this.speed.x), (this.position.y + this.speed.y));
		this.color = 'red';//[random(255),random(255),random(255)];
		this.strokeWeight = 5;//random(1,10);
	}	
	step(){
		this.position = this.target;		
	}
	draw(){		
		stroke(this.color);	
		strokeWeight(this.strokeWeight);
		point(this.position);
	}
	update(){		
		this.step();
		this.target = new p5.Vector((this.position.x + this.speed.x), (this.position.y + this.speed.y));
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
var boidCount = 0;

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
		checkBorders(boids[i]);
		boids[i].update();
		boids[i].draw();				
	}	
}

function checkBorders(boid){
	let distances = [];
	for(let i=0;i<sides.length;i++){		
		distances[i] = p5.Vector.sub(boid.target, sides[i].position);
		if((distances[i].x >= 0) && (distances[i].x < sides[i].size)){		  
		  if((distances[i].y >= 0) && (distances[i].y < sides[i].size)){
			return i;
		  }
		}
	}
	console.log(boid.position.x+":"+boid.position.y+" "+boid.target.x+":"+boid.target.y);
	switch(Math.floor(boid.target.y / 200)){
		case -1:
			boid.target.set(boid.position.x,800);			
			break;
		case 0:
		    if(boid.position.x < 200){
				console.log('0.1');
				boid.target.set(0,600 - boid.position.y);
			}else{
				console.log('0.2');
				boid.target.set(600,600 - boid.position.y);
			}
			boid.speed.mult(-1);
			break;
		case 1:
			if(boid.position.y < 400){				
				if(boid.target.x < 200){
					console.log(boid.position);
					console.log('1.1.1');
					boid.speed.rotate(1.5*PI);
					boid.target.set(boid.position.y - 200,400);
				}else{
					console.log('1.1.2');
					boid.speed.rotate(HALF_PI);
					boid.target.set(800 - boid.position.y,400);
				}
			}else{						
			    if(boid.target.x < 200){
					console.log('1.2.1');
					boid.speed.rotate(HALF_PI);
					boid.target.set(200,boid.position.x + 200);
				}else{
					console.log('1.2.2');
					boid.speed.rotate(1.5*PI);
					boid.target.set(399, boid.position.x - 200);
				}
			}			
			break;
		case 2:		
		    if(boid.position.x < 200){
				console.log('2.1');
				boid.target.set(200,600 - boid.position.y);
			}else{				
			    console.log('2.2');
				boid.target.set(400,600 - boid.position.y);				
			}
			boid.speed.mult(-1);
			break;
		case 3:
		    if(boid.position.y < 600){				
				if(boid.target.x < 200){	
					console.log('3.1.1');				
					boid.speed.rotate(1.5*PI);
					boid.target.set(200, boid.position.x + 600);
				}else{				
					console.log('3.1.2');				
					boid.speed.rotate(HALF_PI);
					boid.target.set(400,boid.position.x + 200);
				}
			}else{						
				if(boid.position.x < 200){	
					console.log('3.2.1');				
					boid.speed.rotate(PI*.5);
					boid.target.set(800-boid.position.y,600);		
				}else{					
					console.log('3.2.2');
					boid.speed.rotate(PI*.5);
					boid.target.set(800 - boid.position.y,600);		
				}		
			}			
			break;
		case 4:
			boid.target.set(boid.position.x,0);			
			break;
		default:
		  boid.target.set(boid.position.x + 600, boid.position.y + 800);
	}	
}


function mouseClicked(event) {	
    if(boids.length>0){
		for(let i=0;i<boids.length;i++){
			boids[i].speed.rotate(PI);
		}
	}else{
		for(let i=0;i<1000;i++){
		let boid = new Boid();		
			boid.position.x = event.x;
			boid.position.y = event.y;
			boid.speed.x = 5;
			boid.speed.rotate(random(PI));
			boid.target = new p5.Vector((boid.position.x + boid.speed.x), (boid.position.y + boid.speed.y));
		boids[boids.length] = boid;
		}  	
	}
}
