import React from 'react'
import Dashboard from './Dashboard'
import StudentCard from './StudentCard'

export default function DashboardClass() {
    const studentData = [
        {
            name: "Derek Widmer",
            average: 98
        },
        {
            name: "Arky Asmal",
            average: 95.5
        },
        {
            name: "Luis Lopez",
            average: 99.2
        },
        {
            name: "Kevin Arias",
            average: 99.2
        },
        {
            name: "Emilio Samaniego",
            average: 97
        },

    ]
    return (
        <Dashboard page="classes">
            <div className="card-container">
                <StudentCard data={studentData[0]} />
                <StudentCard data={studentData[1]} />
                <StudentCard data={studentData[2]} />
                <StudentCard data={studentData[3]} />
                <StudentCard data={studentData[4]} />
            </div>
        </Dashboard >
    )
}