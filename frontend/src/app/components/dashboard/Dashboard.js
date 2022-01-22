import React from 'react'
import DashboardSidebar from './DashboardSidebar';
import { useNavigate, Outlet, Link } from 'react-router-dom';
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
                    <li className="nav-item">
                        <Link className={(navData) => `${navData.isActive ? 'selected' : ''} nav-link`} to={`${item.value}`}>{item.name}</Link>
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
                    <a className="navbar-brand" href="/">
                        <img className="secondary-sidebar-visualum-logo dashboard-logo"
                            src={Logo}
                            alt="Visualum logo" />
                        visualum
                    </a>
                    {dropDownItems}
                </div>
            </div>
        </nav>

    return (
        <div className="dashboard vh-100">
            {widthBigger ? <></> :
                <>
                    <div className='center-logo'>
                        <img className="secondary-sidebar-visualum-logo dashboard-logo"
                            src={Logo}
                            alt="Visualum logo" />
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