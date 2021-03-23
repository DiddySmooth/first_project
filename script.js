const canvas = document.querySelector('canvas')

const canvasHeight = getComputedStyle(canvas).height
const canvasWidth = getComputedStyle(canvas).width

canvas.setAttribute('height', canvasHeight)
canvas.setAttribute('width', canvasWidth)

const context = canvas.getContext('2d')

let move = 10
let intervalId
let enemySpeed = 10
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
    this.hasObject = false
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
  constructor(x, y, top, left, right, bottom, type) {
    super(x, y, 45, 45, 'white')
    this.alive = true 
    this.pathTop = top
    this.pathLeft = left
    this.pathRight = right
    this.pathBottom = bottom
    this.step = 0
    this.type = type
  }
    render() {
      this.image1 = document.getElementById('ghost')
      context.drawImage(this.image1, this.x,this.y)
  }
}


class Furniture extends Collider{
  constructor(x, y, img) {
    super(x,y)
    this.y = y
    this.x = x
    this.image = img
    
  }
  render(){
    context.drawImage(this.image, this.x,this.y)
  }
}



class Secret extends Collider{
    
}
class End extends Collider{
    
}
class Wall extends Collider{
    
}
class Player extends Collider{
  render(){
    this.image1 = document.getElementById('player')
    context.drawImage(this.image1, this.x,this.y)
  }
}





const player = new Player(875, 700, 25, 25, 'green')
const end = new End(900, 700, 70, 70, 'white')
const darkness = new Collider(0, 0, 1000, 800, 'black')

imgCouch = document.getElementById('couch')
imgBed = document.getElementById('bed')

const walls = [
  new Wall(0, 0, 1000, 15, "black"), //border
  new Wall(0, 0, 15, 800, "black"), //border
  new Wall(990, 1, 15, 800, "black"),   //border
  new Wall(0, 785, 1000, 15, "black"),    //border
  new Wall(0, 200, 400, 15, "black"),  //lower wall top bedrooom
  new Wall(0, 340, 300, 15, "black"), //lower wall bathroom
  new Wall(0, 600, 800, 15, "black"), // lower house wall
  new Wall(300, 200, 15, 50, "black"), //top door wall bathroom
  new Wall(300, 290, 15, 65, "black"), // lower door wall bathroom
  new Wall(300, 400, 15, 200, "black"), // bedroom wall
  new Wall(450, 0, 15, 150, "black"), // upper bedroom right wall
  new Wall(450, 200, 15, 15, "black"), // corner peice 
  new Wall(840, 600, 200, 15, "black"), // lower office wall
  new Wall(840, 400, 15, 200, "black"), // left office wall
  new Wall(840, 300, 15, 50, "black"), //left office wall corner
  new Wall(840, 300, 200, 15, "black"), //office upper wall
  new Wall(950, 0, 50, 300, "gray"), // right counter
  new Wall(700, 0, 300, 50, "gray"), // top counter
  new Wall(820, 107, 50, 130, "gray"), // island
  new Wall(550, 75, 100, 200, "orange"), // table
  new Furniture(400, 400, imgCouch), // couch
  new Wall(490, 570, 70, 30, "gray"), // tv stand
  new Wall(480, 480, 90, 40, "gray"), // coffee table
  new Furniture(15, 440,imgBed), //bed lower
  new Furniture(15, 60, imgBed),  //bed upper
  //new Wall(15, 400, 200, 180, "blue"),
  
]

// x y top left right bottom



const enemies = [
  new Enemy(750, 60, 60, 750, 890, 240, "rect"),
  new Enemy(350, 350, 350, 350, 750, 550, "rect"),
  new Enemy(15, 400, 400, 15, 215, 580, "rect")
]




const secret = [
  new Secret(900, 500, 25, 25, 'blue'),
]


const enemyMove = (enemy) => {   
  if(enemy.type == "rect")
    if(enemy.step == 0)
      enemy.y += enemySpeed
      if(enemy.y == enemy.pathBottom)
        enemy.step = 1
    if(enemy.step == 1)
      enemy.x += enemySpeed
      if(enemy.x == enemy.pathRight) 
        enemy.step = 2
    if(enemy.step == 2)
      enemy.y -= enemySpeed
      if(enemy.y == enemy.pathTop)
        enemy.step = 3
    if(enemy.step ==3)
      enemy.x -= enemySpeed
      if(enemy.x == enemy.pathLeft)         
        enemy.step = 0
}


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
  if (player.isCollidingWith(object) && object instanceof Secret){
    player.hasObject = true
  }
  if (player.isCollidingWith(object) && object instanceof End && player.hasObject === true){
    gameOver()
  } 
}

const gameOver = () => {

  context.clearRect(0, 0, canvas.width, canvas.height)
  console.log("Game over")
  clearInterval(intervalId)
  document.getElementById("game").classList.add('hidden')
  if(player.dead == true)
  {
    console.log("You lose the ghost got you")
    document.getElementById("lose").classList.remove('hidden')
  }
  else{
    document.getElementById("win").classList.remove('hidden')
  }

}


const startGame = () => {
  document.getElementById("game").classList.remove('hidden')
  intervalId = setInterval(() => {
  
    move = 10
    context.clearRect(0, 0, canvas.width, canvas.height)
    
    
    enemies.forEach(e => {
      e.render()
      checkCollision(e)
      enemyMove(e)
    walls.forEach(w =>{
      w.render()
      checkCollision(w)
      })
    }) 
    if (player.hasObject == false)
    {  
      secret[0].render() 
      checkCollision(secret[0]) 
    } 
    end.render()
    if (player.hasObject == true)
    {
      checkCollision(end)
    }
    if(player.lights == false){
      context.globalAlpha = .95
      darkness.render()
      context.globalAlpha = 1
    }
    if (player.dead == false)
      player.render()
    else if(player.dead == true)
      gameOver()
  }, 50);
}


document.getElementById("start").addEventListener("click", function() {
  startGame()
  player.dead = false
  player.hasObject = false
  document.getElementById("win").classList.add('hidden')
  document.getElementById("lose").classList.add('hidden')
})




