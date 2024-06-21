import {useState} from 'react';
import './App.css';
import Button from './components/Button';
import Square from './components/Square';

function App() {

  const[squares, setSquares] = useState(Array(9).fill(""));
  const[turn, setTurn] = useState("x");
  const[win, setWin] = useState(null);

  const checkEndGame = () =>{
    for(let square of squares){
      if(!square) return false;
    }
    return true;
  }

  const checkwin = () => {
    const combos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
  ];

  for(let combo of combos){
    const[a,b,c] = combo;
    if(squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c])
      {
        return squares[a]
    } 
  }
  return null;
  }

  const updateSquares= (index) => {
    if(squares[index] || win){
      return ;
    }
    squares[index] = turn;
    setSquares(squares);
    setTurn(turn === 'x' ? "o" : "x")
    const w =checkwin();
    if(w){
      setWin(w);
    }else if (checkEndGame()){
      setWin("x" || "o")
    }

  }

  const resetGame = () => {
    setSquares(Array(9).fill(""));
    setTurn("x");
    setWin(null);
  }

  return (
    <div className="tic-tac-toe">
    <h1> TIC-TAC-TOE </h1>
    <Button resetGame={resetGame} />
    <div className="game">
        {Array.from("012345678").map((index) => (
            <Square
                key={index}
                index={index}
                updateSquares={updateSquares}
                clsName={squares[index]}
            />
        ))}
    </div>
    <div className={`turn ${turn === "x" ? "left" : "right"}`}>
        <Square clsName="x" />
        <Square clsName="o" />
    </div>
    {win && (
        <div className="winner">
            <div className="text">
                <h2>
                    {win === "x | o"
                        ? "No win :/"
                        : "Win !! :)"}
                </h2>
                <div className="win">
                    {win === "x | o" ? (
                        <>
                            <Square clsName="x" />
                            <Square clsName="o" />
                        </>
                    ) : (
                        <>
                            <Square clsName={win} />
                        </>
                    )}
                </div>
                <div>
                    <Button resetGame={resetGame} />
                </div>
            </div>
        </div>
    )}
</div>

  );
}

export default App;
