import React from "react";

import { Inventory } from "../StockDetailer";
import { Diet } from "../DietSelector";
import { Station } from "../StationCapacities";
import { Alert } from "../StockAlerter";
import { User } from "../DBHandler/interfaces";

interface State {
    user?:User 
    inventory?:Inventory,
    stations?:Station[],
    alerts?:Alert[],
    selected_diet:Diet
}

interface AlertChange {
    alert_id:string,
    newCompletionStatus:Boolean,
    completer?:User,
    completed_time?:Date
}

type StateAction = 
    { type: "logout" ; value:any}
    | { type: "selectDiet" ; value:Diet }
    | { type: "updateAlert" ; value:AlertChange }

const initialState:State = { selected_diet:Diet.ALL }
const debugIntitialState:State = {
    selected_diet: Diet.ALL,
    inventory: {
        vegan: {
            washed_count: 100,
            unwashed_count: 50,
            uncollected_count: 32
        },
        halal: {
            washed_count: 200,
            unwashed_count: 501,
            uncollected_count: 68
        },
        none: {
            washed_count: 502,
            unwashed_count: 705,
            uncollected_count: 1002
        },
        all: {
            washed_count: 20000,
            unwashed_count: 50000,
            uncollected_count: 60000
        }
    }, 
    stations: [
        {
            id: "Station 1",
            current_capacity: 45.0,
            alert_threshold: 75.0,
            token_count: 202
        },
        {
            id: "Station 2",
            current_capacity: 75.0,
            alert_threshold: 75.0,
            token_count: 202
        },
        {
            id: "Station 3",
            current_capacity: 25.0,
            alert_threshold: 75.0,
            token_count: 202
        },
        {
            id: "Station 4",
            current_capacity: 5.0,
            alert_threshold: 75.0,
            token_count: 202
        }
    ],
    alerts: [
        {
            id: "awdj3247",
            item_type: "Cold Cups",
            location: {
                id: 2389,
                real_name:"vendor"
            },
            alert_time: new Date(Date.now())
        }
    ],
    user: {
        name: "Daniel",
        user_id: "someweuiu24"
    }
}

function stateReducer(state:State, action: StateAction):State {    
    switch (action.type) {
        case "logout": 
            // Logout
            return state;

        case "selectDiet":
            // Toggle if we attempt to click the same diet
            if (state.selected_diet == action.value) {
                return {...state, selected_diet: Diet.ALL };
            }
            
            // Or select alternate diet
            return {...state, selected_diet: action.value};
        case "updateAlert":
            if (!state.alerts) { return state; }
            console.log(action.value);
            
            const updatedAlerts:Alert[] = state.alerts.map(alert => {
                // Not the correct alert
                if (alert.id != action.value.alert_id) { return alert; }
                
                // If we just completed it, mark the completion time to now & the current user
                if (action.value.newCompletionStatus) {
                    return {...alert, 
                        completer: action.value.completer, 
                        completed_time: new Date(Date.now())}
                }

                // Otherwise mark it incomplete
                return {...alert, completer: undefined, completed_time: undefined }
            })
            
            return {...state, alerts: updatedAlerts};
        default:
            throw new Error("Unknown Action");
    }
}

export { stateReducer, initialState };
export type { State, StateAction}; 

export {debugIntitialState};