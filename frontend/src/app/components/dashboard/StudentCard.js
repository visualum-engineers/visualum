import React from 'react'
import Avatar from 'avataaars'

export default function StudentCard(props) {
    return (
        <div className="card student-card">
            <div className="card-body">
                <h5 className="card-title">{props.data.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Average: {props.data.average}</h6>
            </div>
            <div className='student-avatar'>
                <Avatar avatarStyle='Circle' style={{ height: "80%", marginBottom: ".5rem" }} />
            </div>
        </div>
    )
}
