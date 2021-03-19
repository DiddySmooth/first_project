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
const player = new Collider(100, 200, 50, 50, 'green')


const walls = [
    new Wall(0, 50, 1000, 15, "black"),
    new Wall(1, 0, 15, 800, "black"),
    new Wall(990, 1, 15, 800, "black"),
    new Wall(1, 750, 1000, 15, "black"),

]


const enemies = [
  new Enemy(175, 250),
  new Enemy(250, 300),
  new Enemy(500, 125)
]

let PLAYER_SPEED = 10

document.addEventListener('keydown', (event) => {
     if (event.key === 'w') {
        player.y -= PLAYER_SPEED
     } else if (event.key === 's') {
        player.y += PLAYER_SPEED
     } else if (event.key === 'a') {
        player.x -= PLAYER_SPEED
     } else if (event.key === 'd') {
        player.x += PLAYER_SPEED
     }  else if (event.key === 'f') {
        
        if(player.lightsCD == false){ 
            lightsOn()
        }
        setTimeout(lightsOff, player.time)
        setTimeout(lightsCoolDown, player.timeCD)
        
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
        console.log(object.bottomEdge())
        console.log(object.topEdge())
        console.log(player.bottomEdge())
        console.log(player.topEdge())

        if(player.topEdge() < object.bottomEdge() && !(player.bottomEdge() > object.topEdge())) {
            console.log("top player: bottom wall")
            player.y = object.bottomEdge() + 1
        }
        else if(player.bottomEdge() > object.topEdge() && !(player.topEdge() < object.bottomEdge())){
            console.log("Bottom player : top wall")
            player.y = object.topEdge() - 1 - player.height
        }
    //   player.y = object.y - 1
    //   player.x = object.x - 1
  }
}
const gameOver = () => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    console.log("Game over")
    clearInterval(intervalId);
}

const shadows = new Collider(0, 0, 1000, 800, 'black')





const intervalId = setInterval(() => {
//   checkWin()
     

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
    } )
    
  })
}, 50);




