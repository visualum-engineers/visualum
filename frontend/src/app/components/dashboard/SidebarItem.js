import React from 'react'
// import { useSelector, useDispatch } from 'react-redux';
// import { updated } from '../../../redux/features/dashboardStatus/dashboardSlice';
import { useHistory } from "react-router-dom";

export default function SidebarItem(props) {
    // const state = useSelector((state) => state.dashboard)
    // const dispatch = useDispatch();
    let history = useHistory();

    function handleClick() {
        history.push(`/dashboard/${props.value}`);
    }
    return (
        <div className="sidebar-item">
            <div className={`tab-button ${props.selected ? 'selected' : ''}`} onClick={handleClick}>
                <p>{props.name}</p>
            </div>
        </div>
    )
}
