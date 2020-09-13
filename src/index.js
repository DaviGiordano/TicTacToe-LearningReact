import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
    return(
        <button className="square" onClick={props.aoClique}>
            {props.value}
        </button>
    );
}

class Board extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };

    }

    renderSquare(i){
        return (
            <Square
                value={this.state.squares[i]}
                aoClique={()=>this.lidarClique(i)}        
            />
        );
    }

    lidarClique(i){
        const squares = this.state.squares.slice();//criou uma cópia dos squares
        if (calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'; //modificou uma entrada
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    render(){
        const winner = calculateWinner(this.state.squares);
        let status;
        if(winner){
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O'); 
        }

        return(
            <div>
                <div className="status">{status}</div>
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

class Game extends React.Component{
    render(){
        return(
            <div className="game">
                <div className="board">
                    <Board/>
                </div>
                <div className="game-info">
                    <div>{/**status */}</div>
                    <ol>{/**to do */}</ol>
                </div>
            </div>
        );
    }
}

// ====================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);
    
//função importada que recebe um array de TIC-TAC-TOE
//e retorna 'X' 'O' ou null, quando apropriado
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
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  // O tutorial continua, implementando como voltar atrás nos estados,
  // e Lifting state up para o Game Component. Posso seguir esse tutorial em algum momento