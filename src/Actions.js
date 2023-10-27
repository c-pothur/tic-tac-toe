const GameActions = {
  nextUserTurnAcion: () => ({ type: "NEXT_USER_TURN", payload: "" }),
  resetGameAction: () => ({ type: "RESET_GAME", payload: "" }),
  playerOneWonAction: () => ({
    type: "PLAYER_ONE_WON",
    payload: "",
  }),
  playerTwoWonAction: () => ({
    type: "PLAYER_TWO_WON",
    payload: "",
  }),
  drawGameAction: () => ({
    type: "DRAW_GAME",
    payload: "",
  }),
  tickAction: (position, symbol) => ({
    type: "TICK",
    payload: { position, symbol },
  }),
  setPlayerOneAction: (playerOne) => ({
    type: "SET_PLAYER_ONE",
    payload: playerOne,
  }),
  setPlayerTwoAction: (playerTwo) => ({
    type: "SET_PLAYER_TWO",
    payload: playerTwo,
  }),
};

export default GameActions;
