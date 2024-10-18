import React from "react";

interface HeaderProps {
    title:string,
    user?:User
}

function Header({title, user}:HeaderProps):JSX.Element {
    return (
        <div id="header">
            <h1>{ title }</h1>
            <div>{ (user) ? user.name : "" }</div>
            <div id="logout"></div>
        </div>
    )
}

export default Header;