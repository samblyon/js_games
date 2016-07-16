const MovingObject = require("./moving_object.js")
const Util = require("./util.js")

function Asteroid (options) {
  MovingObject.call(this, {pos: options["pos"],
                color: "#00FFD0",
                radius: (5 + Math.random() * 15),
                vel: Util.randomVector(0.5 + Math.random()* 1) })
}

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.isCollidedWith = function (otherObject) {
  let distance = Math.sqrt(
      Math.pow(this.pos[0] - otherObject.pos[0], 2) +
      Math.pow(this.pos[1] - otherObject.pos[1], 2)
    )

  if (distance < (this.radius + otherObject.radius)) {
    return true;
  }

  return false;
}


module.exports = Asteroid;
