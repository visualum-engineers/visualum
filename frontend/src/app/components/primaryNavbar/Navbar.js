import React, { useState } from 'react'
import UserProfile from './UserProfile'
import NavToggler from './NavTogglerBtn';
import SearchBar from './SearchBar';
import useScrollPos from '../../hooks/use-scroll-pos';

export default function Navbar(props) {

    const windowScrollY = useScrollPos()

    const { openSignIn, openSignUp } = props;

    //REPLACE THIS WITH AUTH LOGIC LATER
    const [isSignedIn, setIsSignedIn] = useState(false);
    return (
        <>
            <div
                id="filter-navbar-container"
                className="navbar-expand-lg fixed-top"
            >
                <nav
                    id="navbar"
                    className={`navbar home-page-nav navbar-expand-lg ${props.sidebarToggle ? null : "sidebar-close"} ${windowScrollY ? "navbarScrollActive" : ""}`}>
                    <a href="/" className="nav-brand">
                        visualum
                    </a>
                    {props.windowWidth ? null : <NavToggler />}
                    <div id="navbarSupportedContent" className="collapse navbar-collapse home-page-nav">
                        <div className="navbar-nav w-100 justify-content-end">
                            <SearchBar />
                            <div className="d-flex justify-content-end">
                                {isSignedIn ? <UserProfile /> :
                                    <>
                                        <button
                                            className="btn btn-primary btn-home-auth justify-content-end me-2"
                                            onClick={openSignUp}
                                        >
                                            Sign Up
                                        </button>
                                        <button
                                            className="btn btn-primary btn-home-auth justify-content-end"
                                            onClick={openSignIn}
                                        >
                                            Log In
                                        </button>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}
