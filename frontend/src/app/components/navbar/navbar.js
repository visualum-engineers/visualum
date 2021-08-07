import React, { Component } from 'react'

//NavToggler Icon
class NavIcon extends Component {
    render() {
        const { toggled } = this.props;
        return (
            <span id="nav-icon" className={`fa ${toggled ? 'fa-arrow-down' : 'fa-bars'}`} />
        )
    }
}

//Button Components
class NavToggler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggled: false,
            disabled: false
        };
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState(state => (
            { disabled: true, toggled: !state.toggled }
        ), () => setTimeout(() => {
            this.setState(() => (
                { disabled: false, }
            ))
        }, 160));
    }
    render() {
        const { disabled, toggled } = this.state;
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
                onClick={this.handleClick}
            >
                <NavIcon toggled={toggled} />
            </button>
        )
    }
}

class Login extends Component {
    render() {
        const { signedIn } = this.props;
        return (
            <button id={`sign${signedIn ? "Out" : "In"}-btn`} className="btn btn-outline-light btn-lg">
                {signedIn ? "Log Out" : "Login"}
            </button>
        )
    }
}

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggled: false
        };
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        this.setState(state => ({
            toggled: !state.toggled
        }))
    }
    render() {

        const { toggled } = this.state;
        return (
            <form id="search-box" className="form-inline d-flex justify-content-center p-0 mx-1">
                <input id="search-bar"
                    className={`form-control mr-sm-2 shadow-none ${toggled && 'expand'}`}
                    type="search"
                    placeholder="Search"
                    aria-label="Search" />
                <button id="search-btn" className="btn shadow-none" type="button" onClick={this.handleClick}>
                    <span id="search-icon" className={`fa ${toggled ? 'fa-arrow-left' : 'fa-search'}`} />
                </button>
            </form>
        )
    }
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
export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);

    }
    handleScroll() {
        if (window.scrollY > 50) {
            document.getElementById("navbar").classList.add("navbarScrollActive")
        } else {
            document.getElementById("navbar").classList.remove("navbarScrollActive")
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    render() {
        return (
            <div id="filter-navbar-container" className="navbar-expand-lg fixed-top">
                <nav className="navbar navbar-expand-lg" id="navbar">
                    <a href="#" className="companyTitle"> visualum </a>
                    <NavToggler/>
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
                            <div className="d-flex justify-content-end signout-btn px-1 m-0">
                                <Login />
                            </div>
                            <SearchBar />
                        </ul>
                        {/* <UserProfile icon="😃" /> */}
                    </div>
                </nav>
            </div>
        )
    }
}
