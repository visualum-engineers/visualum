import React from 'react'
import SidebarItem from './SidebarItem';
import sidebarValues from './sidebarValues';
// const Logo = "./images/VisualumLogo.png";

export default function DashboardSidebar(props: any) {

    const items = sidebarValues.map(item =>
        <SidebarItem
            name={item.name}
            value={item.value}
            icon={item.icon}
            selected={props.page === item.value}
            key={item.value}
        />
    )

    return (
        <div className="dashboard-sidebar">
            {/* <a className="dashboard-sidebar-brand" href="/">
                <img className="dashboard-logo"
                    src={Logo}
                    alt="Visualum logo" />
                <span className="dashboard-sidebar-name">
                    visualum
                </span>
            </a> */}
            {items}
        </div>
    )
}