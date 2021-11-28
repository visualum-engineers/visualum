import React from 'react'
import SidebarItem from './SidebarItem';
import { useSelector } from 'react-redux'
import sidebarValues from './sidebarValues';

export default function DashboardSidebar(props) {
    const state = useSelector((state) => state.dashboard);
    const items = sidebarValues.map(item => <SidebarItem name={item.name} value={item.value} selected={props.page === item.value} />)

    return (
        <div className={state.collapsed ? "collapsed-sidebar" : "collapsable-sidebar"}>
            <div className="dashboard-sidebar">
                {items}
            </div>
        </div>
    )
}