import React from "react";
import { User } from "../DBHandler/interfaces";
import { IconButton, Typography } from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

interface HeaderProps {
    title:string,
    user?:User
}

function Header({title, user}:HeaderProps):JSX.Element {
    return (
        <div id="header">
            <h1>{ title }</h1>
            <Typography marginLeft="auto" variant="h5">{ (user) ? `Welcome ${user.name}` : "" }</Typography>
            <IconButton href="/logout"><ExitToAppIcon fontSize="large" /></IconButton>
        </div>
    )
}

export default Header;