import * as React from 'react';

function Board() {
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  console.log(squares);
  console.log(setSquares);

  function selectSquare(square) {
    if (squares[square] || calculateWinner(square)) {
      return
    };
    const nextSquare = squares.slice();
    nextSquare[square] = calculateNextValue(squares);
    setSquares(nextSquare)
    console.log(nextSquare);
  }

  function restart() {
    setSquares(Array(9).fill(null));
  }

  function renderSquare(i) {
    return (
      <button className="btn btn-outline w-24 h-24" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );
  }

  const winner = calculateWinner(squares);
  const nextValue = calculateNextValue(squares);
  const status = calculateStatus(winner, squares, nextValue)

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="card bg-base text-neutral-content">
          <div className="card-body">
            <h2 className="card-title self-center">Tic Tac Toe</h2>
            <h3 className="card-text self-center">{status}</h3>
            <div className='grid-cols-3'>
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
            </div>
            <div className='grid-cols-3'>
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
            </div>
            <div className='grid-cols-3'>
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </div>
            <button className='btn btn-outline' onClick={restart}>
              Restart
            </button>
            <p>{setSquares}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Game() {
  return (
    <Board />
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
      ? `Scratch: Cat's game`
      : `Next player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

// eslint-disable-next-line no-unused-vars
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

function App() {
  return (
    <div className='md:container md:mx-auto'><Game /></div>
  )
}

export default App;
