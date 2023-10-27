import { useEffect, useReducer } from "react";

import { gameReducer, initCells, intialState } from "./Reducer";
import GameActions from "./Actions";
import Box from "./Box";

const symbols = ["X", "O"];

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

const GameContainer = (props) => {
  const [gameState, dispatch] = useReducer(gameReducer, intialState);
  const poneName = props.pone;
  const ptwoName = props.ptwo;
  /*  if (poneName !== "") dispatch(GameActions.setPlayerOneAction(poneName));
     if (ptwoName !== "") dispatch(GameActions.setPlayerTwoAction(ptwoName)); 
     these two lines resulted below error
     Uncaught Error: Too many re-renders. React limits the number of renders to prevent an infinite
     First time when compoent is mounted not empty is checked and dispatch action is executed and component is rerendered
     as we are using the player names in this component. 
     on re-render again these two conditions are executed and component get re-rendered and goes into loop
     
     To avoid this we will use useEffect here
  */
  const reset = () => {
    console.log("reset");
    dispatch(GameActions.resetGameAction());
  };
  useEffect(() => {
    if (poneName !== "") dispatch(GameActions.setPlayerOneAction(poneName));
    if (ptwoName !== "") dispatch(GameActions.setPlayerTwoAction(ptwoName));
  }, [poneName, ptwoName]);

  useEffect(() => {
    return reset;
  }, []);
  const getCurrentPlayerName = () => {
    return gameState.currentPlayer === 0
      ? gameState.playerOne
      : gameState.playerTwo;
  };
  const clickHandler = (pos) => {
    let symbol = symbols[gameState.currentPlayer];
    const oldVal = gameState.cells[pos];
    if ((gameState.result.trim() === "") & (oldVal === null)) {
      let cells = gameState.cells;
      cells[pos] = symbol;
      dispatch(GameActions.tickAction(pos, symbol));
      if (hasPattrenMatch(symbol, cells)) {
        if (gameState.currentPlayer == 0) {
          dispatch(GameActions.playerOneWonAction());
        } else {
          dispatch(GameActions.playerTwoWonAction());
        }
      } else {
        if (!cells.includes(null)) {
          dispatch(GameActions.drawGameAction());
        }
        dispatch(GameActions.nextUserTurnAcion());
      }
    }
  };
  const hasPattrenMatch = (symbol, cells) => {
    const occurances = cells.map((val, index) => {
      if (val === symbol) return index;
    });
    return winPatterns.some((pattren) => {
      return pattren.every((winpos) => {
        return occurances.findIndex((pos) => pos === winpos - 1) > -1
          ? true
          : false;
      });
    });
  };
  const newGameHandler = () => {
    dispatch(GameActions.resetGameAction());
  };

  return (
    <div className="gameContainer">
      <div id="playerInfo">
        <h3>
          {gameState.playerOne} - {gameState.playerOneWins}
        </h3>
        <h3>
          {gameState.playerTwo} - {gameState.playerTwoWins}
        </h3>
      </div>
      <div className="game">
        {initCells.map((val, index) => (
          <Box
            key={index}
            symbol={gameState.cells[index]}
            clickHandler={() => {
              clickHandler(index);
            }}
          />
        ))}
      </div>
      <h3>{getCurrentPlayerName()} turn !</h3>
      <div>
        {gameState.result != "" && (
          <>
            <h1>{gameState.result}</h1>
            <button onClick={newGameHandler}> New Game</button>
          </>
        )}
        {gameState.result === "" && (
          <button onClick={newGameHandler}> Rest Boxes</button>
        )}
        <button onClick={props.exitGameHandler}> Exit Game</button>
      </div>
    </div>
  );
};
export default GameContainer;
