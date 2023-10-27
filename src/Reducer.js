const initCells = [null, null, null, null, null, null, null, null, null];
const intialState = {
  gameStarted: false,
  playerOne: "Player One",
  playerTwo: "Player Two",
  playerOneWins: 0,
  playerTwoWins: 0,
  currentPlayer: 0,
  result: "",
  cells: initCells.slice(),
};

const gameReducer = (state = intialState, action) => {
  const type = action.type;
  const payload = action.payload;
  switch (type) {
    case "NEXT_USER_TURN":
      return { ...state, currentPlayer: state.currentPlayer === 0 ? 1 : 0 };
    case "RESET_GAME":
      return { ...state, result: "", cells: initCells.slice() };
    case "PLAYER_ONE_WON":
      return {
        ...state,
        playerOneWins: state.playerOneWins + 1,
        result: `${state.playerOne} has WON!!!`,
      };
    case "PLAYER_TWO_WON":
      return {
        ...state,
        playerTwoWins: state.playerTwoWins + 1,
        result: `${state.playerTwo} has WON!!!`,
      };
    case "DRAW_GAME":
      return {
        ...state,
        playerOneWins: state.playerOneWins + 1,
        playerTwoWins: state.playerTwoWins + 1,
        result: `Draw!!!`,
      };
    case "TICK": {
      const cells = state.cells.slice();
      cells[payload.position] = payload.symbol;
      return { ...state, cells };
    }
    case "SET_PLAYER_ONE":
      return { ...state, playerOne: payload };
    case "SET_PLAYER_TWO":
      return { ...state, playerTwo: payload };
    default:
      return state;
  }
};

export { gameReducer, initCells, intialState };
