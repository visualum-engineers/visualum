import React from 'react'
import Dashboard from './Dashboard'
import AssignmentCard from './AssignmentCard'

export default function DashboardAssignments() {
    return (
        <Dashboard page="assignments">
            <div className="control-bar">
                <div className="buttons">
                    <button className="btn btn-success button">
                        Create New Assignment
                    </button>
                </div>

            </div>
            <div className="card-container">
                <AssignmentCard assignment={{ title: "History Homework", className: "4th Period", dueDate: "Dec 31st, 2021" }} />
            </div>
        </Dashboard >
    )
}