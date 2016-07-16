/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(1)
	const Game = __webpack_require__(2)
	const GameView = __webpack_require__(7)
	const Asteroid = __webpack_require__(3)
	const MovingObject = __webpack_require__(4)
	const dummyGame = Game

	document.addEventListener("DOMContentLoaded", function(event) {
	  let canvas = document.getElementById("game-canvas")
	  let ctx = canvas.getContext('2d')
	  let game = new GameView(ctx)
	  game.start()
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	const Util = {}

	Util.inherits = function (Child, Parent) {
	  function Surrogate () {};
	  Surrogate.prototype = Parent.prototype;
	  Child.prototype = new Surrogate();
	  Child.prototype.constructor = Child;
	}

	Util.randomVector = function (defaultSpeed) {
	  let x = Math.random()*defaultSpeed
	  let y = Math.sqrt(Math.pow(defaultSpeed, 2) - Math.pow(x, 2))
	  x = Math.random() > .5 ? x : -x
	  y = Math.random() > .5 ? y : -y
	  return [x,y]
	}


	module.exports = Util;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(3)
	const Ship = __webpack_require__(5)

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(4)
	const Util = __webpack_require__(1)

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


/***/ },
/* 4 */
/***/ function(module, exports) {

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
	  const canvash = 900;
	  const canvasw = 900;
	  this.pos[0] = (this.pos[0] > 0) ? ((this.vel[0] + this.pos[0]) % (canvasw + this.radius)) : canvasw + this.radius;
	  this.pos[1] = (this.pos[1] > 0) ? ((this.vel[1] + this.pos[1]) % (canvash + this.radius)) : canvash + this.radius;
	}


	module.exports = MovingObject;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(4)
	const Util = __webpack_require__(1)
	const Bullet = __webpack_require__(6)
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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(1);
	const MovingObject = __webpack_require__(4);

	function Bullet (options) {
		this.radius = 2;
		this.color = "#8000FF";
		this.pos = options["pos"];
		this.vel = options["vel"].map(coord => coord * 2);
	}

	Util.inherits(Bullet, MovingObject);

	module.exports = Bullet;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(2)

	function GameView (ctx) {
	  this.game = new Game(900, 900, 80);
	  this.ctx = ctx;
	  let game = this.game;
	  const ship = this.game.objects[0];

	  key("up", function() {ship.power([0, -1])} )
	  key("left", function() {ship.power([-1, 0])} )
	  key("down", function() {ship.power([0, 1])} )
	  key("right", function() {ship.power([1, 0])} )
	  key("space", function() {ship.shoot(game)} )
	}

	GameView.prototype.start = function () {
	  that = this;
	  let id = setInterval( function () {
	    const gameOver = that.game.checkCollisions();

	    if (gameOver) {
	      clearInterval(id);
	      GameView.askPlayAgain(that.ctx);
	    } else {
	      that.game.moveObjects();
	      that.game.draw(that.ctx);
	    }
	  },
	  20);
	}

	GameView.askPlayAgain = function (ctx) {
	  let restart = confirm("You EXPLODE 😨💥. Play again?");
	  if (restart === true) {
	    const game = new GameView(ctx)
	    game.start();
	  } else {
	    alert("OK.");
	    window.location = "http://imgs.xkcd.com/comics/oxidation.png";
	  }
	}

	module.exports = GameView;


/***/ }
/******/ ]);