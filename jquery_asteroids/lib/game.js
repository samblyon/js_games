const Asteroid = require("./asteroid.js")
const Ship = require("./ship.js")

function Game(DIM_X, DIM_Y, NUM_ASTEROIDS) {
  this.DIM_X = DIM_X
  this.DIM_Y = DIM_Y
  this.NUM_ASTEROIDS = NUM_ASTEROIDS
  this.addObjects()
  this.bullets = []
}

Game.prototype.addObjects = function () {
  objects = [new Ship()]

  for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
    objects.push(
      new Asteroid({
        pos: this.randomPosition()
      })
    )
  }

  this.objects = objects
}

Game.prototype.randomPosition = function () {
  const x = Math.random() * this.DIM_X
  const y = Math.random() * this.DIM_Y

  if ((Math.abs((this.DIM_X / 2) - x) === 100) && (Math.abs((this.DIM_Y / 2) - x) === 100)) {
    return this.randomPosition()
  } else {
    return [x, y]
  }
}

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y)
  this.objects.forEach(thing => thing.draw(ctx))
  this.bullets.forEach(thing => thing.draw(ctx))
}

Game.prototype.moveObjects = function () {
  this.objects.forEach(thing => thing.move());
  this.bullets.forEach(thing => thing.move());
}

Game.prototype.checkCollisions = function () {
  let asteroidIndicesToDelete = [];
  let bulletIndicesToDelete = [];
  let ship = this.objects[0];

  for (let i = 1; i < this.objects.length; i++) {
    let asteroid = this.objects[i];

    // check vs ship
    if (asteroid.isCollidedWith(ship)) {
      return true;

    };

    // check bullets
    for (let j = 0; j < this.bullets.length; j++) {
      let bullet = this.bullets[j];
      if (asteroid.isCollidedWith(bullet)) {
        asteroidIndicesToDelete.push(i);
        bulletIndicesToDelete.push(j);
      };
    };
  };

  //delete asteroids
  const new_objects = []
  for (let k = 0; k < this.objects.length; k++) {
    if (!asteroidIndicesToDelete.includes(k)) {
      new_objects.push(this.objects[k])
    };
  };

  this.objects = new_objects;

  //delete bullets
  const new_bullets = []
  for (let l = 0; l < this.bullets.length; l++) {
    if (!bulletIndicesToDelete.includes(l)) {
      new_bullets.push(this.bullets[l])
    };
  };

  this.bullets = new_bullets;

}

module.exports = Game;
