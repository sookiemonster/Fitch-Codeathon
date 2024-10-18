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
        <div>
        <button className="diet-selector" id="vegan-selector" onClick={() => dispatch({type: "selectDiet", value: Diet.VEGAN })}>VEGAN</button>
        <button className="diet-selector" id="halal-selector" onClick={() => dispatch({type: "selectDiet", value: Diet.HALAL })}>HALAL</button>
        <button className="diet-selector" id="nonveg-selector" onClick={() => dispatch({type: "selectDiet", value: Diet.NONE })}>NON-VEG</button>
        </div>
    )
}

export default DietSelector;
export { Diet };