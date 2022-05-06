import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default function ActivityCard(props) {
    console.log(props.data)
    return (
        <div className="activity-card card">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h5 className="card-title">Activity Name</h5>
                    <span className="activity-type">Matching</span>
                </div>
                <div className="d-flex justify-content-between">
                    <p className="card-subtitle">This activity was created as a test.</p>
                    <div className="activity-buttons ms-1">
                        <div className="button">
                            <FontAwesomeIcon icon={faEdit} />
                        </div>
                        <div className="button">
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
