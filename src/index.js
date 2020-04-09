import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';   

  /*
  class Square extends React.Component { // calss 정의
    constructor(props) {
      super(props) // 모든 리액트 컴포넌트 클래스는 생성자를 가질때 super(props) 호출 구문부터 작성해야 함.
      this.state = {
        value: null
      };
    }
    
    render() {
      return (
        <button 
          className="square" 
          onClick={() => { this.props.onClick() }} // 이벤트를 나타내는 prop에는 on[Event]
        >
          {this.props.value}
        </button>
      );
    }
  }
  */

 function Square(props) { // 함수 컴포넌트 정의
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}
  class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square 
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)} // 리액트에선 이벤트를 처리하는 함수에 handle[Event]를 사용하는 것이 일반적
        />
      );
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        history: [
          {
            squares: Array(9).fill(null)
          }
        ],
        stepNumber: 0,
        xIsNext: true
      }
    }

    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1)
      const current = history[history.length - 1]
      const squares = current.squares.slice()

      if (calculateWinner(squares) || squares[i]) {
        return;
      }

      squares[i] = this.state.xIsNext ? 'X' : 'O'

      this.setState({
        history: history.concat([{
          squares: squares
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext
      })
    }

    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0
      })
    }

    render() {
      const history = this.state.history
      const current = history[this.state.stepNumber]
      const winner = calculateWinner(current.squares)

      const moves = history.map((step, move) => {
        const desc = move 
          ? `Go to move #${move}` 
          : `Go to game start`
        
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        )
      })

      let status
      if (winner) {
        status = `Winner: ${winner}`
      } else {
        status = `Next Player ${this.state.xIsNext ? 'X' : 'O'}`
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={i => this.handleClick(i)}
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
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  // ========================================

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }
  
  // ========================================
  
  // https://ko.reactjs.org/tutorial/tutorial.html#setup-option-2-local-development-environment