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
}

function ItemizedStockViewer():JSX.Element {
    return <></>
}

function StockLabel({label, count}:LabelProps): JSX.Element {
    return (
        <div className="stock-label">
            <span>{label}</span>
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
        <div id="stock-detailer">
            <StockLabel label="Washed" count={displayedDiet?.washed_count} />
            <StockLabel label="Unwashed" count={displayedDiet?.unwashed_count} />
            <StockLabel label="Uncollected" count={displayedDiet?.uncollected_count} />
            <DietSelector state={state} dispatch={dispatch} />
            <button onClick={() => setViewMore(true)}></button>
            
            { (viewMore) ? <ItemizedStockViewer/> : "" }
        </div>
    )
}

export default StockDetailer;
export type { Inventory, InventoryCounters };