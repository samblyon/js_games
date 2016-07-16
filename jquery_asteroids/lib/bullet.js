const Util = require("./util.js");
const MovingObject = require("./moving_object.js");

function Bullet (options) {
	this.radius = 2;
	this.color = "#8000FF";
	this.pos = options["pos"];
	this.vel = options["vel"].map(coord => coord * 2);
}

Util.inherits(Bullet, MovingObject);

module.exports = Bullet;
