# Redux toolkit implementation

1. create slice -- refer GameSlice.js
   import createSlice from @reduxjs/toolkit
   createSlice calling createSlice method with an object having properties
   name : string
   initialState : {initial state object}
   reducers : {object of reducer methods}
   below reducer method without action-payload
   resetGame: (state) => {
   state.result = "";
   state.cells = initCells.slice();
   },
   below reducer method with action-payload
   setPlayerOneName: (state, action) => {
   state.playerOne = action.payload;
   },
   slice object provides actions and reducer
   export actions and reducer
   export const gameActions = gameSlice.actions;
   export const gameReducer = gameSlice.reducer;

2. create more slice objects if state is complex or required

3. configure store -- refer store.js
   import configureStore from @reduxjs/toolkit
   call configureStore method with object reducer like below
   const store = configureStore({ reducer: { game: gameReducer, app:appReducer } });

   multiple slice reducers can be added in above reducer object as above.

   state in store is created in below format
   state : {"game" :{game data}, "app":{app data}}

4. Provide store on root component -- refer main.jsx
   import {Provider} from 'react-redux'
   import store from './Store.js'

   <Provider store={store}><App/></Provider>

5. Consume State -- refer GameContainer.jsx
   import {useSelector} from 'react-redux'
   using useSelector we can select required part from state

   const gameState = useSekector((state)=>{return state.game})

6. Dispatch Action -- refer GameContainer.jsx
   import {useDispatch} from 'react-redux'
   const dispatch = useDispatch()

   import actions exported from gameSlice

   dispatch with no payload
   dispatch(gameActions.resetGame())

   dispatch with payload
   dispatch(gameActions.tick({"position":position,"symbol":symbol}))
