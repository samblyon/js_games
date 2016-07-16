const React = require('react');

const Tile = React.createClass({

  handleClick(e){
    this.props.updateGame(this.props.tile, e.altKey);
  },
  render(){
    let appearance = "tile";
    let content;
    let tile = this.props.tile;
    if (tile.explored) {
      if (tile.bombed) {
        content = "💥";
        appearance += " bombed";
      } else {
        let bombs = tile.adjacentBombCount();
        content = (bombs === 0) ? "🏳" : bombs;
        appearance += " revealed";
      }
    } else {
      if (tile.flagged) {
        content =  "☠";
        appearance += " flagged";
      } else {
        content =  " ";
      }
    }

    return (
      <div className={appearance} onClick={this.handleClick}>
        {content}
      </div>
    );
  }
});

module.exports = Tile;
