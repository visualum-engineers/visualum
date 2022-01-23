import React from 'react'
import DashboardSidebar from './DashboardSidebar';
import { useNavigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useWindowWidth from '../../hooks/use-window-width'
import sidebarValues from './sidebarValues';
const Logo = "./images/VisualumLogo.png"


export default function Dashboard(props) {
    let navigate = useNavigate();
    const state = useSelector((state) => state.dashboard)

    function handleClick() {
        navigate("/");
    }

    const widthBigger = useWindowWidth(992);

    const dropDownItems =
        <ul className="navbar-nav me-auto">
            {sidebarValues.map(item => {
                return (
                    <li className="nav-item dropdown-nav-link">
                        <a href={`/dashboard/${item.value}`}>{item.name}</a>
                    </li>
                )
            })}
        </ul>
    const nav =
        <nav className="navbar navbar-light sticky-top navbar-expand-lg dashboard-nav">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse mt-3 mt-lg-0" id="navbarTogglerDemo01">
                    {dropDownItems}
                </div>
            </div>
        </nav>

    return (
        <div className="dashboard vh-100">
            {widthBigger ? <></> :
                <>
                    <div className='center-logo'>
                        <img className="dashboard-logo"
                            src={Logo}
                            alt="Visualum logo"
                            onClick={handleClick}
                        />
                    </div>
                    {nav}
                </>}
            <div className="dashboard-container">
                {widthBigger ? <DashboardSidebar page={props.page} /> : <></>}
                <div className={`main-content ${state.collapsed ? "main-content-full" : ""}`}>
                    <Outlet />
                </div>
            </div>
        </div >
    )
}