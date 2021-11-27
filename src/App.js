/* eslint-disable no-unused-vars */
import React from 'react';
import Board from './Board';
import calculateWinner from './Winner';

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        }
      ],
      xNext: true,
    };
  }

  handleClick(i){
    const history = this.state.history;
    const current = history[history.length - 1]
    const squares = current.squares.slice();
    if(calculateWinner(squares) || squares[i]){
        return;
    }
    squares[i] = this.state.isNext ? 'X' : 'O';
    this.setState({
        history: history.concat([{
            squares:squares,
        }]),
        isNext: !this.state.isNext,       
      });
    
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    let status;
    if(winner){
        status = 'Winner: ' + winner;
    }else{
      status = 'Next player: ' + (this.state.isNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board 
          squares={current.squares}
          onClick = {(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;