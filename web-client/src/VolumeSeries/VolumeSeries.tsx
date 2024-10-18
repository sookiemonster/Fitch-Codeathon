import React from "react";
import { State } from "../StateHandler";

interface SeriesProps {
    state:State, 
    dispatch:any
}

function VolumeSeries({state, dispatch}:SeriesProps):JSX.Element {
    return (
        <div id="series-card">

        </div>
    )
}

export default VolumeSeries;