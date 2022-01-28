import React from 'react'
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
                <span className='sidebar-item-text'>{props.name}</span>
                <div className={`sidebar-item-icon ${toHighlight ? 'icon-selected' : ''}`}>
                    <FontAwesomeIcon icon={props.icon} />
                </div>
            </div>
        </div>
    )
}
