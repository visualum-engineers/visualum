import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faStar } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { CSSTransition } from 'react-transition-group'

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
    const render = signedIn ?
        <UserProfile rewardNum={200} dropdownOpen={props.dropdownOpen} toggleDropdownOpen={props.toggleDropdownOpen} />
        : <button id={`sign${signedIn ? "Out" : "In"}-btn`} className="btn btn-outline-light btn-lg justify-content-end">
            {signedIn ? "Log out" : "Login"}
        </button>
    return render;
}

function UserProfile(props) {
    {
        return (
            <>
                <li className="nav-item flex-fill justify-content-center ">
                    <div className={`user ${props.dropdownOpen ? "user-active" : ""}`} onClick={props.toggleDropdownOpen}>
                        <div className="user-profile">
                            <FontAwesomeIcon icon={faUser} className="user-icon" />
                        </div>
                        <div className="user-reward">
                            <FontAwesomeIcon icon={faStar} className="user-reward-icon" />
                            {props.rewardNum}
                        </div>
                    </div>
                </li>
                <UserDropdown dropdownOpen={props.dropdownOpen} />
            </>
        );

    }
}

function UserDropdown(props) {
    return (
        <CSSTransition
            in={props.dropdownOpen}
            timeout={250}
            classNames="dropdown"
            unmountOnExit
        >
            <div className="user-dropdown">
                <div className="user-dropdown-panel">
                    <div className="user-dropdown-assignment">
                        <div className="user-dropdown-button">Current Assignment</div>
                        <div className="user-dropdown-button">Completion History</div>
                    </div>
                    <div className="user-dropdown-connect">
                        <div className="user-dropdown-panel-header">Connect</div>
                        <div className="user-dropdown-button">
                            <FontAwesomeIcon icon={faInstagram} className="user-dropdown-social-icon" /> Instagram
                        </div>
                        <div className="user-dropdown-button">
                            <FontAwesomeIcon icon={faFacebook} className="user-dropdown-social-icon" /> Facebook
                        </div>
                        <div className="user-dropdown-button">
                            <FontAwesomeIcon icon={faTwitter} className="user-dropdown-social-icon" /> Twitter
                        </div>
                    </div>
                </div>
                <div className="user-dropdown-panel">
                    <div className="user-dropdown-button">Activity</div>
                    <div className="user-dropdown-button">Redeem</div>
                    <div className="user-dropdown-button">Store</div>
                    <div className="user-dropdown-button">Settings</div>
                    <div className="user-dropdown-button">Help</div>
                </div>
            </div>
        </CSSTransition>
    )
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
    });
    return (
        <div id="filter-navbar-container" className="navbar-expand-lg fixed-top">
            <nav className="navbar navbar-expand-lg" id="navbar">
                <a href="#" className="companyTitle"> visualum </a>
                <NavToggler />
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav flex-fill">
                        <NavItem>
                            <a className="nav-link mx-1" href="#">Home</a>
                        </NavItem>
                        <NavItem>
                            <a className="nav-link mx-1" href="#">Teacher</a>
                        </NavItem>
                        <NavItem>
                            <a className="nav-link mx-1" href="#">Student</a>
                        </NavItem>
                        <NavItem>
                            <a className="nav-link mx-1" href="#">About Us</a>
                        </NavItem>
                        <SearchBar />
                        <div className="d-flex justify-content-end signout-btn px-1 m-0">
                            <Login signedIn={true} dropdownOpen={dropdownOpen} toggleDropdownOpen={() => { setDropdownOpen(!dropdownOpen) }} />
                        </div>
                    </ul>
                </div>
            </nav>
        </div>
    )
}