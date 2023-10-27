const GameActions = {
  nextUserTurnAcion: () => ({ type: "NEXT_USER_TURN" }),
  resetGameAction: () => ({ type: "RESET_GAME" }),
  playerOneWonAction: () => ({
    type: "PLAYER_ONE_WON",
  }),
  playerTwoWonAction: () => ({
    type: "PLAYER_TWO_WON",
  }),
  drawGameAction: () => ({
    type: "DRAW_GAME",
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
