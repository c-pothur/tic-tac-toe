import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { gameReducer } from "./Reducer.js";

const store = configureStore({ reducer: gameReducer });
//createStore from redux has been depricated and suggested to use configureStore

console.log(store.getState());
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
