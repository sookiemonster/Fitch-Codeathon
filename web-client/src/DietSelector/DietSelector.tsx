import React from "react";
import { State } from "../StateHandler";

enum Diet {
    VEGAN = "vegan", 
    HALAL = "halal", 
    NONE = "non-vegan", 
    ALL = "all"
}

interface SelectorProps {
    state:State,
    dispatch:any
}

function DietSelector({state, dispatch}:SelectorProps):JSX.Element {
    return (
        <div id="diet-selector">
        <button className="selected" id="vegan-selector" onClick={() => dispatch({type: "selectDiet", value: Diet.VEGAN })}>VEGAN</button>
        <button id="halal-selector" onClick={() => dispatch({type: "selectDiet", value: Diet.HALAL })}>HALAL</button>
        <button id="nonveg-selector" onClick={() => dispatch({type: "selectDiet", value: Diet.NONE })}>NON-VEG</button>
        </div>
    )
}

export default DietSelector;
export { Diet };