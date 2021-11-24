import React, { useState } from 'react'
import Dashboard from './Dashboard'
import AssignmentCard from './AssignmentCard'
import CardContainer from './CardContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function DashboardAssignments() {

    const [assignments, setAssignments] = useState([
        { title: "History Homework", className: "4th Period", dueDate: "Dec 31st, 2021" },
        { title: "Math Homework", className: "8th Period", dueDate: "Dec 30th, 2021" },
        { title: "History Homework", className: "4th Period", dueDate: "Dec 31st, 2021" },
        { title: "Math Homework", className: "8th Period", dueDate: "Dec 30th, 2021" },
    ])

    const addAssignment = (newAssignment) => {
        setAssignments(curr => [...curr, newAssignment])
    }

    const cards = assignments.map(assignment => {
        return (
            <div className="col-md-4 col-12 p-2">
                <AssignmentCard title={assignment.title} className={assignment.className} dueDate={assignment.dueDate} />
            </div>
        )
    })


    return (
        <Dashboard page="assignments">
            <div className="control-bar">
                <div className="buttons">
                    <button className="btn btn-success button">
                        <span className="pe-1"><FontAwesomeIcon icon={faPlus} /></span> Create New Assignment
                    </button>
                </div>
            </div>
            <CardContainer>
                {cards}
            </CardContainer>
        </Dashboard >
    )
}