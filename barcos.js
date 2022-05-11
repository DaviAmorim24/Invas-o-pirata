class Barcos {

constructor (posicaoX, posicaoY, largura, altura, barco_pos, boat_animation){
    this.animation = boat_animation
    this.speed = 0.05
    this.posicaoX = posicaoX
    this.posicaoY = posicaoY
    this.largura = largura
    this.altura = altura
    this.barco_pos = barco_pos

    this.barco = Bodies.rectangle (posicaoX, posicaoY, largura, altura)
    World.add (world, this.barco) 
    this.imagem = loadImage ("assets/boat.png")
}
animate(){
    this.speed += 0.05
}
remove (i) {
    this.animation = broken_boat_animation
    this.altura = 300
    this.largura= 300
    this.speed = 0.05
    setTimeout (()=>{
        Matter.World.remove (world, grupo_barcos [i].barco)  
        delete grupo_barcos [i] 
    } ,2000)
}

display () {

    var angle = this.barco.angle
    var pos = this.barco.position
    var index = floor (this.speed%this.animation.length)
    push()
    translate (pos.x, pos.y)
    rotate (angle)
    imageMode (CENTER)
    image (this.animation [index], 0, this.barco_pos, this.largura, this.altura)
    pop()
}
}