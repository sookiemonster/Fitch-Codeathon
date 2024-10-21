import React, { useState } from "react"
import { State } from "../StateHandler"
import { Stack } from "@mui/material"

import { ItemizedView } from "../Map"
import DietSelector from "../DietSelector"

interface itemizedProps {
    state:State
    dispatch:any
}


function ItemizedStockViewer({state, dispatch}:itemizedProps):JSX.Element {
    return (
        <Stack id="itemized-stock-viewer">
            <ItemizedView id={1} category="Washer" />
        </Stack>
    )
}

export default ItemizedStockViewer;