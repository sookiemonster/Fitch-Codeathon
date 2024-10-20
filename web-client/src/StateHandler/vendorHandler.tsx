import { State } from "./reducer"
import { API_URL } from "../config";
import { Station } from "../StationCapacities";
import { Vendor } from "../DBHandler/interfaces";

async function getVendorOverview(id:number):Promise<Vendor> {
    return new Promise ((resolve, reject) =>
        fetch(`${API_URL}/vendors/${id}/location`)
            .then(data => {return data.json()})
            .then(data => resolve({
                id: id, 
                lat: data.x, 
                lng: data.y}
            ))
            .catch(err => reject(err))
    )
}

async function getAllVendorLocations(state:State, dispatch:any):Promise<void> {
    try {
        const idsResponse = await fetch(`${API_URL}/vendors/`);
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

        const vendorOverviews:Promise<Vendor>[] = [];
        ids.forEach(id => {
            vendorOverviews.push(
                getVendorOverview(id)
            );
        })
        
        Promise.all(vendorOverviews)
            .then(vendorData => {
                dispatch({type: "setVendors", value: vendorData });
                dispatch({type: "completeStationsLoad" })
            })
    } catch (err:any) {
        console.log(err);
        dispatch({type: "raiseVendorsError" });
    }
}

export default getAllVendorLocations;