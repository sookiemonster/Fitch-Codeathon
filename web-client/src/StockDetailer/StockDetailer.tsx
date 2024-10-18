import React, { useState } from "react";
import { State } from "../StateHandler";
import DietSelector, { Diet } from "../DietSelector";
interface InventoryCounters {
    washed_count:number,
    unwashed_count:number,
    uncollected_count:number
}

interface Inventory {
    vegan: InventoryCounters;
    halal: InventoryCounters;
    none: InventoryCounters;
    all: InventoryCounters;
}

interface DetailerProps {
    inventory?:Inventory,
    state:State,
    dispatch:any
}

interface LabelProps {
    label:string
    count?:number
    color:string
}

function ItemizedStockViewer():JSX.Element {
    return <></>
}

function StockLabel({label, count, color}:LabelProps): JSX.Element {
    return (
        <div className={"stock-label " + color}>
            <label>{label}</label>
            <span className="count">{ (count) ? count : "loading"}</span>
        </div>
    )
}

function StockDetailer({state, dispatch}:DetailerProps):JSX.Element {
    const [viewMore, setViewMore] = useState(false);
    let displayedDiet = state.inventory?.all;

    switch (state.selected_diet) {
        case Diet.VEGAN:
            displayedDiet = state.inventory?.vegan;
            break;
        case Diet.HALAL:
            displayedDiet = state.inventory?.halal;
            break;
        case Diet.NONE:
            displayedDiet = state.inventory?.none;
            break;
        default:
            break;
    }

    return (
        <div id="stock-summary-section">
            <div id="summary-container">
            <StockLabel color="green" label="Washed" count={displayedDiet?.washed_count} />
            <StockLabel color="yellow" label="Unwashed" count={displayedDiet?.unwashed_count} />
            <StockLabel color="red" label="Uncollected" count={displayedDiet?.uncollected_count} />
            </div>
            <DietSelector state={state} dispatch={dispatch} />
            <button id="view-more" onClick={() => setViewMore(true)}>View More Information</button>
            
            { (viewMore) ? <ItemizedStockViewer/> : "" }
        </div>
    )
}

export default StockDetailer;
export type { Inventory, InventoryCounters };