import React, { useState } from 'react'
import DashboardNav from './DashboardNav';
import HomeContent from './HomeContent';
import SidebarItem from './SidebarItem';

export default function Dashboard() {
    const [selected, setSelected] = useState("home");
    return (
        <div className="vh-100">
            <DashboardNav />
            <div className="dashboard-container">
                <div className="sidebar">
                    <SidebarItem name="Home" value="home" handleSelect={setSelected} selected={selected} />
                    <SidebarItem name="My Class" value="my-class" handleSelect={setSelected} selected={selected} />
                    <SidebarItem name="Statistics" value="statistics" selected={selected} handleSelect={setSelected} />
                    <SidebarItem name="Grades" value="grades" selected={selected} handleSelect={setSelected} />
                    <SidebarItem name="Settings" value="settings" selected={selected} handleSelect={setSelected} />
                    <SidebarItem name="Help" value="help" selected={selected} handleSelect={setSelected} />
                </div>
                <div className="main-content">
                    <HomeContent />
                </div>
            </div>
        </div>
    )
}