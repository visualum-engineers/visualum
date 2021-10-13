import React, { useState } from 'react'
import Login from './LoginBtn';
import NavToggler from './NavTogglerBtn';
import NavItem from './NavItems';
import SearchBar from './SearchBar';
import useScrollPos from '../../hooks/use-scroll-pos';
//Navbar 
export default function Navbar(props) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const windowScrollY = useScrollPos()
    return (
        <>
            <div id="filter-navbar-container" className="navbar-expand-lg fixed-top">
                <nav 
                    id="navbar" 
                    className={
                            `navbar navbar-expand-lg 
                            ${props.sidebarToggle ? null: "sidebar-close"}
                            ${windowScrollY ? "navbarScrollActive": null}
                        `}>
                    <a href="/" className="companyTitle"> visualum </a>

                    {props.windowWidth ? null: <NavToggler />}
                    
                    <div id="navbarSupportedContent" className="collapse navbar-collapse">
                        <div className="navbar-nav w-100 justify-content-start">
                            <NavItem 
                                textContent={"Discover"} 
                                handleSideBar={props.handleSideBar}/>
                            <NavItem 
                                textContent={"Subjects"} 
                                handleSideBar={props.handleSideBar}/>
                            <NavItem textContent={"Help"} 
                                handleSideBar={props.handleSideBar}/>
                        </div>
                        <div className="navbar-nav w-100 justify-content-end">
                            <SearchBar />
                            <div className="d-flex justify-content-end align-self-stretch px-1 m-0">
                                <Login 
                                    windowWidth ={props.windowWidth}
                                    signedIn={true} 
                                    dropdownOpen={dropdownOpen} 
                                    toggleDropdownOpen={() => { setDropdownOpen(!dropdownOpen) }} 
                                    />
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}
