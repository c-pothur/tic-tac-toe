import { useState } from "react";

import "./App.css";
import GameContainer from "./GameContainer";
import Intro from "./Into";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [pone, setPone] = useState("");
  const [ptwo, setPtwo] = useState("");

  const playBtnHandler = (e) => {
    const poneName = e.target.playerOne.value;
    const ptwoName = e.target.playerTwo.value;
    if (poneName.trim() !== "") setPone(poneName);
    if (ptwoName.trim() !== "") setPtwo(ptwoName);
    setGameStarted(true);
  };
  const exitGameHandler = () => {
    setPone("");
    setPtwo("");
    setGameStarted(false);
  };
  return (
    <>
      <header>
        <h1>Tic Tac Toe</h1>
      </header>
      {!gameStarted && <Intro clickHandler={playBtnHandler} />}
      {gameStarted && (
        <GameContainer
          pone={pone}
          ptwo={ptwo}
          exitGameHandler={exitGameHandler}
        />
      )}
    </>
  );
}

export default App;
