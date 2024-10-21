import React from "react";

import { Inventory } from "../StockDetailer";
import { Diet } from "../DietSelector";
import { Station } from "../StationCapacities";
import { Alert } from "../StockAlerter";
import { User, Vendor } from "../DBHandler/interfaces";

interface State {
    user?:User 
    inventory?:Inventory,
    stations?:Station[],
    vendors?:Vendor[],
    stationsLoading:Boolean,
    stationsError:Boolean,
    summaryLoading:Boolean,
    summaryError:Boolean,
    vendorsLoading:Boolean,
    vendorsError:Boolean,
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
    | { type: "setStations" ; value:Station[] }
    | { type: "setSummaries" ; value:Inventory }
    | { type: "setVendors" ; value:Vendor[] }
    | { type: "raiseStationsError" }
    | { type: "completeStationsLoad" }
    | { type: "raiseSummaryError" }
    | { type: "completeSummaryLoad" }
    | { type: "completeVendorsLoad" }
    | { type: "raiseVendorsError" }

const initialState:State = { 
    selected_diet:Diet.ALL, 
    stationsLoading:true, 
    stationsError: false, 
    summaryError:false, 
    summaryLoading:true,
    vendorsError:false, 
    vendorsLoading:true,
}
const debugIntitialState:State = {
    selected_diet: Diet.ALL,
    stations: [],
    stationsLoading: true,
    stationsError: false,
    summaryLoading: true,
    summaryError: false,
    vendorsError:false, 
    vendorsLoading:true,
    alerts: [
        {
            id: "awdj3247",
            item_type: "Cold Cups",
            location: {
                id: 21,
                real_name:"Fauzia's"
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

        case "setVendors":
            return {...state, vendors: action.value};

        case "completeVendorsLoad":
            return {...state, vendorsLoading: false };

        case "raiseVendorsError":
            return {...state, vendorsError: true };

        default:
            throw new Error(`Unknown Action: ${action}`);
    }
}

export { stateReducer, initialState };
export type { State, StateAction}; 

export {debugIntitialState};