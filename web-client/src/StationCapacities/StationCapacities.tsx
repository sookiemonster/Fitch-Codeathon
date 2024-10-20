import React, { useEffect, useState } from "react"
import { State } from "../StateHandler";
import LinearProgress from '@mui/material/LinearProgress';
import Modal from '@mui/material/Modal';
import { Box, Button } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import { Place, Item } from "../DBHandler/interfaces";
import getStationOverviews from "../StateHandler/stationHandler";
import { stat } from "fs";

interface Station extends Place {
    current_capacity:number,
    alert_threshold:number,
    token_count:number,
    inventory?:Promise<Item> | Item[] | number[]

    lat:number,
    lng:number
}

interface StationsProps {
    state:State,
    dispatch:any
}

interface ModalProps {
    state:State, 
    dispatch:any, 
    close:any
}

function AlertModal({state, dispatch, close}:ModalProps):JSX.Element {
    const saveChanges = () => {
        close();
    }

    const discardChanges = () => { close(); }

    return (
        <div id="alert-modal">
            <h2 id="modal-title">Configure Station Alert Thresholds</h2>
            <form>
                {/* Dispatch call to update DB. */}
                
                {/* <input type="number" /> */}
                <Box>

                </Box>

                <Button onClick={discardChanges} variant="outlined" disableElevation>Discard</Button>
                <Button onClick={saveChanges} variant="contained" disableElevation>Save</Button>
            </form>
        </div>
    )
}

function StationDetails({id, current_capacity, token_count, real_name}:Station):JSX.Element {
    const MAX_CAPACITY = 100;
    return (
        <div className="station-container">
            <span className="identifier">{real_name || id }</span>
            <LinearProgress className="capacity-bar" variant="determinate" value={current_capacity} />
            <span className="capacity-label">{ (current_capacity >= MAX_CAPACITY) ? "Full" : current_capacity + "%" }</span>
            <span className="token-stock"><b>{token_count}</b> Tokens Left</span>
        </div>
    )
}

function StationCapacities({state, dispatch}:StationsProps):JSX.Element {
    const [showModal, setShowModal] = useState(false);

    const open = () => {setShowModal(true);}
    const close = () => {setShowModal(false);}

    useEffect(() => {
        getStationOverviews(state, dispatch);
    }, []);

    return (
        <div id="capacities">
            <h2>Drop Station Dish Capacity</h2>
            { (!state.stationsLoading && state.stations && !state.stationsError) ? 
                <>
                    <div className="stations-list">
                        { state.stations.map(elem => <StationDetails key={elem.id} {...elem} />)  } 
                    </div>
                    <button id="alert-setter" onClick={open}><SettingsIcon/>Set Capacity Alerts</button>
                </>
                : "Loading..." }
            { (state.stationsError) ? "Error: Could not retrieve station info." : ""}
            <Modal
                open={showModal}
                onClose={close}
                aria-labelledby="modal-title"
                aria-describedby="alert-modal">
                <>
                <AlertModal state={state} dispatch={dispatch} close={close} />
                </>
            </Modal>                
        </div>
    )
}

export default StationCapacities;
export type {Station}; 