import React from 'react'
import { useNavigate } from 'react-router';


export default function AssignmentCard(props: any) {
    let navigate = useNavigate();
    function handleClick() {
        navigate(`/dashboard/assignments/${props.id}`);
    }
    const { title, className, dueDate } = props;
    return (
        <div className="card assignment-card" onClick={handleClick}>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{className}</h6>
                <p className="card-text">0/20 Completed<br />Due: {dueDate}</p>
            </div>
        </div >
    )
}