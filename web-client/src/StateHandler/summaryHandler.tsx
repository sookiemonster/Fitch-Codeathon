import { State } from "./reducer"
import { API_URL } from "../config";
import { Station } from "../StationCapacities";
import { Inventory } from "../StockDetailer";

interface DishStatus {
    unwashed:any
    washed:any
    uncollected:any
}

interface UndietedCount {
    total?:number
    plates:number
    cups:number
}

interface Response {
    all:DishStatus
    vegan:DishStatus
    halal:DishStatus
    regular:DishStatus
}

const transformData = (data:Response):Inventory => {
    const {all, vegan, halal, regular} = data;
    return {
        all: {
            washed_count: all.washed.total,
            unwashed_count: all.unwashed.total,
            uncollected_count: all.uncollected.plates + data.all.uncollected.cups 
        },
        vegan: {
            washed_count: vegan.washed.plates,
            unwashed_count: vegan.unwashed.plates,
            uncollected_count: vegan.uncollected.plates
        },
        halal: {
            washed_count: halal.washed.plates,
            unwashed_count: halal.unwashed.plates,
            uncollected_count: halal.uncollected.plates
        },
        none: {
            washed_count: regular.washed.plates,
            unwashed_count: regular.unwashed.plates,
            uncollected_count: regular.uncollected.plates
        }
    }
}

async function getSummary(state:State, dispatch:any):Promise<void> {
    try {
        const res = await fetch(`${API_URL}/metrics/`);
        if (!res.ok) throw new Error(`Error: ${res.statusText}`);

        const data = await res.json();
        
        console.log(transformData(data.counts));
        dispatch({type: "setSummaries", value: transformData(data.counts) });
        dispatch({type: "completeSummaryLoad" })
    } catch (err:any) {
        console.log(err);
        dispatch({type: "raiseSummaryError" });
    }
}

export default getSummary;