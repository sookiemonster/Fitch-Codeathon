import React, {useState, useEffect} from "react";
import { Station } from "../StationCapacities";
import { PieChart } from '@mui/x-charts/PieChart';
import { Stack, Typography, Divider} from "@mui/material";
import { Item } from "../DBHandler/interfaces";

const MAX_TOKENS = 10000;

const getCapacityCategory = (capacity:number) => {
    if (capacity < 25) { return "Near Empty"; }
    else if (capacity < 50) { return "Near Half"; }
    else if (capacity < 75) { return "Near Full"; }
    else if (capacity == 100) { return "Full"; }
}

const getTokenStockCategory = (token_count:number) => {
    let stock_percentage = (token_count + 0.0) / MAX_TOKENS;

    if (stock_percentage < 25) { return "Near Empty"; }
    else if (stock_percentage < 50) { return "Near Half"; }
    else if (stock_percentage < 75) { return "Near Full"; }
    else if (stock_percentage == 100) { return "Full"; }
}

interface capacityProps {
    current_capacity:number;
}

interface tokenProps {
    token_count:number;
}

interface itemizedProps {
    id:number;
}

interface InventoryCounts {
    [item_name: string]: number;
}

function CapacityView({current_capacity}:capacityProps):JSX.Element {
    return (
        <div className="stat-container">
        <label>Dishes</label>
        <div className="pie-container">
            <PieChart
                height={80}
                series={[
                    {
                        data: [ { value: current_capacity }, 
                            { value: 100 - current_capacity } ],
                            innerRadius: 30,
                            outerRadius: 40,
                            paddingAngle: 2,
                            cornerRadius: 2,
                            cx: 35,
                            cy: 35
                        }
                    ]}/>
                <span className="capacity">{ current_capacity }<small>%</small></span>
            </div>
            <h3> { getCapacityCategory(current_capacity) }</h3>
        </div>
    );
}

function TokenView({token_count}:tokenProps):JSX.Element {
    return (
        <div className="stat-container">
            <label>Tokens Left</label>
            
            <Stack
                sx={{ justifyContent: "center", alignItems: "center" }}
                divider={<Divider orientation="horizontal" flexItem />}
                >
                <Typography variant="h4">{token_count}</Typography>
                <Typography variant="h5">{MAX_TOKENS}</Typography>
            </Stack>
            <h3> { getTokenStockCategory(token_count) }</h3>
        
        </div>
    );
}

function ItemizedView({id}:itemizedProps):JSX.Element {
    // State to hold the fetched data
    const [stationInventory, setStationInventory] = useState<InventoryCounts>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data from the API when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${id}/items`);

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                setStationInventory(data);
            } catch (err:any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); 

    if (loading) {
        return <div className="inventory-breakdown">Loading...</div>;
    }

    if (error) {
        return <div className="inventory-breakdown">Error. Could not load station inventory</div>;
    }

    return (
        <div className="inventory-breakdown">
            <h1>Items List</h1>
            {Object.entries(stationInventory).map(([name, count]) => (
                <p key="name">{name} - {count} </p>
            ))}
        </div>
    );
}

function StationCard({id, real_name, current_capacity, alert_threshold, token_count, lat, lng}:Station):JSX.Element {
    return (
        <div className="station-card">
            <header>
                <small>Station ID: {id}</small>
                <h2>{real_name}</h2>
            </header>

            <CapacityView current_capacity={current_capacity} />
            <TokenView token_count={token_count} />
            <ItemizedView id={id} />
        </div>
    )
}

export default StationCard;