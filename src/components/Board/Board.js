import React, { Component } from 'react';

import Square from '../Square/Square';

let colors = ['red', 'green', 'blue', 'yellow', 'orange', 'cyan', 'purple', 'lightgrey']
colors.map(color => colors.push(color))

const shuffleArray = (array) => {
  array.sort(() => Math.random() - 0.5);
  return array;
};

let shuffledColors = shuffleArray(colors);

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(16).fill(null),
      isDisabled: Array(16).fill(false),
      tilesNumber: 15,
      clickCount: 0,
      clickedSquares: [],
    };
  };

  handleClick(i, bg) {
    const squares = this.state.squares.slice(); // change bg color on clicked buttons
    squares[i] = bg;

    const disabledSquares = this.state.isDisabled.slice();

    let clickCount = this.state.clickCount; // counter for clicked tiles
    clickCount += 1;

    let clickedSquares = this.state.clickedSquares; // array for clicked tiles
    clickedSquares.push({ i, bg });

    let tilesNumber = this.state.tilesNumber;

    this.setState({ squares: squares, clickCount: clickCount, clickedSquares: clickedSquares });

    if (this.state.clickCount === 1) {
      let a = this.state.clickedSquares[0].i;
      let b = this.state.clickedSquares[1].i;

      if (this.state.clickedSquares[0].bg === this.state.clickedSquares[1].bg) {
        tilesNumber -= 2;
        disabledSquares[a] = true
        disabledSquares[b] = true
        this.setState({ isDisabled: disabledSquares })
      } else {
        setTimeout(() => {
          squares[a] = null;
          squares[b] = null;
        }, 10);
      }
      this.setState({ squares: squares, clickCount: 0, clickedSquares: [], tilesNumber: tilesNumber })

      if (this.state.tilesNumber === 1) {
        setTimeout(() => alert('You win'), 100)
      }
    };
  };

  renderSquare(i, bg) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i, bg)}
        tilesLeft={this.state.tilesNumber}
        disabled={this.state.isDisabled[i]}
      />
    );
  };

  render() {
    return (
      shuffledColors.map((color, i) => (this.renderSquare(i, color)))
    );
  };
};

export default Board;
