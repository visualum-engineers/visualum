import React from 'react'
import ClassCard from './ClassCard'
import Dashboard from './Dashboard'

export default function DashboardClass() {
    return (
        <Dashboard page="classes">
            <ClassCard />
        </Dashboard>
    )
}