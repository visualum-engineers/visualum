import React from 'react'
import SidebarItem from './SidebarItem';

export default function DashboardSidebar(props) {
    return (
        <div className="dashboard-sidebar">
            <SidebarItem name="Home" value="home" selected={props.page === 'home'} />
            <SidebarItem name="My Class" value="my-class" selected={props.page === 'my-class'} />
            <SidebarItem name="My Activities" value="activities" selected={props.page === 'activities'} />
            <SidebarItem name="Statistics" value="statistics" selected={props.page === 'statistics'} />
            <SidebarItem name="Grades" value="grades" selected={props.page === 'grades'} />
            <SidebarItem name="Settings" value="settings" selected={props.page === 'settings'} />
            <SidebarItem name="Help" value="help" selected={props.page === 'help'} />
        </div>
    )
}
