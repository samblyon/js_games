const Util = require("./util.js")
const Game = require("./game.js")
const GameView = require("./game_view.js")
const Asteroid = require("./asteroid.js")
const MovingObject = require("./moving_object.js")
const dummyGame = Game

document.addEventListener("DOMContentLoaded", function(event) {
  let canvas = document.getElementById("game-canvas")
  let ctx = canvas.getContext('2d')
  let game = new GameView(ctx)
  game.start()
});
