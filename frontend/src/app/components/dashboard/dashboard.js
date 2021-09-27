import React, { useState } from 'react'
import DashboardNav from './DashboardNav';
import HomeContent from './HomeContent';
import SidebarItem from './SidebarItem';
import { useSelector } from 'react-redux';

export default function Dashboard() {
    const state = useSelector((state) => state.dashboard)
    let content = <HomeContent />

    switch (state.selected) {
        case "home":
            content = <HomeContent />
            break;
        case "my-class":
            content = <div />
            break;
        case "statistics":
            content = <div />
            break;
        case "grades":
            content = <div />
            break;
        case "settings":
            content = <div />
            break;
        case "help":
            content = <div />
            break;
        default:
            <div />
    }
    return (
        <div className="vh-100">
            <DashboardNav />
            <div className="dashboard-container">
                <div className="sidebar">
                    <SidebarItem name="Home" value="home" />
                    <SidebarItem name="My Class" value="my-class" />
                    <SidebarItem name="Statistics" value="statistics" />
                    <SidebarItem name="Grades" value="grades" />
                    <SidebarItem name="Settings" value="settings" />
                    <SidebarItem name="Help" value="help" />
                </div>
                <div className="main-content">
                    {content}
                </div>
            </div>
        </div>
    )
}