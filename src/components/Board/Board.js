import React, { Component } from 'react';

import Square from '../Square/Square';

let colors = ['red', 'green', 'blue', 'yellow', 'orange', 'cyan', 'purple', 'lightgrey']
colors.map(color => colors.push(color)) // full array of colors

const shuffleArray = (array) => { // randomly shuffle array function
  array.sort(() => Math.random() - 0.5);
  return array;
};

const shuffledColorsArray = shuffleArray(colors);

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(16).fill(null),
      isDisabled: Array(16).fill(false),
      tilesNumber: 15,
      clickCount: 0,
      clickedSquares: [],
      rounds: 0,
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

    let roundsCounter = this.state.rounds;

    this.setState({ squares: squares, clickCount: clickCount, clickedSquares: clickedSquares });

    //check how many buttons clicked
    if (this.state.clickCount === 1) {
      let firstTiles = this.state.clickedSquares[0].i;
      let secondTiles = this.state.clickedSquares[1].i;

      if (this.state.clickedSquares[0].bg === this.state.clickedSquares[1].bg && firstTiles !== secondTiles) {
        // if matched => dec left Tiles number and set disabled
        tilesNumber -= 2;
        disabledSquares[firstTiles] = true;
        disabledSquares[secondTiles] = true;
        this.setState({ isDisabled: disabledSquares });
      } else {
        // if didn't match => flipped back after 1sec 
        setTimeout(() => {
          squares[firstTiles] = null;
          squares[secondTiles] = null;
          this.setState({ squares: squares });
        }, 500);
      };
      roundsCounter += 1;
      this.setState({ clickCount: 0, clickedSquares: [], tilesNumber: tilesNumber, rounds: roundsCounter });

      // when there is no tiles left
      if (this.state.tilesNumber === 1) {
        setTimeout(() => alert(`You win in ${this.state.rounds} rounds!`), 100);
      };
    };
  };

  renderSquare(i, bg) {
    return (
      <Square
        key={i}
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i, bg)}
        tilesLeft={this.state.tilesNumber}
        disabled={this.state.isDisabled[i]}
      />
    );
  };

  restart() {
    window.location.reload()
  }

  render() {
    const { rounds } = this.state;
    return (
      <>
        {
          shuffledColorsArray.map((color, i) => (this.renderSquare(i, color)))
        }
        <p>rounds: {rounds} </p>
        <button className='restartBtn' onClick={() => this.restart()}>restart</button>
      </>
    );
  };
};

export default Board;
