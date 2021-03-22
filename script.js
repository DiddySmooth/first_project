const canvas = document.querySelector('canvas')

const canvasHeight = getComputedStyle(canvas).height
const canvasWidth = getComputedStyle(canvas).width

canvas.setAttribute('height', canvasHeight)
canvas.setAttribute('width', canvasWidth)

const context = canvas.getContext('2d')



class Collider {
  constructor(x, y, width, height, color) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
    this.dead = false
    this.time = 5000
    this.lights = false
    this.lightsCD = false
    this.timeCD = 10000
  }

  render() {
    // x, y, width, height
    context.fillStyle = this.color
    context.fillRect(this.x, this.y, this.width, this.height)
  }

  leftEdge() {
    return this.x
  }

  rightEdge() {
    return this.x + this.width
  }

  topEdge() {
    return this.y
  }

  bottomEdge() {
    return this.y + this.height
  }

  isCollidingWith(other) {
    const horizHit = this.leftEdge() <= other.rightEdge() && this.rightEdge() >= other.leftEdge()
    const vertHit = this.topEdge() <= other.bottomEdge() && this.bottomEdge() >= other.topEdge()

    return horizHit && vertHit
  }
     
}

class Enemy extends Collider {
  constructor(x, y) {
    super(x, y, 50, 80, 'black')
    this.alive = true 
  }
    render() {
    super.render()
  }
}

class Wall extends Collider{
    
}
const player = new Collider(900, 700, 25, 25, 'green')


const walls = [
  new Wall(0, 0, 1000, 15, "black"),
  new Wall(0, 0, 15, 800, "black"),
  new Wall(990, 1, 15, 800, "black"),
  new Wall(0, 785, 1000, 15, "black"),
  new Wall(0, 200, 400, 15, "yellow"),
  new Wall(0, 340, 300, 15, "black"),
  new Wall(0, 600, 800, 15, "black"),
  new Wall(300, 200, 15, 50, "black"),
  new Wall(300, 290, 15, 65, "black"),
  new Wall(300, 400, 15, 200, "black"),
  new Wall(450, 0, 15, 150, "black"),
  new Wall(450, 200, 15, 15, "black"),
  new Wall(840, 600, 200, 15, "black"),
  new Wall(840, 400, 15, 200, "black"),
  new Wall(840, 300, 15, 50, "black"),
  new Wall(840, 300, 200, 15, "black"),
  new Wall(950, 0, 50, 300, "gray"),
  new Wall(700, 0, 300, 50, "gray"),
  new Wall(820, 100, 50, 130, "gray"),
  new Wall(550, 75, 100, 200, "orange"),
  new Wall(400, 400, 250, 50, "gray"),
  new Wall(490, 570, 70, 30, "gray"),
  new Wall(480, 480, 90, 40, "gray"),
  new Wall(15, 440, 180, 120, "red"),
  new Wall(15, 50, 180, 120, "red"),
]



const enemies = [
  new Enemy(700, 700),
  new Enemy(700, 700),
  new Enemy(700, 700)
]

let move = 10

document.addEventListener('keydown', (event) => {
  if (event.key === 'w') {
    player.y -= move
  } else if (event.key === 's') {
    player.y += move
  } else if (event.key === 'a') {
    player.x -= move
  } else if (event.key === 'd') {
    player.x += move
  }  else if (event.key === 'f') {      
    if(player.lightsCD == false){ 
      lightsOn()
      setTimeout(lightsOff, player.time)
      setTimeout(lightsCoolDown, player.timeCD)
    }
  }
})

const lightsOff = () => {    
  player.lights = false
  console.log("Lights off")
}
const lightsOn = () => {
  if(player.lightsCD == false){
    player.lights = true
    player.lightsCD = true
    console.log("Lights On")
  }
}
const lightsCoolDown = () => {
    player.lightsCD = false
}

const checkCollision = (object) => {

  if (player.isCollidingWith(object) && object instanceof Enemy) {
    console.log("Hit");
    player.dead = true
  }
  if (player.isCollidingWith(object) && object instanceof Wall) {
    console.log("Wall")

    if(player.x >= object.x - object.width-5 && player.x <= object.x + object.width+5 && player.y >= object.y - object.height-5 && player.y <= object.y + object.height+ 5)  {
      move = 5 + move*-1
    }   
  }
}

const gameOver = () => {

  context.clearRect(0, 0, canvas.width, canvas.height)
  console.log("Game over")
  clearInterval(intervalId);
}

const shadows = new Collider(0, 0, 1000, 800, 'black')





const intervalId = setInterval(() => {
  move = 10
  context.clearRect(0, 0, canvas.width, canvas.height)
  if(player.lights == false){
    shadows.render()
  } 
  if (player.dead == false)
    player.render()
  else if(player.dead == true)
    gameOver()
  enemies.forEach(e => {
    e.render()
    checkCollision(e)
  walls.forEach(w =>{
    w.render()
    checkCollision(w)
    })
    
    
  })
}, 50);


