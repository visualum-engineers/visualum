import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { CSSTransition } from 'react-transition-group'
import { useNavigate } from 'react-router-dom';

export default function UserProfile(props) {
    const [isMouseOverButton, setIsMouseOverButton] = useState(false);
    const [isMouseOverMenu, setIsMouseOverMenu] = useState(false);
    const enterButton = () => {
        return setIsMouseOverButton(true);
    }

    const exitButton = () => {
        return setTimeout(() => {
            setIsMouseOverButton(false)
        }, 300)
    }
    const onClick = () => {
        if (!isMouseOverButton) enterButton()
        else exitButton()
    }

    const enterMenu = () => {
        setIsMouseOverMenu(true);
    }

    const exitMenu = () => {
        setTimeout(() => {
            setIsMouseOverMenu(false)
        }, 100)
    }

    const open = isMouseOverButton || isMouseOverMenu;
    return (
        <>
            <li className="nav-item flex-fill justify-content-center ">
                <button
                    className={`user ${open ? "user-active" : ""}`}
                    onClick={onClick}
                    onMouseLeave={exitButton}
                    onMouseEnter={enterMenu}
                >
                    <div className="user-profile">
                        <FontAwesomeIcon icon={faUser} className="user-icon" />
                    </div>
                    <div className="user-student-name">
                        Student User
                    </div>
                    {/* <div className="user-reward">
                        <FontAwesomeIcon icon={faStar} className="user-reward-icon" />
                        {props.rewardNum}
                    </div> */}
                </button>
            </li>
            <UserDropdown
                open={open}
                enterMenu={enterMenu}
                exitMenu={exitMenu}
            />
        </>
    );
}

function UserDropdown(props) {
    let navigate = useNavigate();

    const handleButtonClick = (val) => {
        navigate(`/${val}`)
    }
    return (
        <CSSTransition
            in={props.open}
            timeout={300}
            classNames="dropdown"
            unmountOnExit
        >
            <div className="user-dropdown" onMouseEnter={props.enterMenu} onMouseLeave={props.exitMenu}>
                <div className="user-dropdown-panel pe-0">
                    <div className="user-dropdown-assignment">
                        <button
                            style={{ "fontSize": "0.85em" }}
                            className="user-dropdown-button">Current Assignment
                        </button>
                        <button
                            style={{ "fontSize": "0.85em" }}
                            className="user-dropdown-button">Completion History
                        </button>
                    </div>
                    <div className="user-dropdown-connect">
                        <div className="user-dropdown-panel-header">Connect</div>
                        <button className="user-dropdown-button">
                            <FontAwesomeIcon icon={faInstagram} className="user-dropdown-social-icon" /> Instagram
                        </button>
                        <button className="user-dropdown-button">
                            <FontAwesomeIcon icon={faFacebook} className="user-dropdown-social-icon" /> Facebook
                        </button>
                        <button className="user-dropdown-button">
                            <FontAwesomeIcon icon={faTwitter} className="user-dropdown-social-icon" /> Twitter
                        </button>
                    </div>
                </div>
                <div className="user-dropdown-panel ps-0">
                    <button className="user-dropdown-button" onClick={() => handleButtonClick("dashboard")}>Dashboard</button>
                    <button className="user-dropdown-button">Activity</button>
                    <button className="user-dropdown-button">Redeem</button>
                    <button className="user-dropdown-button">Settings</button>
                    <button className="user-dropdown-button">Help</button>
                </div>
            </div>
        </CSSTransition>
    )
}
