import React from "react";

import { Inventory } from "../StockDetailer";
import { Diet } from "../DietSelector";
import { Station } from "../StationCapacities";
import { Alert } from "../StockAlerter";
import { User, Place } from "../DBHandler/interfaces";

interface State {
    user?:User 
    inventory?:Inventory,
    stations?:Station[],
    stationsLoading:Boolean,
    stationsError:Boolean,
    summaryLoading:Boolean,
    summaryError:Boolean,
    alerts?:Alert[],
    places?:Place[],
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
    | { type: "setStations" ; value:Station[] }
    | { type: "setSummaries" ; value:Inventory }
    | { type: "raiseStationsError" }
    | { type: "completeStationsLoad" }
    | { type: "raiseSummaryError" }
    | { type: "completeSummaryLoad" }

const initialState:State = { selected_diet:Diet.ALL, stationsLoading:true, stationsError: false, summaryError:false, summaryLoading:true }
const debugIntitialState:State = {
    selected_diet: Diet.ALL,
    // inventory: {
    //     vegan: {
    //         washed_count: 100,
    //         unwashed_count: 50,
    //         uncollected_count: 32
    //     },
    //     halal: {
    //         washed_count: 200,
    //         unwashed_count: 501,
    //         uncollected_count: 68
    //     },
    //     none: {
    //         washed_count: 502,
    //         unwashed_count: 705,
    //         uncollected_count: 1002
    //     },
    //     all: {
    //         washed_count: 20000,
    //         unwashed_count: 50000,
    //         uncollected_count: 60000
    //     }
    // }, 
    stations: [],
    stationsLoading: true,
    stationsError: false,
    summaryLoading: true,
    summaryError: false,
    // stations: [
    //     {
    //         id: 1,
    //         real_name: "Station 1",
    //         current_capacity: 45.0,
    //         alert_threshold: 75.0,
    //         token_count: 202,
    //         lat: 40.688,
    //         lng: -74.0180
    //     },
    //     {
    //         id: 2,
    //         real_name: "Station 2",
    //         current_capacity: 75.0,
    //         alert_threshold: 75.0,
    //         token_count: 202,
    //         lat: 40.6885,
    //         lng: -74.0190
    //     },
    //     {
    //         id: 3,
    //         real_name: "Station 3",
    //         current_capacity: 25.0,
    //         alert_threshold: 75.0,
    //         token_count: 202,
    //         lat: 40.6888,
    //         lng: -74.02
    //     },
    //     {
    //         id: 4,
    //         real_name: "Station 4",
    //         current_capacity: 5.0,
    //         alert_threshold: 75.0,
    //         token_count: 202,
    //         lat: 40.6888,
    //         lng: -74.0217
    //     }
    // ],
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

        case "setStations":
            return {...state, stations: action.value};

        case "completeStationsLoad":
            return {...state, stationsLoading: false };

        case "raiseStationsError":
            return {...state, stationsError: false };

        case "setSummaries":
            return {...state, inventory: action.value};

        case "completeSummaryLoad":
            return {...state, summaryLoading: false };

        case "raiseSummaryError":
            return {...state, summaryError: true };

        default:
            throw new Error(`Unknown Action: ${action}`);
    }
}

export { stateReducer, initialState };
export type { State, StateAction}; 

export {debugIntitialState};