import { createSlice } from "@reduxjs/toolkit";
import { initCells } from "./Reducer";

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

const gameSlice = createSlice({
  name: "game",
  initialState: intialState,
  reducers: {
    resetGame: (state) => {
      state.result = "";
      state.cells = initCells.slice();
    },
    setNextUserTurn: (state) => {
      state.currentPlayer = state.currentPlayer === 0 ? 1 : 0;
    },
    setPlayerOneWon: (state) => {
      state.playerTwoWins = state.playerTwoWins + 1;
      state.result = `${state.playerOne} has WON!!!`;
    },
    setPlayerTwoWon: (state) => {
      state.playerOneWins = state.playerOneWins + 1;
      state.result = `${state.playerTwo} has WON!!!`;
    },
    drawGame: (state) => {
      state.playerOneWins = state.playerOneWins + 1;
      state.playerTwoWins = state.playerTwoWins + 1;
      state.result = "DRAW!!!";
    },
    tick: (state, action) => {
      const cells = state.cells.slice();
      cells[action.payload.position] = action.payload.symbol;
      state.cells = cells;
    },
    setPlayerOneName: (state, action) => {
      state.playerOne = action.payload;
    },
    setPlayerTwoName: (state, action) => {
      state.playerTwo = action.payload;
    },
  },
});

export const gameActions = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
