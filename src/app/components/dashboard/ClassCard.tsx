import React from 'react'
import { useNavigate } from 'react-router';

export default function ClassCard(props: any) {
    let navigate = useNavigate();
    function handleClick() {
        navigate(`/dashboard/classes/${props.id}`);
    }
    return (
        <div className="card class-card" onClick={handleClick}>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{props.subtitle}</h6>
            </div>
        </div>
    )
}
