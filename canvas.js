//canvas.js file

//setup canvas
let canvas = document.getElementById('display')
canvas.width = document.body.clientWidth
canvas.height = document.body.clientHeight
let ctx = canvas.getContext('2d')

// loading images so we can draw them later
function loadSprite(filename) {
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image
  let image = new Image()
  let loaded = new Promise(readyToReturn => {
    image.onload = readyToReturn
  })
  image.src = filename
  return {
    image: image,
    loaded: loaded,
  }
}
let cannonSprite = loadSprite('images/cannon.png')

//draw helpers
function erase() {
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

let maxY = 12
let gridSize = Math.ceil(canvas.height / maxY)
