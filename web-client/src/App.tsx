import React, { useReducer, useState } from "react";
import logo from './logo.svg';
import './styles/style.css';

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
import VolumeSeries from "./VolumeSeries";
const DEBUG = true;

function App() {
  let initial = initialState;
  if (DEBUG) {initial = debugIntitialState; }
  const [state, dispatch] = useReducer(stateReducer, initial);
  const [pageTitle, setPageTitle] = useState("Washing Overview");

  return (
    <div id="layout-container" className="App">
      
      <Header title={pageTitle} user={state.user} />
      <div id="metrics">
        <StockDetailer state={state} dispatch={dispatch} />
        <StationCapacities state={state} dispatch={dispatch} />
        <StockAlerter state={state} dispatch={dispatch} />
        <VolumeSeries state={state} dispatch={dispatch} />
      </div>
    </div>
  );
}

export default App;
