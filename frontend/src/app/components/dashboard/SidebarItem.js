import React from 'react'
import { useLocation, useMatch, useNavigate } from "react-router-dom";

export default function SidebarItem(props) {
    let navigate = useNavigate();
    let location = useLocation();
    let match = useMatch({ path: `/dashboard/${props.value}`, end: false });
    console.log('location', location)
    console.log(match)

    console.log('prop value', props.value)

    function handleClick() {
        navigate(`${props.value}`);
    }

    const toHighlight = match || ((location.pathname === '/dashboard' || location.pathname === '/dashboard/') && (props.value) === 'home')

    return (
        <div className="sidebar-item">
            <div className={`tab-button ${toHighlight ? 'selected' : ''} `}
                onClick={handleClick}
            >
                <p>{props.name}</p>
            </div>
        </div>
    )
}
