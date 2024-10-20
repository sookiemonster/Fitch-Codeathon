import React from "react";
import { User } from "../DBHandler/interfaces";
import { IconButton, Typography } from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Stack } from "@mui/material";

interface HeaderProps {
    title:string,
    user?:User
    total_reuse:number
}

function Header({title, user, total_reuse}:HeaderProps):JSX.Element {
    return (
        <div id="header">
            <Stack spacing={0}>
                <Typography variant="h5"><b>{ title }</b></Typography>
                <Typography color="success" variant="h6">Total Dishes Re-Used: <b>{total_reuse}</b></Typography>
            </Stack>
            <Typography marginLeft="auto" variant="h5">{ (user) ? `Welcome ${user.name}` : "" }</Typography>
            <IconButton href="/logout"><ExitToAppIcon fontSize="large" /></IconButton>
        </div>
    )
}

export default Header;