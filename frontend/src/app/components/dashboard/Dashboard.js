import React from 'react'
import SlimNavbar from '../slimNavbar/SlimNavbar';
import DashboardSidebar from './DashboardSidebar';

export default function Dashboard(props) {
    return (
        <div className="vh-100">
            <SlimNavbar type={"dashboard-nav"}/>
            <div className="dashboard-container">
                <DashboardSidebar page={props.page} />
                <div className="main-content">
                    {props.children}
                </div>
            </div>
        </div>
    )
}