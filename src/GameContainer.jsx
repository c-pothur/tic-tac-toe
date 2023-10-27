import { useEffect } from "react";
import { gameActions } from "./GameSlice";
import { initCells } from "./Reducer";
import Box from "./Box";
import { useDispatch, useSelector } from "react-redux";

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

const GameContainer = ({ pone, ptwo, exitGameHandler }) => {
  const gameState = useSelector((state) => {
    return state.game;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (pone !== "") dispatch(gameActions.setPlayerOneName(pone));
    if (ptwo !== "") dispatch(gameActions.setPlayerTwoName(ptwo));
  }, [pone, ptwo]);

  useEffect(() => {
    return () => {
      dispatch(gameActions.resetGame());
    };
  }, []);

  const getCurrentPlayerName = () => {
    return gameState.currentPlayer === 0
      ? gameState.playerOne
      : gameState.playerTwo;
  };
  const clickHandler = (position) => {
    let symbol = symbols[gameState.currentPlayer];
    const oldVal = gameState.cells[position];
    if (gameState.result.trim() === "" && oldVal === null) {
      let cells = gameState.cells.slice();
      cells[position] = symbol;
      dispatch(gameActions.tick({ position, symbol }));
      if (hasPattrenMatch(symbol, cells)) {
        if (gameState.currentPlayer === 0) {
          dispatch(gameActions.setPlayerOneWon());
        } else {
          dispatch(gameActions.setPlayerTwoWon());
        }
      } else {
        if (!cells.includes(null)) {
          dispatch(gameActions.drawGame());
        }
        dispatch(gameActions.setNextUserTurn());
      }
    }
  };
  const hasPattrenMatch = (symbol, cells) => {
    const occurances = cells.map((val, index) => {
      if (val === symbol) return index;
    });
    return winPatterns.some((pattren) => {
      return pattren.every((winpos) => {
        return occurances.findIndex((pos) => pos === winpos - 1) > -1;
      });
    });
  };
  const newGameHandler = () => {
    dispatch(gameActions.resetGame());
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
        <button onClick={exitGameHandler}> Exit Game</button>
      </div>
    </div>
  );
};
export default GameContainer;
