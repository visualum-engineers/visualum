import React, { useState, useEffect } from 'react'

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

function SignIn(props) {
    const { signedIn } = props;
    const render = signedIn ?
        <UserProfile icon="😃" />
        : <button id={`sign${signedIn ? "Out" : "In"}-btn`} className="btn btn-outline-light btn-lg justify-content-end">
            {signedIn ? "Sign out" : "Sign in"}
        </button>
    return render;
}

function SearchBar() {
    const [toggled, setToggle] = useState(false);
    const handleClick = () => {
        setToggle(currState => !currState);
    }
    return (
        <form id="search-box" className="form-inline d-flex justify-content-center">
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

function UserProfile(props) {
    return (
        <li className="nav-item flex-fill">
            <a href="#" className="icon-button">
                {props.icon}
            </a>
        </li>
    );
}

//Entire Navbar 
export default function Navbar() {
    const handleScroll = () => {
        if (window.scrollY > 50) {
            document.getElementById("navbar").classList.add("navbar-scroll")
        } else {
            document.getElementById("navbar").classList.remove("navbar-scroll")
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    });
    return (
        <div id="filter-navbar-container" className="navbar-expand-lg fixed-top">
            <nav className="navbar navbar-expand-lg" id="navbar">
                <a href="#" className="title"> visualum </a>
                <NavToggler />
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav flex-fill">
                        <NavItem>
                            <a className="nav-link" href="#">Home</a>
                        </NavItem>
                        <NavItem>
                            <a className="nav-link" href="#">Teacher</a>
                        </NavItem>
                        <NavItem>
                            <a className="nav-link" href="#">Student</a>
                        </NavItem>
                        <NavItem>
                            <a className="nav-link" href="#">About Us</a>
                        </NavItem>
                        <SearchBar />
                        <div className="d-flex justify-content-end signout-btn">
                            <SignIn signedIn={true} />
                        </div>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
