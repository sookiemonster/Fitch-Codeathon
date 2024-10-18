import React, { useEffect, useState } from "react";
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
        <button className={(state.selected_diet === Diet.VEGAN) ? "selected" : ""} id="vegan-selector" onClick={() => dispatch({type: "selectDiet", value: Diet.VEGAN })}>VEGAN</button>
        <button className={(state.selected_diet === Diet.HALAL) ? "selected" : ""} id="halal-selector" onClick={() => dispatch({type: "selectDiet", value: Diet.HALAL })}>HALAL</button>
        <button className={(state.selected_diet === Diet.NONE) ? "selected" : ""} id="nonveg-selector" onClick={() => dispatch({type: "selectDiet", value: Diet.NONE })}>NON-VEG</button>
        </div>
    )
}

export default DietSelector;
export { Diet };