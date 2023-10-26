import { useState } from "react";
import Box from "./Box";

const GameContainer = (props) => {
  const initCells = [null, null, null, null, null, null, null, null, null];
  const intialState = {
    gameStarted: false,
    playerOne: props.pone,
    playerTwo: props.ptwo,
    playerOneWins: 0,
    playerTwoWins: 0,
    currentPlayer: 0,
    result: "",
    cells: initCells.slice(),
  };
  const symbols = ["X", "O"];
  const [state, setState] = useState(intialState);
  const winPatterns = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  const getCurrentPlayerName = () => {
    return state.currentPlayer === 0 ? state.playerOne : state.playerTwo;
  }
  const clickHandler = (pos) => {
    let value = symbols[state.currentPlayer];
    const oldVal = state.cells[pos];
    if ((state.result.trim() === "") & (oldVal === null)) {
      let newState = {};
      newState.cells = state.cells;
      newState.cells[pos] = value;
      if (hasPattrenMatch(value, newState.cells)) {
        if (state.currentPlayer == 0) {
          newState.playerOneWins = state.playerOneWins + 1;
          newState.result = `${state.playerOne} has WON!!!`;
        } else {
          newState.playerTwoWins = state.playerTwoWins + 1;
          newState.result = `${state.playerTwo} has WON!!!`;
        }
      } else {
        if (!newState.cells.includes(null)) {
          newState.playerOneWins = state.playerOneWins + 1;
          newState.playerTwoWins = state.playerTwoWins + 1;
          newState.result = `Draw!!!`;
        }
        newState.currentPlayer =
          state.currentPlayer == 0 ? 1 : state.currentPlayer == 1 ? 0 : 1;
      }

      setState((currentState) => {
        return { ...currentState, ...newState };
      });
    }
  };
  const hasPattrenMatch = (symbol, cells) => {
    console.log(symbol, cells);
    const occurances = cells.map((val, index) => {
      if (val === symbol) return index;
    });
    console.log(occurances);
    return winPatterns.some((pattren, index) => {
      console.log(`pattren ${index}`, pattren);
      return pattren.every((winpos, index) => {
        console.log(`winpos ${index}`, winpos);
        console.log(occurances.findIndex((pos) => pos === winpos - 1));
        return occurances.findIndex((pos) => pos === winpos - 1) > -1
          ? true
          : false;
      });
    });
  };
  const newGameHandler = () => {
    setState((state) => {
      return { ...state, cells: initCells.slice(), result: "" };
    });
  };

  return (
    <div className="gameContainer">
      <div id="playerInfo">
        <h3>
          {state.playerOne} - {state.playerOneWins}
        </h3>
        <h3>
          {state.playerTwo} - {state.playerTwoWins}
        </h3>
        
      </div>
      <div className="game">
        {initCells.map((val, index) => <Box key={index} symbol={state.cells[index]} clickHandler={()=>{clickHandler(index)}} />)}

        
      </div>
      <h3>{getCurrentPlayerName()} turn !</h3>
      <div>
        {state.result != "" && (
          <>
            <h1>{state.result}</h1>
            <button onClick={newGameHandler}> New Game</button>
          </>
        )}
        {state.result === "" && (
          <button onClick={newGameHandler}> Rest Boxes</button>
        )}
        <button onClick={props.exitGameHandler}> Exit Game</button>
      </div>
    </div>
  );
};
export default GameContainer;
