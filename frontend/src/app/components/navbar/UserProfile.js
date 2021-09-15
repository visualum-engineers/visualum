import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faUser, faStar } from '@fortawesome/free-solid-svg-icons'
import { CSSTransition } from 'react-transition-group'


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
    const onClick = () =>{
        if(!isMouseOverButton) enterButton()
        else  exitButton()
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
                <div
                    className={`user ${open ? "user-active" : ""}`}
                    onClick={onClick}
                    onMouseLeave={exitButton}
                >
                    <div className="user-profile">
                        <FontAwesomeIcon icon={faUser} className="user-icon" />
                    </div>
                    <div className="user-reward">
                        <FontAwesomeIcon icon={faStar} className="user-reward-icon" />
                        {props.rewardNum}
                    </div>
                </div>
            </li>
            <UserDropdown open={open} enterMenu={enterMenu} exitMenu={exitMenu} />
        </>
    );
}

function UserDropdown(props) {
    return (
        <CSSTransition
            in={props.open}
            timeout={400}
            classNames="dropdown"
            unmountOnExit
        >
            <div className="user-dropdown" onMouseEnter={props.enterMenu} onMouseLeave={props.exitMenu}>
                <div className="user-dropdown-panel">
                    <div className="user-dropdown-assignment">
                        <div style={{"fontSize":"0.85em"}}className="user-dropdown-button">Current Assignment</div>
                        <div style={{"fontSize":"0.85em"}}className="user-dropdown-button">Completion History</div>
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
