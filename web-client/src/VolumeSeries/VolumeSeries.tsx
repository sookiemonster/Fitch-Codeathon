import React, { useState, useMemo } from "react";
import { State } from "../StateHandler";

interface SeriesProps {
    state:State, 
    dispatch:any
}

enum Field { CHECKOUT = "Check-Out", DROPOFF = "Drop-off" }
enum Interval { DAY = "Day", WEEK = "Week", MONTH = "Month", YTD = "Year-to-Date" }

interface SeriesFilters {
    item_type?:String,
    field:Field,
    interval:Interval
}

const initialFilters:SeriesFilters = {
    field:Field.CHECKOUT,
    interval: Interval.DAY
}

function VolumeSeries({state, dispatch}:SeriesProps):JSX.Element {
    const [filter, setFilters] = useState(initialFilters);

    let calcBars = () => {

    }

    const cachedValue = useMemo(calcBars,
        [filter, state.inventory]
    )

    
    return (
        <div id="series-card">
            <h2>{initialFilters.field} Volume Over the {initialFilters.interval} </h2>
        </div>
    )
}

export default VolumeSeries;