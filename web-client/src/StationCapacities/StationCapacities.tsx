import React, { useState } from "react"
import { State } from "../StateHandler";
import { JsxElement } from "typescript";

interface Station {
    id:string,
    current_capacity:number,
    alert_threshold:number,
    token_count:number
}

interface StationsProps {
    state:State,
    dispatch:any
}

interface ModalProps {
    state:State, 
    dispatch:any, 
    setVisibilityFlag:any
}

function AlertModal({state, dispatch, setVisibilityFlag}:ModalProps):JSX.Element {
    const saveChanges = () => {
        // dispatch();
        setVisibilityFlag(false);
    }

    const discardChanges = () => { setVisibilityFlag(false); }

    return (
        <div id="customize-alert-modal">
            <h2>Configure Station Alert Thresholds</h2>
            <form>
                Dispatch call to update DB.
                <button onClick={() => discardChanges() }>Discard</button>
                <button onClick={() => saveChanges()}>Save</button>
            </form>
        </div>
    )
}

function StationDetails({id, current_capacity, token_count}:Station):JSX.Element {
    const MAX_CAPACITY = 100;
    return (
        <div className="station-container">
            <span className="identifer">{id}</span>
            <div data-capacity-decimal={current_capacity} className="capacity-bar"></div>
            <span className="capacity-label">{ (current_capacity >= MAX_CAPACITY) ? "Full" : current_capacity }</span>
            <span className="token-stock"><b>{token_count}</b> Tokens Left</span>
        </div>
    )
}

function StationCapacities({state, dispatch}:StationsProps):JSX.Element {
    const [showModal, setShowModal] = useState(false);
    return (
        <div id="capacities">
            <h2>Drop Station Dish Capacity</h2>
            { (state.stations) ? 
                <>
                    <div className="stations-list">
                        { state.stations.map(elem => <StationDetails key={elem.id} {...elem} />)  } 
                    </div>
                    <button id="alert-setter" onClick={() => setShowModal(true)}>Set Capacity Alerts</button>
                </>
                : "Loading..." }
            
            { (showModal) ? <AlertModal state={state} dispatch={dispatch} setVisibilityFlag={setShowModal}/> : ""}
                
        </div>
    )
}

export default StationCapacities;
export type {Station}; 