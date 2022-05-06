import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function OverviewCard(props) {
    let navigate = useNavigate();

    function handleClick() {
        navigate(`/dashboard/${props.value}`);
    }
    return (
        <div className="card overview-card" onClick={handleClick}>
            <div className='overview-center'>
                <FontAwesomeIcon className='overview-icon' icon={props.icon} />
            </div>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <div className='h-100' />
                <h6 className="card-subtitle mb-2 text-muted">{props.subtitle}</h6>
            </div>
        </div>
    )
}
