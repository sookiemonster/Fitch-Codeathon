// // stations: [
//     // {
//     //     id: 1,
//     //     real_name: "Station 1",
//     //     current_capacity: 45.0,
//     //     alert_threshold: 75.0,
//     //     token_count: 202,
//     //     lat: 40.688,
//     //     lng: -74.0180
//     // },

// import { Station } from "../StationCapacities"
import { State } from "./reducer"
import { API_URL } from "../config";
import { Station } from "../StationCapacities";
import { Item } from "../DBHandler/interfaces";
import { Inventory } from "@mui/icons-material";

interface StationSummary {
    id:number,
    x:number,
    y:number,
    capacity:number,
    tokens:number,
    inventory:number[]
}

async function fetchStationByID(id: number): Promise<Station> {
    // Make both requests concurrently
    const [overviewResponse, volumeResponse] = await Promise.all([
        fetch(`${API_URL}/stations/${id}`),
        fetch(`${API_URL}/stations/${id}/volume`)
    ]);

    // Check if both requests were successful
    if (!overviewResponse.ok || !volumeResponse.ok) {
        throw new Error(`Failed to fetch data for id ${id}`);
    }

    // Parse both responses as JSON
    const overviewData:StationSummary = await overviewResponse.json();
    const volumeData = await volumeResponse.json();

    // Return an object that combines the data from both responses
    return {
        id: overviewData.id,
        lat: overviewData.x,
        lng: overviewData.y,
        current_capacity: Math.ceil((volumeData.volume * 100.0) / (overviewData.capacity)),
        real_name: `Station ${id}`,
        token_count: overviewData.tokens,
        alert_threshold: 75.0,
        inventory: overviewData.inventory
    };
}

async function getStationOverviews(state:State, dispatch:any):Promise<void> {
    try {
        // const response = await fetch(`${API_URL}/stations/${id}/inventory`);
        const idsResponse = await fetch(`${API_URL}/stations/`);
        if (!idsResponse.ok) {
            throw new Error(`Error: ${idsResponse.statusText}`);
        }

        const idsUnwrapped = await idsResponse.json();
        const ids = []

        for (const key in idsUnwrapped) {
            if (idsUnwrapped[key].id){
                ids.push(idsUnwrapped[key].id);
            }
        }

        const allStationOverviews:Promise<Station>[] = [];
        ids.forEach(id => {
            allStationOverviews.push(
                fetchStationByID(id)
            );
        })

        Promise.all(allStationOverviews)
            .then(stationData => {
                // console.log(stationData);
                stationData = stationData.sort((a,b) => {return a.id - b.id})
                dispatch({type: "setStations", value: stationData });
                dispatch({type: "completeStationsLoad" })
            })
    } catch (err:any) {
        console.log(err);
        dispatch({type: "raiseStationsError" });
    }
}

export default getStationOverviews;