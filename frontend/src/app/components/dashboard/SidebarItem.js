import React from 'react'
import { useNavigate } from "react-router-dom";
import { useResolvedPath, useMatch } from 'react-router-dom';

export default function SidebarItem(props) {
    let navigate = useNavigate();
    let resolved = useResolvedPath(props.value);
    let match = useMatch({ path: resolved.pathname, end: false });

    function handleClick() {
        navigate(`${props.value}`);
    }
    return (
        <div className="sidebar-item">
            <div className={`tab-button ${match ? 'selected' : ''}`} onClick={handleClick}>
                <p>{props.name}</p>
            </div>
        </div>
    )
}
