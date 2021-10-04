import React from 'react'
import { useHistory } from 'react-router';

export default function ClassCard(props) {
    let history = useHistory();
    function handleClick() {
        history.push(`/dashboard/classes/${props.id}`);
    }
    return (
        <div class="card class-card" style={{ width: "18rem" }} onClick={handleClick}>
            <div class="card-body">
                <h5 class="card-title">{props.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{props.subtitle}</h6>
                <p class="card-text">{props.text}</p>
            </div>
        </div>
    )
}
