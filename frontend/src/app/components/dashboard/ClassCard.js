import React from 'react'
import { useNavigate } from 'react-router';

export default function ClassCard(props) {
    let navigate = useNavigate();
    function handleClick() {
        navigate(`/dashboard/classes/${props.id}`);
    }
    return (
        <div class="card class-card" onClick={handleClick}>
            <div class="card-body">
                <h5 class="card-title">{props.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{props.subtitle}</h6>
                <p class="card-text">{props.text}</p>
            </div>
        </div>
    )
}
