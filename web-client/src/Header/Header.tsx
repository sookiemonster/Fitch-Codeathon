import React from "react";
import { User } from "../DBHandler/interfaces";

interface HeaderProps {
    title:string,
    user?:User
}

function Header({title, user}:HeaderProps):JSX.Element {
    return (
        <div id="header">
            <h1>{ title }</h1>
            <div>{ (user) ? user.name : "" }</div>
            <button id="logout">Logout</button>
        </div>
    )
}

export default Header;