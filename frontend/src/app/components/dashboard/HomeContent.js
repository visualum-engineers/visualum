import React from 'react'
import OverviewCard from './OverviewCard';

export default function HomeContent() {
    return (
        <div className="card-container">
            <OverviewCard value="grades" title="Grades" subtitle="Manage Class Grades" text="Input, edit and delete class grades.">
                {/* {content here (example charts, minified displays, etc.)} */}
            </OverviewCard>
            <OverviewCard value="statistics" title="Metrics" subtitle="View Grade Metrics" text="View detailed metrics about your students.">
                {/* {content here} */}
            </OverviewCard>
        </div>
    )
}