import React from 'react'
import { useHistory } from 'react-router-dom';

export default function OverviewCard(props) {
    let history = useHistory();

    function handleClick() {
        history.push(`/dashboard/${props.value}`);
    }
    return (
        <div className="card overview-card" onClick={handleClick}>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{props.subtitle}</h6>
                {/* <div className="overview-card-feature">{props.children}</div> */}
            </div>
        </div>
    )
}
