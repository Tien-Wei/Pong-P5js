let player1;
let player2;
let ball;

function setup() {
	createCanvas(600,400);
	player1 = new Player();
	player2 = new Player(width - 30);
	ball = new Ball();
}


function draw() {
  background(0);
  player1.move();
  player1.show();
  player2.move();
  player2.show();
  ball.touchLeft(player1);
  ball.touchRight(player2);
  ball.bouncing(player1, player2);
  ball.move();
  ball.show();
  fill(255);
  textSize(32);
  textStyle(BOLD);
  text(player1.score, 20, 50);
  text(player2.score, width - 50, 50);
}

function keyPressed() {
	if (key === 'w') {
		player1.dir = -1;
	} else if (key === 's') {
		player1.dir = 1;
	}

	if (key === 'i') {
		player2.dir = -1;
	} else if (key === 'k') {
		player2.dir = 1;
	}
}

function keyReleased() {
	if (key === 'w' || key === 's') {
		player1.dir = 0;
	}
	if (key === 'i' || key === 'k') {
		player2.dir = 0;
	}
}

class Ball {
	constructor(initX = width/2, initY = height / 2, initSpeed = 4, initTheta=  PI / 4, initRadius = 5) {
		this.posVec = createVector(initX, initY);
		this.speedVec = createVector(initSpeed * cos(initTheta), initSpeed * sin(initTheta));
		this.radius = initRadius;
		this.speed = initSpeed;
	}

	move() {
		//this.posVec += this.speedVec
		this.posVec = p5.Vector.add(this.posVec, this.speedVec);
	}

	bouncing(player1, player2) {
		if (0 > this.posVec.x) {
			player2.score +=1;
			this.posVec.set(width / 2, height /2);
		}

		if (this.posVec.x > width) {
			player1.score +=1;
			this.posVec.set(width / 2, height /2);
		}

		if (0 > this.posVec.y || this.posVec.y > height) {
			this.speedVec.y = -this.speedVec.y;
		}
	}

	touchLeft(player) {
		if (((this.posVec.y + this.radius> player.y) && (this.posVec.y - this.radius < player.y + player.height))
			&& ((this.posVec.x + this.radius > player.x) && (this.posVec.x - this.radius< player.x + player.width))) {
			if (this.posVec.x > player.x + player.width ) {
				let diff = this.posVec.y - player.y;
                let theta = map(diff, 0, player.height, -PI / 4, PI/ 4);
                this.speedVec.set(this.speed * cos(theta), this.speed * sin(theta));
                this.posVec.set(player.x + player.width+ this.radius, this.posVec.y)

			}
		} 
	
	}

	touchRight(player) {
		if (((this.posVec.y + this.radius> player.y) && (this.posVec.y - this.radius < player.y + player.height))
			&& ((this.posVec.x + this.radius > player.x) && (this.posVec.x - this.radius< player.x + player.width))) {
			if (this.posVec.x < player.x ) {
				let diff = this.posVec.y - player.y;
                let theta = map(diff, 0, player.height, 5*PI/4, 3 * PI / 4);
                this.speedVec.set(this.speed * cos(theta), this.speed * sin(theta));
                this.posVec.set(player.x - this.radius, this.posVec.y)
			}
		} 
	
	}

	show() {
		noStroke();
		ellipse(this.posVec.x, this.posVec.y, this.radius * 2, this.radius * 2);
	}
}

class Player {
	constructor(initX = 20, initY = 200) {
		this.x = initX;
		this.y = initY;
		this.speed = 5;
		this.width = 10;
		this.height = 60;
		this.dir = 0;
		this.score = 0;
	}

	move() {
		if (this.y >= 0 && this.y + this.height <= height) {
			this.y += this.dir * this.speed;
		} else if (this.y < 0) {
			this.y = 0;
		} else if (this.y + this.height > height) {
			this.y = height - this.height;
		}
	}

	show() {
		rect(this.x, this.y, this.width, this.height);
	}
}
