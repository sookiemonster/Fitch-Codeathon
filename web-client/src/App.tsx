import React, { useReducer, useState } from "react";
import logo from './logo.svg';
import './App.css';

// Interfaces
// import { Diet } from "./DietSelector";
// import { Station } from "./StationCapacities";
// import { Alert } from "./StockAlerter";
import Header from "./Header";
import StockDetailer from "./StockDetailer";
import { initialState, stateReducer } from "./StateHandler";
import StationCapacities from "./StationCapacities";

// Use optionals for not-logged in & waiting for load

import { debugIntitialState } from "./StateHandler";
import StockAlerter from "./StockAlerter";
const DEBUG = true;

function App() {
  let initial = initialState;
  if (DEBUG) {initial = debugIntitialState; }
  const [state, dispatch] = useReducer(stateReducer, initial);
  const [pageTitle, setPageTitle] = useState("home");

  return (
    <div className="App">
      
      <Header title={pageTitle} user={state.user} />
      <StockDetailer state={state} dispatch={dispatch} />
      <StationCapacities state={state} dispatch={dispatch} />
      <StockAlerter state={state} dispatch={dispatch} />
    </div>
  );
}

export default App;
