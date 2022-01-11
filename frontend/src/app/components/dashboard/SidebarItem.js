import React from 'react'
// import { useSelector, useDispatch } from 'react-redux';
// import { updated } from '../../../redux/features/dashboardStatus/dashboardSlice';
import { useNavigate } from "react-router-dom";

export default function SidebarItem(props) {
    // const state = useSelector((state) => state.dashboard)
    // const dispatch = useDispatch();
    let navigate = useNavigate();

    function handleClick() {
        navigate(`/dashboard/${props.value}`);
    }
    return (
        <div className="sidebar-item">
            <div className={`tab-button ${props.selected ? 'selected' : ''}`} onClick={handleClick}>
                <p>{props.name}</p>
            </div>
        </div>
    )
}
