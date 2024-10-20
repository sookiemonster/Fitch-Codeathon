import React, {useState, useEffect} from "react";
import { Item } from "../DBHandler/interfaces";
import { API_URL } from "../config";
import { Vendor } from "../DBHandler/interfaces";
import ItemizedView from "./ItemizedView";

interface capacityProps {
    current_capacity:number;
}

interface tokenProps {
    token_count:number;
}

interface itemizedProps {
    id:number;
}

function VendorCard({id, lat, lng, inventory}:Vendor):JSX.Element {
    const [name, setName] = useState("");
    useEffect(() => {
        // Get Vendor Info Details
    });

    return (
        <div className="station-card vendor-card">
            <header>
                {(name) ?
                    <>
                        <small>Vendor ID: {id}</small>
                        <h2>{name}</h2>
                    </>
                    :
                    <h2>Vendor ID - {id}</h2>
                }
            </header>
            <ItemizedView id={id} category="Vendor" />
        </div>
    )
}

export default VendorCard;