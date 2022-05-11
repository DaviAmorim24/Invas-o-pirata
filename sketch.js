const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var bolas = []
var broken_boat_animation =[] 
var broken_boat_data, broken_boat_sheet;
var boat_animation = []
var boat_data, boat_sheet;

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  broken_boat_data = loadJSON("assets/boat.json")
  broken_boat_sheet = loadImage ("assets/broken_boat.png")
  boat_data = loadJSON ("assets/boat.json")
  boat_sheet = loadImage ("assets/boat 2.png")
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode (DEGREES)
  angle = 20

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);
  var broken_boat_frames = broken_boat_data.frames

  for (var i=0; i < broken_boat_frames.length; i++){
    var pos = broken_boat_frames [i].position
    var img = broken_boat_sheet.get (pos.x, pos.y, pos.w, pos.h)
    broken_boat_animation.push (img)
  }

  var boat_frames = boat_data.frames 

  for (var i= 0; i< boat_frames.length; i++){
    var pos = boat_frames [i].position
    var img = boat_sheet.get (pos.x, pos.y, pos.w, pos.h)
    boat_animation.push (img)
  }
  
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);
  
  rect(ground.position.x, ground.position.y, width * 2, 1);
  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 160, 310);
  pop();

  cannon.display();
  mostrar_barcos ()

  for (var i = 0; i < bolas.length; i++) {
    showCannonBalls (bolas [i])
    colisao_with_boat (i)
  }
}

function keyPressed (){
  if (keyCode == 32) {
    var cannonBall = new CannonBall (cannon.x, cannon.y)
    Matter.Body.setAngle (cannonBall.body, cannon.angle)
    bolas.push (cannonBall)
  }
}


function showCannonBalls (bola){
  if (bola) {
    bola.display ()
  }
}

function keyReleased (){
  if (keyCode == 32) {
    bolas [bolas.length - 1].atirar ()
}
}
var grupo_barcos = []
function mostrar_barcos () {
  if (grupo_barcos.length > 0){
  if (grupo_barcos [grupo_barcos.length -1] == undefined || 
      grupo_barcos [grupo_barcos.length -1].barco.position.x < width - 300) {
        var positions = [-40, -60, -70, -20]
        var position = random (positions)
        var barco = new Barcos (width, height-100, 120, 90, position, boat_animation)
        grupo_barcos.push (barco)
      }
      
      for ( var i = 0; i<grupo_barcos.length; i++) {
        if (grupo_barcos [i]) {
          grupo_barcos [i].display ()
          Matter.Body.setVelocity (grupo_barcos[i].barco, {
            x:-0.9,
            y:0
          })
       
        }
      }
  }

  else {
    var barco = new Barcos (width, height -100  , 120, 90, -60, boat_animation)
    grupo_barcos.push(barco)
  }
}

  function colisao_with_boat (index) {
    for (var i = 0; i <grupo_barcos.length; i++){
      if (bolas[index]!== undefined && grupo_barcos[i]!== undefined){
        var colision = Matter.SAT.collides (bolas[index].body, grupo_barcos [i].barco)
        if (colision.collided){
          grupo_barcos [i].remove (i) 
          Matter.World.remove (world, bolas [index].body)
          delete bolas[index] 
        }
      }
    }
  }
