const Game = require("./game.js")

function GameView (ctx) {
  this.game = new Game(600, 600, 80);
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
