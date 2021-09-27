import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { updated } from '../../../redux/features/dashboardStatus/dashboardSlice';

export default function OverviewCard(props) {
    const state = useSelector((state) => state.dashboard)
    const dispatch = useDispatch();

    return (
        <div className="card overview-card" style={{ width: "18rem" }} onClick={() => { dispatch(updated(props.value)) }}>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{props.subtitle}</h6>
                <p className="card-text">{props.text}</p>
            </div>
        </div>
    )
}
