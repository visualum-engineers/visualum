import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function SlimNav(props: any) {
    let navigate = useNavigate();

    function handleClick() {
        navigate("/")
    }
    return (
        <nav className={`navbar-dark bg-light d-flex justify-content-between align-items-center ${props.type}`}>
                <div className="navbar-brand" onClick={handleClick} tabIndex={0}>visualum</div>
                <div className="back-button-container">
                    <button className="btn back-button" onClick={handleClick}>
                        Back to Homepage
                    </button>
                </div>
        </nav>
    )
}
