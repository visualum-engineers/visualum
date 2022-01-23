import React from 'react'
import Avatar from 'avataaars'

export default function StudentCard(props) {
    return (
        <div class="card student-card">
            <div class="card-body">
                <h5 class="card-title">{props.data.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Average: {props.data.average}</h6>
            </div>
            <div className='student-avatar'>
                <Avatar style={{height: "100%"}}/>
            </div>
        </div>
    )
}
