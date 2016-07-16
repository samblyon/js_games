const React = require('react');
const Minesweeper = require('./minesweeper_logic');
const Board = require('./board');

const Game = React.createClass({
  getInitialState(){
    return {
      board: new Minesweeper.Board(10, 10),
      gameOver: false,
      message: "YOU WIN MINESWEEPER"
    };
  },
  updateGame(tile, flag){
    if (flag) {
      tile.toggleFlag();
    } else {
      tile.explore();
    }
    this.setState({ board: this.state.board });

    if (this.state.board.won()) {
      this.setState({
        gameOver: true
      });
    } else if (this.state.board.lost()) {
      this.setState({
        gameOver: true,
        message: "YOU LOSE MINESWEEPER"
      });
    }
  },
  restartGame(){
    this.setState({
      board: new Minesweeper.Board(10, 10),
      gameOver: false,
      message: "YOU WIN MINESWEEPER.. YAY."
    });
  },
  render (){
    let modal = "modal";
    if (this.state.gameOver) {
      modal += " is-active";
    }
    return(
      <div>
        <h1>Welcome to Minesweeper! Come play. It is free forever.</h1>
        <p>Click to reveal, alt-click to mark.</p>
        <Board board={this.state.board} updateGame={this.updateGame}/>
        <div className={modal}>
          <div className="modal-content">{this.state.message}
            <button onClick={this.restartGame}>Play again!</button>
          </div>
          <div className="modal-screen"></div>
        </div>
      </div>
    );
  }
});

module.exports = Game;
