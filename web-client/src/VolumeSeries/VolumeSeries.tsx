import React, { useState, useMemo } from "react";
import { State } from "../StateHandler";
import { BarChart } from '@mui/x-charts/BarChart';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';

interface SeriesProps {
    state:State, 
    dispatch:any
}

enum Field { CHECKOUT = "Check-Out", DROPOFF = "Drop-off" }
enum Interval { DAY = "Day", WEEK = "Week", MONTH = "Month", YEAR = "Year" }

interface SeriesFilters {
    item_type?:String,
    field:Field,
    interval:Interval
}

const initialFilters:SeriesFilters = {
    field:Field.CHECKOUT,
    interval: Interval.DAY
}

interface DATA {
    domain:string[], 
    series:number[],
}

interface SelectorProps {
    filters:SeriesFilters,
    setFilters:any
}


function generateDemoData():DATA {
    const domain = Array.from(Array(24).keys()).map(value => {
        if (value > 12) { return (value % 12).toString() + " PM"} 
        return value.toString() + " AM"
    });
    
    const series = Array.from(Array(24).keys()).map(value => {
        return Math.floor(1090 * Math.random() * (12 + (-1.0 / 12.0 * (value - 12) * (value - 12))))
    });

    return {domain: domain, series:series};
}

function Selectors({filters, setFilters}:SelectorProps):JSX.Element {
    const handleIntervalChange = (event: SelectChangeEvent) => {
      setFilters({...filters, interval: event.target.value});
    };

    const handleFieldChange = (event: SelectChangeEvent) => {
        setFilters({...filters, field: event.target.value});
      };

    return (
        <div id="selectors">
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="interval-selector-label">Interval</InputLabel>
            <Select
            id="interval-select-filled"
            value={filters.interval}
            onChange={handleIntervalChange}
            defaultValue={Interval.DAY}
            >
            <MenuItem value={Interval.DAY}>Today</MenuItem>
            <MenuItem value={Interval.WEEK}>This Week</MenuItem>
            <MenuItem value={Interval.MONTH}>This Month</MenuItem>
            <MenuItem value={Interval.YEAR}>This Year</MenuItem>
            </Select>
        </FormControl>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="field-selector-label">Transaction Type</InputLabel>
            <Select
            id="field-select-filled"
            value={filters.field}
            onChange={handleFieldChange}
            defaultValue={filters.field}
            >
            <MenuItem value={Field.CHECKOUT}>Check-Out</MenuItem>
            <MenuItem value={Field.DROPOFF}>Drop-Off</MenuItem>
            </Select>
        </FormControl>
        </div>
    )
}

function VolumeSeries({state, dispatch}:SeriesProps):JSX.Element {
    const [filters, setFilters] = useState(initialFilters);

    const demoData = useMemo(generateDemoData, [filters]);

    return (
        <div id="series-card">
            <h2>{filters.field} Volume Over the {filters.interval} </h2>
            <Selectors filters={filters} setFilters={setFilters}/>
            
            <BarChart
                xAxis={[{ scaleType: 'band', data: demoData.domain, label: "Hours", tickPlacement: "middle" }]}
                series={[
                    { data: demoData.series, color: "#000000" }]}
                
                height={220}
                yAxis={[{
                    min: 0,  
                    max: 15000,
                    colorMap: {
                        type: 'continuous',
                        min: 1000,
                        max: 10000,
                        color: ['darkgray', 'black'],
                      }
                }]}
                margin={{
                    left: 50,
                    right: 30,
                    top: 30,
                    bottom: 50,
                  }}
            />
        </div>
    )
}

export default VolumeSeries;