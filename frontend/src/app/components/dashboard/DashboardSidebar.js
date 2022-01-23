import React from 'react'
import SidebarItem from './SidebarItem';
import sidebarValues from './sidebarValues';
const Logo = "./images/VisualumLogo.png"


export default function DashboardSidebar(props) {
    const items = sidebarValues.map(item =>
        <SidebarItem name={item.name} value={item.value} selected={props.page === item.value} />
    )

    return (
        <div className="dashboard-sidebar">
            <a className="dashboard-sidebar-brand" href="/">
                <img className="dashboard-logo"
                    src={Logo}
                    alt="Visualum logo" />
                <span className="dashboard-sidebar-name">
                    visualum
                </span>
            </a>
            {items}
        </div>
    )
}