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
