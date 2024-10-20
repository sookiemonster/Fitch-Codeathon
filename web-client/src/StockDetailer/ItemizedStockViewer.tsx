import React, { useState } from "react"
import { State } from "../StateHandler"
import { Stack } from "@mui/material"

import { ItemizedView } from "../Map"
import DietSelector from "../DietSelector"

interface itemizedProps {
    state:State
    dispatch:any
}

const fetchWasherInventory = () => {

}

function ItemizedStockViewer({state, dispatch}:itemizedProps):JSX.Element {
    const [washerInventory, setWasherInventory] = useState([]);

    return (
        <Stack id="itemized-stock-viewer">
            <DietSelector state={state} dispatch={dispatch} />
            <ItemizedView id={1} category="Washer" />
        </Stack>
    )
}

export default ItemizedStockViewer;