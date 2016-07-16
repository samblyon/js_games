/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	$( () => {
	  const HanoiGame = __webpack_require__(1)
	  const HanoiView = __webpack_require__(2)
	  const rootEl = $('.hanoi');
	  const game = new HanoiGame();
	  new HanoiView(game, rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	function Game () {
	  this.towers = [[3, 2, 1], [], []];
	};
	
	Game.prototype.isValidMove = function(startTowerIdx, endTowerIdx) {
	    const startTower = this.towers[startTowerIdx];
	    const endTower = this.towers[endTowerIdx];
	
	    if (startTower.length === 0) {
	      return false;
	    } else if (endTower.length == 0) {
	      return true;
	    } else {
	      const topStartDisc = startTower[startTower.length - 1];
	      const topEndDisc = endTower[endTower.length - 1];
	      return topStartDisc < topEndDisc;
	    }
	};
	
	Game.prototype.isWon = function(){
	    // move all the discs to the last or second tower
	    return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	};
	
	
	Game.prototype.move = function(startTowerIdx, endTowerIdx) {
	    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	      this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	      return true;
	    } else {
	      return false;
	    }
	};
	
	
	Game.prototype.print = function(){
	    console.log(JSON.stringify(this.towers));
	};
	
	
	Game.prototype.promptMove = function(reader, callback) {
	    this.print();
	    reader.question("Enter a starting tower: ", start => {
	      const startTowerIdx = parseInt(start);
	      reader.question("Enter an ending tower: ", end => {
	        const endTowerIdx = parseInt(end);
	        callback(startTowerIdx, endTowerIdx)
	      });
	    });
	};
	
	Game.prototype.run = function(reader, gameCompletionCallback) {
	    this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	      if (!this.move(startTowerIdx, endTowerIdx)) {
	        console.log("Invalid move!");
	      }
	
	      if (!this.isWon()) {
	        // Continue to play!
	        this.run(reader, gameCompletionCallback);
	      } else {
	        this.print();
	        console.log("You win!");
	        gameCompletionCallback();
	      }
	    });
	};
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	function HanoiView (game, domElement) {
	  this.game = game;
	  this.domElement = domElement;
	  this.setupTowers();
	  console.log()
	  this.render();
	  $("ul").on("click", event => {
	    this.clickTower(event.currentTarget);
	  });
	  this.from = -1;
	}
	
	HanoiView.prototype.setupTowers = function() {
	  const $ul1 = $("<ul></ul>");
	  $ul1.attr("data-id", 0);
	  const $ul2 = $("<ul></ul>");
	  $ul2.attr("data-id", 1);
	  const $ul3 = $("<ul></ul>");
	  $ul3.attr("data-id", 2);
	
	  for (let i = 0; i < 3; i++) {
	    let $li = $("<li></li>");
	    // $li.addClass("disc");
	    $li.addClass(`${i}`);
	    $ul1.append($li);
	  }
	
	  this.domElement.append($ul1);
	  this.domElement.append($ul2);
	  this.domElement.append($ul3);
	}
	
	HanoiView.prototype.render = function () {
	  const towers = this.game.towers;
	  towers.forEach( (tower, index) => {
	    $($('ul')[index]).empty();
	    tower.forEach( (discId, index2) => {
	      const disc = $("<li></li>");
	      disc.addClass(`_${discId}`);
	      $($('ul')[index]).append(disc);
	    });
	  });
	}
	
	HanoiView.prototype.clickTower = function(tower) {
	  if (this.from < 0) {
	    console.log("hi");
	    this.from = $(tower).data("id");
	  } else {
	    if (!this.game.move(this.from, $(tower).data("id"))) {
	      alert("Invalid Move!");
	    }
	    this.from = -1;
	  }
	  this.render();
	
	  if (this.game.isWon()) {
	    alert("You Win!");
	    $('li').toggleClass("won");
	  }
	}
	
	module.exports = HanoiView;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map