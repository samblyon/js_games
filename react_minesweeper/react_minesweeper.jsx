const React = require('react');
const ReactDOM = require('react-dom');
const Game = require('./game');

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<Game />, document.getElementById('minesweeper'));
});
