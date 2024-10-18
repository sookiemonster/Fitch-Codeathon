import React, { useState } from "react";
import { State } from "../StateHandler";
import { User, Place } from "../DBHandler/interfaces";
interface Alert {
    id:string,
    item_type:string,
    location:Place,
    alert_time:Date,

    completer?:User
    completed_time?:Date
}

interface StockAlerterProps {
    state:State,
    dispatch:any
}

function AlertView({state, dispatch, ...alert}:StockAlerterProps & Alert):JSX.Element {    
    let update = () => {
        dispatch({
            type: "updateAlert", 
            value: { 
                alert_id: alert.id,
                newCompletionStatus: !alert.completed_time,
                completer: state.user,
                completed_time: new Date(Date.now())
            }
        })
    }

    return (
        <div className="container">
            <input onClick={() => update() } type="checkbox" defaultChecked={(alert.completer) != null} />
            <span className="title">{alert.item_type} - <i>{alert.location.real_name}</i></span>
            <span className="request-details">
                Request Time: { alert.alert_time.toLocaleString('en-US') }
            </span>
            { (alert.completed_time) ? 
                <span className="completion-details">
                    Completed By : {alert.completer?.name} at { alert.completed_time?.toLocaleString('en-US') }
                </span>
                : 'Incomplete'
            }
        </div>
    )
}

function StockAlerter({state, dispatch}: StockAlerterProps):JSX.Element {
    return (
        <div id="stock-alerts-container">
            <h2>Vendor Stock Alerts</h2>
             {(state?.alerts) ? 
             state.alerts.map(alert => <AlertView key={alert.id} state={state} dispatch={dispatch} {...alert}/>)
             : "Loading..."}
        </div>
    )
}

export default StockAlerter;
export type { Alert };