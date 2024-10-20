import React, { useState, useEffect } from "react";
import { API_URL } from "../config";
import { Item } from "../DBHandler/interfaces";
import { Box, Typography } from "@mui/material";
import InventoryIcon from '@mui/icons-material/Inventory';
import { ResponsiveChartContainer } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts/BarChart';

interface itemizedProps {
    id:number;
    category: "Vendor" | "Station" | "Washer"
}

interface InventoryCounts {
    [item_name: string]: number;
}

interface Dataset {
    names:string[]
    counts:number[]
}

const EmptyDataset = { names: [], counts: []}

function countByName(items: Item[]): InventoryCounts {
    return items.reduce((acc, item) => {
        // If the name already exists in the accumulator, increment the count
        if (acc[item.name]) {
            acc[item.name] += 1;
        } else {
            // Otherwise, initialize it with a count of 1
            acc[item.name] = 1;
        }
        return acc;
    }, {} as InventoryCounts);
}

function convertDictToSeries(dictionary:InventoryCounts):Dataset {
    return { 
        names: Object.keys(dictionary),
        counts: Object.keys(dictionary).map(key => dictionary[key] )
    }
}

function ItemizedView({id, category}:itemizedProps):JSX.Element {
    // State to hold the fetched data
    const [placeInventory, setPlaceInventory] = useState<Dataset>(EmptyDataset);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data from the API when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const endpoint = (category:string) => {
                    switch (category) {
                        case "Vendor": return "vendors";
                        case "Station": return "stations";
                        case "Washer": return "washer";
                    }
                }
                const response = await fetch(`${API_URL}/${endpoint(category)}/${id}/inventory`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                
                const data = await response.json();
                console.log(data);
                if (data.items){
                    console.log(data.items);
                    // console.log("data", countByName(data.items));
                    setPlaceInventory(convertDictToSeries(countByName(data.items)));
                } else {
                    setPlaceInventory(EmptyDataset);
                }
            } catch (err:any) {
                console.log(err);
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
            <Typography variant="caption">{category} Inventory</Typography>
            {placeInventory.names.length > 0 ? 
                <BarChart
                    height={(category === "Vendor") ? 150 : 110}
                    yAxis={[
                        { scaleType: 'band', 
                            data: placeInventory.names, 
                            tickPlacement: "middle",
                        }
                        ]} 
                    series={[
                        { data: placeInventory.counts
                        }]}
                            layout="horizontal"
                            grid={{ vertical: true }}
                            margin={{
                                left: 40,
                                right: 10,
                                top: 0,
                                bottom: 0,
                            }}
                    barLabel="value"
                    />
                :
                <Box display="flex"
                padding="20px"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    >
                    <Typography textAlign={"center"} variant="caption">No items stored here!</Typography>
                    <InventoryIcon fontSize="large" />
                </Box>
            }
        </div>
    );
}

export default ItemizedView;

