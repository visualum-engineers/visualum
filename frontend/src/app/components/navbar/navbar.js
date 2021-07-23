import React, { Component } from 'react'

//NavToggler Icon
class NavIcon extends Component {
    render() {
        if (this.props.toggled) {
            return (
                <span id="nav-icon" className="fa fa-arrow-down"></span>
            )
        } else {
            return (
                <span id="nav-icon" className="fa fa-bars"></span>
            )
        }
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
        this.setState(state => ({
            disabled: true,
            toggled: !state.toggled,
        }))
        setTimeout(() => {
            this.setState(() => ({
                disabled: false,
            }));
        }, 160);
    }
    render() {
        return (
            <button disabled={this.state.disabled} id="nav-button" className="container-fluid navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation" onClick={this.handleClick}>
                <NavIcon toggled={this.state.toggled} />
            </button>
        )
    }
}

class SignIn extends Component {
    render() {
        const { signedIn } = this.props;
        return (
            <button id={`sign${signedIn ? "Out" : "In"}-btn`} className="btn btn-outline-light btn-lg justify-content-end">
                {signedIn ? "Sign out" : "Sign in"}
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
            <form id="search-box" className="form-inline d-flex justify-content-center">
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


//Entire Navbar 
export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);

    }
    handleScroll() {
        if (window.scrollY > 50) {
            document.getElementById("navbar").classList.add("navbar-scroll")
        } else {
            document.getElementById("navbar").classList.remove("navbar-scroll")
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
                    <a href="#" className="title"> visualum </a>

                    <NavToggler />

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav flex-fill">
                            <li className="nav-item flex-fill">
                                <a className="nav-link" href="#">Home</a>
                            </li>

                            <li className="nav-item flex-fill">
                                <a className="nav-link" href="#">Teacher</a>
                            </li>
                            <li className="nav-item flex-fill">
                                <a className="nav-link" href="#">Student</a>
                            </li>
                            <li className="nav-item flex-fill">
                                <a className="nav-link" href="#">About Us</a>
                            </li>

                            <div className="d-flex justify-content-end signout-btn">
                                <SignIn />
                            </div>

                            <SearchBar />

                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}
