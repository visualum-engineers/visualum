import React from 'react'
import { useHistory } from 'react-router-dom';

export default function DashboardNav(props) {
    let history = useHistory();

    function handleClick() {
        history.push("/");
    }
    return (
        <nav className="navbar navbar-dark bg-light dashboard-nav">
            <div className="container-fluid">
                <a className="navbar-brand" href="#navbar">visualum</a>
                <div className="back-button-container">
                    <button className="btn back-button" onClick={handleClick}>
                        Back to Homepage
                    </button>
                </div>
            </div>
        </nav>
    )
}