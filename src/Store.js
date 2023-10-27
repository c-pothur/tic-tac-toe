import { configureStore } from "@reduxjs/toolkit";
import { gameReducer } from "./GameSlice";

const store = configureStore({ reducer: { game: gameReducer } });

export default store;

/* as game object is setup in configureStore reducer, state object has game property and game has all data
{
    "game": {
        "gameStarted": false,
        "playerOne": "Player One",
        "playerTwo": "Player Two",
        "playerOneWins": 0,
        "playerTwoWins": 0,
        "currentPlayer": 0,
        "result": "",
        "cells": [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ]
    }
}
*/
