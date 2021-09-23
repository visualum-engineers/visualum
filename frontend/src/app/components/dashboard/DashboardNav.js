import React from 'react'

export default function DashboardNav(props) {
    return (
        <nav className="navbar navbar-dark bg-light dashboard-nav">
            <div className="container-fluid">
                <a className="navbar-brand" href="#navbar">visualum</a>
                <div className="back-button-container">
                    <button className="btn back-button">
                        Go Back
                    </button>
                </div>
            </div>
        </nav>
    )
}