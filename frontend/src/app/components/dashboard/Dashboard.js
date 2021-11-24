import React, { useState } from 'react'
import DashboardSidebar from './DashboardSidebar';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { toggledCollapsed } from '../../../redux/features/dashboardStatus/dashboardSlice';
import useWindowWidth from '../../hooks/use-window-width'
import sidebarValues from './sidebarValues';

export default function Dashboard(props) {
    let history = useHistory();
    const dispatch = useDispatch();
    const state = useSelector((state) => state.dashboard)

    function handleClick() {
        history.push("/");
    }
    function handleCollapse() {
        dispatch(toggledCollapsed());
    }

    const widthBigger = useWindowWidth(992);

    const dropDownItems = widthBigger ?
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <button className="btn back-button" onClick={handleClick}>
                    Back to Homepage
                </button>
            </li>
        </ul>
        :
        <ul className="navbar-nav me-auto">
            {sidebarValues.map(item => {
                return (
                    <li className="nav-item">
                        <a className="nav-link" href={`/dashboard/${item.value}`}>{item.name}</a>
                    </li>
                )
            })}
        </ul>

    return (
        <div className="dashboard vh-100">
            <nav className="navbar navbar-expand-lg navbar-dark bg-light dashboard-nav">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse mt-3 mt-lg-0" id="navbarTogglerDemo01">
                        <a className="navbar-brand" href="/">visualum</a>
                        {dropDownItems}
                    </div>
                </div>
            </nav>
            {/* <nav class="navbar navbar-expand-lg navbar-light bg-light dashboard-nav">
                <div className="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse navbar-dark bg-dark" id="navbarTogglerDemo01">
                        <div className="navbar-brand" onClick={handleClick}>visualum</div>
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <button className="btn back-button" onClick={handleClick}>
                                    Back to Homepage
                                </button>
                            </li>
                        </ul>
                    </div>
                </div >
            </nav> */}
            <div className="dashboard-container">
                {widthBigger ? <DashboardSidebar page={props.page} /> : <></>}
                <div className={`main-content ${state.collapsed ? "main-content-full" : ""}`}>
                    {props.children}
                </div>
            </div>
        </div >
    )
}