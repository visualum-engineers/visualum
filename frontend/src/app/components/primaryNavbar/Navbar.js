import React, { Fragment } from 'react'
import UserProfile from './UserProfile'
import NavToggler from './NavTogglerBtn';
// import SearchBar from './SearchBar';
import useScrollPos from '../../hooks/use-scroll-pos';

export default function Navbar(props) {

    const windowScrollY = useScrollPos()

    const { openSignIn } = props;

    //REPLACE THIS WITH AUTH LOGIC LATER
    const isSignedIn = false;

    const signIn =
        <Fragment>
            <button
                className="btn btn-primary btn-home-auth justify-content-end"
                onClick={openSignIn}
            >
                Sign In
            </button>
        </Fragment>

    return (
        <>
            <div
                id="filter-navbar-container"
                className="navbar-expand-lg fixed-top"
            >
                <nav
                    id="navbar"
                    className={`navbar home-page-nav navbar-expand-lg ${props.sidebarToggle ? null : "sidebar-close"} ${windowScrollY ? "navbarScrollActive" : ""}`}>
                    <img src='images/VisualumLogo.png' className='navbar-logo' alt='' />
                    <a href="/" className="nav-brand">
                        visualum
                    </a>
                    {props.windowWidth ? null : <NavToggler />}
                    <div id="navbarSupportedContent" className="collapse navbar-collapse home-page-nav">
                        <div className="navbar-nav w-100 justify-content-end">
                            <div className='nav-item'>
                                <button className='btn btn-about-us'>About Us</button>
                            </div>
                            <div className='nav-item'>
                                <div className='nav-divider' />
                            </div>
                            {/* <SearchBar /> */}
                            <div className="d-flex justify-content-end">
                                {isSignedIn ? <UserProfile /> : signIn}
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}
