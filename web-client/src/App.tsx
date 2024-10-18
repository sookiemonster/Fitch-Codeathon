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

// Use optionals for not-logged in & waiting for load

function App() {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const [pageTitle, setPageTitle] = useState("home");

  return (
    <div className="App">
      
      <Header title={pageTitle} user={state.user} />
      <StockDetailer state={state} dispatch={dispatch} />
    </div>
  );
}

export default App;
