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

type StateAction = 
    { type: "logout" ; value:any}
    | { type: "selectDiet" ; value:Diet }

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
    ]
}

function stateReducer(state:State, action: StateAction):State {    
    switch (action.type) {
        case "logout": 
            // Logout
            return state;

        case "selectDiet":
            // Toggle if we attempt to click the same diet
            if (state.selected_diet == action.value) {
                const updatedState =  {...state, selected_diet: Diet.ALL }
                return updatedState;
            }
            
            // Or select alternate diet
            const updatedState = {...state, selected_diet: action.value};
            return updatedState;
        default:
            throw new Error("Unknown Action");
    }
}

export { stateReducer, initialState };
export type { State, StateAction}; 

export {debugIntitialState};