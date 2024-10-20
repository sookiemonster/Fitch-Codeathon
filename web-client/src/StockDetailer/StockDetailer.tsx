import React, { useState, useEffect } from "react";
import { State } from "../StateHandler";
import DietSelector, { Diet } from "../DietSelector";
import getSummary from "../StateHandler/summaryHandler";
import { Button, Stack, Modal } from "@mui/material";
import ItemizedStockViewer from "./ItemizedStockViewer";

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

function StockLabel({label, count, color}:LabelProps): JSX.Element {
    return (
        <div className={"stock-label " + color}>
            <label>{label}</label>
            <span className="count">{ (count === 0 || count) ? count : "loading"}</span>
        </div>
    )
}

function StockDetailer({state, dispatch}:DetailerProps):JSX.Element {
    const [showMore, setShowMore] = useState(false);
    const open = () => {setShowMore(true);}
    const close = () => {setShowMore(false);}

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

    useEffect(() => {
        getSummary(state, dispatch);
    }, []);

    return (
        <div id="stock-summary-section">
            <div id="summary-container">
            <StockLabel color="green" label="Washed" count={displayedDiet?.washed_count} />
            <StockLabel color="yellow" label="Unwashed" count={displayedDiet?.unwashed_count} />
            <StockLabel color="red" label="Uncollected" count={displayedDiet?.uncollected_count} />
            </div>
            <DietSelector state={state} dispatch={dispatch} />
            <Button id="view-more" onClick={open}>View More Information</Button>
            
            <Modal
                open={showMore}
                onClose={close}
                aria-labelledby="itemized-title"
                aria-describedby="itemized-stock-viewer">
                <>
                <ItemizedStockViewer state={state} dispatch={dispatch} />
                </>
            </Modal>    
        </div>
    )
}

export default StockDetailer;
export type { Inventory, InventoryCounters };