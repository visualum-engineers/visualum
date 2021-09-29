import React from 'react'
import DashboardNav from './DashboardNav';
import DashboardSidebar from './DashboardSidebar';

export default function Dashboard(props) {
    return (
        <div className="vh-100">
            <DashboardNav />
            <div className="dashboard-container">
                <DashboardSidebar page={props.page} />
                <div className="main-content">
                    {props.children}
                </div>
            </div>
        </div>
    )
}