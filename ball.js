class Ball {
    constructor(ballx, bally, balldx, balldy) {
      //things necressary for the cannonball, like coordinates, speed of the ball, hit, width, and height for collision
      this.x = ballx
      this.y = bally
      this.dx = balldx
      this.dy = balldy
      this.hit = false
      this.width = 20
      this.height = 20
    }
    step() {
      //the speed of the ball 
      this.x += this.dx
      this.y -= this.dy
      //some sort of gravity implemented
      this.dy -= 0.6 
    }
    checkCollide(check){ 
        //details of checking the collision of the cannonballs with the level balls
        return  check.x + check.width/2 > this.x // inner Left Boundary
            &&  check.x - check.width/2 < this.x + this.width // inner Right Boundary
            &&  check.y > this.y  // inner Top Boundary
            &&  check.y - check.height  < this.y + this.height // inner Bottom Boundary
    }
    draw() {
      //details of the cannonball design
      ctx.fillStyle = 'white'
      ctx.beginPath()
      ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI)
      ctx.fill()
    }
  }