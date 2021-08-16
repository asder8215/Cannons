class Level {
    constructor(x, y) {
        //things necessary for the level ball design, like coordinates, width + height for collision, and whether it gives score or ammo
        this.x = x 
        this.y = y
        this.width = 35
        this.height = 30
        //gives no ammo. but 100 points
        this.scoreIncrement = 100
        this.ammoIncrement = 0
    }
    draw() {
        //drawing the white/lightblue ball w/ stroke 
        ctx.fillStyle = 'lightblue'
        ctx.beginPath()
        ctx.arc(this.x, this.y, 20, 0, Math.PI * 2)
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#dfdfe6'
        ctx.stroke()
        ctx.fill()
      }
}
class specialBalls extends Level {
    constructor(x, y){
        super(x, y)
        //gives 3 ammos, but no points
        this.scoreIncrement = 0
        this.ammoIncrement = 3
    }
    draw() {    
        //drawing the yellow ball w/ stroke
        ctx.fillStyle = 'yellow'
        ctx.beginPath()
        ctx.arc(this.x, this.y, 20, 0, Math.PI * 2)
        ctx.stroke()
        ctx.fill()
  }
}

class extraPoints extends Level {
    constructor(x, y){
        super(x, y)
        //gives no ammo, but gives 300 points
        this.scoreIncrement = 300
        this.ammoIncrement = 0
    }
    draw() {
        //drawing the purple ball w/ stroke 
        ctx.fillStyle = 'purple'
        ctx.beginPath()
        ctx.arc(this.x, this.y, 20, 0, Math.PI * 2)
        ctx.stroke()
        ctx.fill()
  }
}