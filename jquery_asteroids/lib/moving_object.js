function MovingObject (options){
  this.pos = options["pos"];
  this.vel = options["vel"];
  this.radius = options["radius"];
  this.color = options["color"];
}

MovingObject.prototype.draw = function (ctx) {
  ctx.beginPath();
  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.closePath();
}

MovingObject.prototype.move = function () {
  const canvash = 600;
  const canvasw = 600;
  this.pos[0] = (this.pos[0] > 0) ? ((this.vel[0] + this.pos[0]) % (canvasw + this.radius)) : canvasw + this.radius;
  this.pos[1] = (this.pos[1] > 0) ? ((this.vel[1] + this.pos[1]) % (canvash + this.radius)) : canvash + this.radius;
}


module.exports = MovingObject;
