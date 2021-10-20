import React from 'react'
import { useHistory } from 'react-router-dom';

export default function SlimNav(props) {
    let history = useHistory();

    function handleClick() {
        history.push("/");
    }
    return (
        <nav className={`navbar-dark bg-light d-flex justify-content-between align-items-center ${props.type}`}>
                <div className="navbar-brand" onClick={handleClick}>visualum</div>
                <div className="back-button-container">
                    <button className="btn back-button" onClick={handleClick}>
                        Back to Homepage
                    </button>
                </div>
        </nav>
    )
}