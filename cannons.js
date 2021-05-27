class Cannon {
    constructor() {
      // image data of the cannon
      this.sprite = cannonSprite.image
      // width and height describe the size of the cannon
      this.width = 100
      this.height = 100
      //x and y describe the position of the cannon
      this.x = canvas.width / 2 - this.width/2
      this.y = canvas.height - this.height
      // dx,dy describe the speed the cannon is traveling
      this.dx = 0
      this.dy = 0
      //angle, which is iin radians and used for the cannon's rotation thing
      this.angle = 0.5 * Math.PI
      //itntensity of the ball being shot out of the cannon
      this.power = 30
      //the hole portion of the cannon; keeps the cannonball shot out of the hole
      this.hole = [this.x + this.width * 0.5 , this.y + this.height * 0.63]
      //cannon is initially rotating clockwise
      this.rotation = "counterclockwise"
    }
    pendulum(){
        //cannon rotates back and forth when reaching 0 & π
        if (this.rotation == "counterclockwise"){
            this.angle -= 0.009 * Math.PI;
            if(this.angle < 0 * Math.PI){
                this.rotation = "clockwise";
            }
        } 
        if (this.rotation == "clockwise"){
            this.angle += 0.009 * Math.PI;
            if(this.angle > Math.PI){
                this.rotation = "counterclockwise";
            }
        }
    }

    shoot(){
        //shooting the cannonball out of the cannon with this much power and at this angle
        let balldx = -Math.cos(this.angle) * this.power
        let balldy = Math.sin(this.angle) * this.power
        let ball = new Ball(
            this.hole[0], this.hole[1], balldx, balldy
        )
        balls.push(ball)

    }
    draw(){
        // this saves the context before we translate and rotate the canvas
        ctx.save() 
        //canvas is translated to account for the rotation of the cannon
        ctx.translate(this.x + this.width * 0.5 , this.y + this.height * 0.63)
        //canvas rotates the cannon  
        ctx.rotate(this.angle - Math.PI/2)
        //canvas counteracts the earlier translation (somewhat) to keep the position of the cannon itself rather than move the position of the sprite somewhere else when rotating
        ctx.translate(this.width * -0.5,this.height * -0.63)
        //canvas draws the image of the cannon sprite with this width and height
        ctx.drawImage(this.sprite, 0, 0, this.width, this.height)
        ctx.restore()
    }
}