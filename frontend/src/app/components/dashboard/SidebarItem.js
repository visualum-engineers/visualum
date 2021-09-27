import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { updated } from '../../../redux/features/dashboardStatus/dashboardSlice';

export default function SidebarItem(props) {
    const state = useSelector((state) => state.dashboard)
    const dispatch = useDispatch();

    return (
        <div className="sidebar-item">
            <div className={`tab-button ${state.selected === props.value ? 'selected' : ''}`} onClick={() => dispatch(updated(props.value))}>
                <p>{props.name}</p>
            </div>
        </div>
    )
}
