import React, { useReducer, useState } from "react";
import logo from './logo.svg';
import './styles/style.css';

import Header from "./Header";
import StockDetailer from "./StockDetailer";
import StockAlerter from "./StockAlerter";
import VolumeSeries from "./VolumeSeries";
import Map from "./Map";
import StationCapacities from "./StationCapacities";

import { initialState, stateReducer } from "./StateHandler";
import { debugIntitialState } from "./StateHandler";

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
      <Map state={state} dispatch={dispatch} />
    </div>
  );
}

export default App;
