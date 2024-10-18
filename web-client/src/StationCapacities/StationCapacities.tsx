import React from "react"
import { State } from "../StateHandler";

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
    return (
        <div id="capacities">
            <h2>Drop Station Dish Capacity</h2>
            { (state.stations) ? state.stations.map(elem => <StationDetails key={elem.id} {...elem} />) : "" }
        </div>
    )
}

export default StationCapacities;
export type {Station};