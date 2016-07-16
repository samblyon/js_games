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
