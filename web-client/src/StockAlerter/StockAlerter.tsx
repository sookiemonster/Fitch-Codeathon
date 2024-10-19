import React, { useState } from "react";
import { State } from "../StateHandler";
import { User, Place } from "../DBHandler/interfaces";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
        <FormControlLabel className="alert-container" 
            control={<Checkbox onClick={update} defaultChecked={(alert.completer) != null} color="success" />}
            label= {
                <div className="description">
                <span className="title">{alert.item_type} - <i>{alert.location.real_name}</i></span>
                <span className="request-details">
                    Request Time: { alert.alert_time.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' }) }
                </span>
                { (alert.completed_time) ? 
                    <span className="completion-details">
                        Completed by {alert.completer?.name} at { alert.completed_time?.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' }) }
                    </span>
                    
                    : 
                    <span className="completion-details">Incomplete </span>
                }
                </div>
            } />
    )
}

function StockAlerter({state, dispatch}: StockAlerterProps):JSX.Element {
    return (
        <div id="stock-alerts-container">
            <h2>Vendor Stock Alerts</h2>
             {(state?.alerts) ? 
             <FormGroup>
             { state.alerts.map(alert => <AlertView key={alert.id} state={state} dispatch={dispatch} {...alert}/>) }
             </FormGroup>
             : "Loading..."}
        </div>
    )
}

export default StockAlerter;
export type { Alert };