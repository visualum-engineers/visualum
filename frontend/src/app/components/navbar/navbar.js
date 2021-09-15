import React, { useState, useEffect } from 'react'

import UserProfile from './UserProfile';


//NavToggler Icon
function NavIcon(props) {
    const { toggled } = props;
    return (
        <span id="nav-icon" className={`fa ${toggled ? 'fa-arrow-down' : 'fa-bars'}`} />
    )
}

//Button Components
function NavToggler() {
    const [toggled, setToggled] = useState(false);
    const [disabled, setDisabled] = useState(false);

    // Every time "disabled" changes, runs this callback.
    useEffect(() => {
        setTimeout(() => setDisabled(false), 160)
    }, [disabled]);

    const handleClick = () => {
        setToggled(currToggled => !currToggled);
        setDisabled(true);
    }
    return (
        <button
            disabled={disabled}
            id="nav-button"
            className="container-fluid navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="true"
            aria-label="Toggle navigation"
            onClick={handleClick}
        >
            <NavIcon toggled={toggled} />
        </button>
    )
}

function Login(props) {
    const { signedIn } = props;
    const [width,setWidth] = useState(window.innerWidth>=992)

    //handles resizing events that change
    useEffect(() => {
        const resize = () => {
            if(width && window.innerWidth<=991)setWidth(false)
            else if(!width && window.innerWidth>=992)setWidth(true)
        }
        window.addEventListener('resize', resize);

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", resize)
    }, [width]); 

    return (
        signedIn ? width ?
        <UserProfile rewardNum={200} dropdownOpen={props.dropdownOpen} toggleDropdownOpen={props.toggleDropdownOpen} /> : null
        : <button id={`sign${signedIn ? "Out" : "In"}-btn`} className="btn btn-outline-light btn-lg justify-content-end">
            {signedIn ? "Log out" : "Login"}
        </button>
    );
}

function SearchBar() {
    const [toggled, setToggle] = useState(false);
    const handleClick = () => {
        setToggle(currState => !currState);
    }
    return (
        <form id="search-box" className="form-inline d-flex justify-content-center mx-1">
            <input id="search-bar"
                className={`form-control mr-sm-2 shadow-none ${toggled && 'expand'}`}
                type="search"
                placeholder="Search"
                aria-label="Search" />
            <button id="search-btn" className="btn shadow-none" type="button" onClick={handleClick}>
                <span id="search-icon" className={`fa ${toggled ? 'fa-arrow-left' : 'fa-search'}`} />
            </button>
        </form>
    )
}

function NavItem(props) {
    return (
        <li className="nav-item flex-fill">
            {props.children}
        </li>
    );
}

//Entire Navbar 
export default function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const handleScroll = () => {
        if (window.scrollY > 50) {
            document.getElementById("navbar").classList.add("navbarScrollActive")
        } else {
            document.getElementById("navbar").classList.remove("navbarScrollActive")
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    
    return (
        <div id="filter-navbar-container" className="navbar-expand-lg fixed-top">
            <nav className="navbar navbar-expand-lg" id="navbar">
                <a href="#navbar" className="companyTitle"> visualum </a>
                <NavToggler />
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav flex-fill">
                        <NavItem>
                            <a className="nav-link mx-1" href="#navbar">Home</a>
                        </NavItem>
                        <NavItem>
                            <a className="nav-link mx-1" href="#navbar">Teacher</a>
                        </NavItem>
                        <NavItem>
                            <a className="nav-link mx-1" href="#navbar">Student</a>
                        </NavItem>
                        <NavItem>
                            <a className="nav-link mx-1" href="#navbar">About Us</a>
                        </NavItem>
                        <SearchBar />
                        <div className="d-flex justify-content-end signout-btn px-1 m-0">
                            <Login 
                                signedIn={true} 
                                dropdownOpen={dropdownOpen} 
                                toggleDropdownOpen={() => { setDropdownOpen(!dropdownOpen) }} 
                                />
                        </div>
                    </ul>
                </div>
            </nav>
        </div>
    )
}