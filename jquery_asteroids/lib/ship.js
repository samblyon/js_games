const MovingObject = require("./moving_object.js")
const Util = require("./util.js")
const Bullet = require("./bullet.js")
// const assignKey = require("./keymaster.js")


function Ship () {
  this.radius = 5
  this.color = "#FF0000"
  this.pos = [150,150]
  this.vel = [0,0]
}

Util.inherits(Ship, MovingObject)

Ship.prototype.shoot = function (game) {
  let bullet = new Bullet({
    pos: [this.pos[0], this.pos[1]],
    vel: [this.vel[0], this.vel[1]]
  });

  game.bullets.push(bullet);
  if (game.bullets.length > 6) {
    game.bullets.shift();
  }
}

Ship.prototype.power = function(impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
}

module.exports = Ship;
