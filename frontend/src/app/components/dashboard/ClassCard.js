import React from 'react'

export default function ClassCard(props) {
    return (
        <div class="card class-card" style={{ width: "18rem" }}>
            <div class="card-body">
                <h5 class="card-title">{props.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{props.subtitle}</h6>
                <p class="card-text">{props.text}</p>
            </div>
        </div>
    )
}
