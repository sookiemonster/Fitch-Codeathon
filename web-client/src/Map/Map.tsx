
import React, { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { State } from "../StateHandler";
import { Place } from "../DBHandler/interfaces";
import { PieChart } from '@mui/x-charts/PieChart';

import StationCard from "./StationCard";
const DARK_MODE = false;

interface MapProps {
    state:State,
    dispatch:any,
}

function StationMarkers({state, dispatch}:MapProps):JSX.Element {
    return (
        <>
        { state.stations ? 
        state.stations.map(station => 
            <Marker key={station.id} position={[station.lat, station.lng]}>
                <Popup>
                <StationCard {...station} />
                </Popup>
            </Marker>
        )
        : ""}
        </>
    )
}

function Map({state, dispatch}:MapProps):JSX.Element {
    
    return (
        <div id="map-panel">
                <MapContainer center={[40.6885, -74.0190]} zoom={16} 
                scrollWheelZoom={false}
                // dragging={false}        
                touchZoom={false}        
                doubleClickZoom={false}   
                zoomControl={false}       
                boxZoom={false}          
                keyboard={false}>
                { DARK_MODE ? 
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    />
                    :
                <TileLayer
                    attribution='&copy; Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                    />
                }
                <StationMarkers state={state} dispatch={dispatch} />
            </MapContainer>
        </div>
    );
        
}

export default Map;