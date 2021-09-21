import React, { useState } from 'react'
import DashboardNav from './DashboardNav';
import OverviewCard from './OverviewCard';

export default function Dashboard() {
    const [selected, setSelected] = useState("home");
    return (
        <div className="h-100">
            <DashboardNav />
            <div className="dashboard-container">
                <div className="sidebar">
                    <Item name="Home" value="home" handleSelect={setSelected} selected={selected} />
                    <Item name="My Class" value="my-class" handleSelect={setSelected} selected={selected} />
                    <Item name="Statistics" value="statistics" selected={selected} handleSelect={setSelected} />
                    <Item name="Grades" value="grades" selected={selected} handleSelect={setSelected} />
                    <Item name="Settings" value="settings" selected={selected} handleSelect={setSelected} />
                    <Item name="Help" value="help" selected={selected} handleSelect={setSelected} />
                </div>
                <div className="main-content">
                    <div className="row">
                        <div className="col">
                            <OverviewCard title="Grades" subtitle="Manage Class Grades" text="Input, edit and delete class grades.">
                                {/* {content here} */}
                            </OverviewCard>
                        </div>
                        <div className="col">
                            <OverviewCard title="Metrics" subtitle="View Grade Metrics" text="View detailed metrics about your students.">
                                {/* {content here} */}
                            </OverviewCard>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Item(props) {
    return (
        <div className="sidebar-item">
            <div className={`tab-button ${props.selected === props.value ? 'selected' : ''}`} onClick={() => props.handleSelect(props.value)}>
                <p>{props.name}</p>
            </div>
        </div>
    )
}