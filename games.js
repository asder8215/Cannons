//cannon represents the things inside class Cannon
let cannon = new Cannon()
let keyPressed = {}
//level design of white, yellow, and purple balls
let levelDesign = [
    new Level(200, 200), 
    new Level(200, 100),
    new specialBalls(90, 150),
    new Level(300, 300),
    new Level(400, 400),
    new extraPoints(300, 180),
    new specialBalls(490, 270),
    new Level(600, 50),
    new Level(640, 85),
    new extraPoints(480, 540),
    new Level(1000, 540),
    new specialBalls(690, 450),
    new extraPoints(1200, 470),
    new Level(890, 250),
    new Level(860, 600),
    new Level(1200, 100),
    new specialBalls(900, 372),
    new Level(1080, 200),
    new extraPoints(990, 280)
]
let balls = []
//variable used for delayed shots or permanently frozen shots
let waitShot = true
//variable used for win or lose scenarios
let win = false
// let keyButton = document.getElementById('keyButton')
// let key = keyButton.textContent

// function keyChange(){
//     keyButton.innerHTML = keyButton.value
// }

window.addEventListener('keydown', event => {
    keyPressed[event.code] = true
  })
window.addEventListener('keyup', event => {
    keyPressed[event.code] = false
  })

//game loop
function loop() {
    //if the win is true, then cannonball no longer needs to shoot
    if(win){
        waitShot = false
    }
    //checks if user inputted space to fire a cannonball
    if (keyPressed['Space'] == true) {
        //ammo variable used to decrease the number of ammo leftover when shooting
        ammo = document.getElementById("ammo")
        ammoCount = parseInt(ammo.textContent)
        if(ammoCount > 0 && waitShot){
            cannon.shoot()
            ammo.textContent = ammoCount - 1
            waitShot = false
        }
    }

    

  
    balls.forEach(ball => ball.step());
  
    //check collisions + increases ammo & score counts when cannonball interacts with level ball
    let i = 0
    levelDesign.forEach(level => {
       balls.forEach(ball => {
            if(ball.checkCollide(level)){
                //increases score when cannonball hits white or purple ball
                score = document.getElementById("counter")
                counter = parseInt(score.textContent) + level.scoreIncrement
                score.textContent = counter
                //increases ammo when cannonball hits yellow ball
                ammo = document.getElementById("ammo")
                ammoCount = parseInt(ammo.textContent) + level.ammoIncrement
                ammo.textContent = ammoCount
                //deletes the white/yellow/purple balls from existence
                levelDesign.splice(i, 1)
                //Tells if the cannonball touches the white/yellow/purple balls
                console.log("hit", level);
            }
        });
        i++
        if(i >= levelDesign.length){
            i = 0;
        }
    });
  
    //draw level ball, cannonball, cannon sprite, and put cannon in pendulum motion
    erase();
    levelDesign.forEach(level => level.draw())
    balls.forEach(ball => ball.draw());
    cannon.draw();
    cannon.pendulum();
  
    //loop the game 
    setTimeout(loop, 1000 / 60)
}

function delayShot(){
    //if statement to cause a cooldown in shooting 
    if(!waitShot){
        waitShot = true;
    }
    setTimeout(delayShot, 1000)
}

function winOrLose(){
    //determines if the game is a win or loss
    score = document.getElementById("counter")
    ammo = document.getElementById("ammo")
    ammoCount = parseInt(ammo.textContent)
    console.log(levelDesign.length)
    //gives the win condition and win message
    if(ammoCount >= 0 && levelDesign.length == 0){
            console.log("You win!");
            //gives bonus points depending on leftover ammo
            counter = parseInt(score.textContent) + 300 * ammoCount
            score.textContent = counter
            let gameMessage = document.getElementById("gameMessage")
            gameMessage.innerHTML = "You win! You get " + 300 * ammoCount + " bonus points!"
            gameMessage.style.color = "lightgreen"
            gameMessage.style.fontSize = "35px"
            win = true
            return
    } 
    //gives the lose condition and lose message
    else if (ammoCount == 0) {
            console.log("You lose!")
            let gameMessage = document.getElementById("gameMessage")
            gameMessage.innerHTML = "You lose!"
            gameMessage.style.color = "red"
            gameMessage.style.fontSize = "35px"
            return
    }
    setTimeout(winOrLose, 2000)
}

// wait for images to load first before starting game
async function loadGame() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
    await cannonSprite.loaded
    loop()
    delayShot()
    winOrLose()
}
loadGame()