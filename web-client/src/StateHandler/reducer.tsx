import React from "react";

import { Inventory } from "../StockDetailer";
import { Diet } from "../DietSelector";
import { Station } from "../StationCapacities";
import { Alert } from "../StockAlerter";
import { User } from "../DBHandler/interfaces";

interface State {
    user?:User 
    inventory?:Inventory,
    stations?:[Station],
    alerts?:[Alert],
    selected_diet:Diet
}

type StateAction = 
    { type: "logout" ; value:any}
    | { type: "selectDiet" ; value:Diet }

const initialState:State = { selected_diet:Diet.ALL }

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