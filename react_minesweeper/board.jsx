const React = require('react');
const Tile = require('./tile');

const Board = React.createClass({

  render(){
    let board = this.props.board.grid;
    board = board.map((row, rowIdx) => {
      return (
        <div key={rowIdx}>
          {row.map((tile, tileIdx) => {
            return <Tile key={tileIdx}
                         tile={tile}
                         updateGame={this.props.updateGame}/>;
          })}
        </div>
      );
    });
    return (
      <div className="board">
        {board}
      </div>
    );
  }
});

module.exports = Board;
