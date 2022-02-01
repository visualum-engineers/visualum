import React, { useState } from 'react'
import Login from './LoginBtn';
import NavToggler from './NavTogglerBtn';
import NavItem from '../utilities/navItems/NavItems';
import SearchBar from './SearchBar';
import useScrollPos from '../../hooks/use-scroll-pos';
export default function Navbar(props) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const windowScrollY = useScrollPos()
    console.log('inside navbar. props:', props)

    return (
        <>
            <div
                id="filter-navbar-container"
                className="navbar-expand-lg fixed-top"
            >
                <nav
                    id="navbar"
                    className={
                        `navbar home-page-nav navbar-expand-lg 
                            ${props.sidebarToggle ? null : "sidebar-close"}
                            ${windowScrollY ? "navbarScrollActive" : ""}
                        `}>
                    <a href="/" className="nav-brand">
                        visualum
                    </a>

                    {props.windowWidth ? null : <NavToggler />}

                    <div id="navbarSupportedContent" className="collapse navbar-collapse home-page-nav">
                        <div className="navbar-nav w-100 justify-content-start">
                            <NavItem
                                textContent={"Discover"}
                                handleSideBar={props.handleSideBar} />
                            <NavItem
                                textContent={"Subjects"}
                                handleSideBar={props.handleSideBar} />
                            <NavItem textContent={"Help"}
                                handleSideBar={props.handleSideBar} />
                        </div>
                        <div className="navbar-nav w-100 justify-content-end">
                            <SearchBar />
                            <div className="d-flex justify-content-end align-self-stretch m-0">
                                <Login
                                    windowWidth={props.windowWidth}
                                    signedIn={false}
                                    dropdownOpen={dropdownOpen}
                                    toggleDropdownOpen={() => { setDropdownOpen(!dropdownOpen) }}
                                    openSignUp={props.openSignUp}
                                />
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}
