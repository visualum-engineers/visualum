import React from 'react'
import ClassCard from './ClassCard'
import Dashboard from './Dashboard'

export default function DashboardClass() {
    return (
        <Dashboard page="classes">
            <div className="card-container">
                <ClassCard title="Mrs. Teacher's 4th Period" subtitle="Algebra" text="Click to View Class" />
                <ClassCard title="Mrs. Teacher's 7th Period" subtitle="History" text="Click to View Class" />
                <ClassCard title="Mrs. Teacher's 9th Period" subtitle="Science" text="Click to View Class" />
            </div>
        </Dashboard>
    )
}