import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
// import { useNavigate } from 'react-router-dom';

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
    // let navigate = useNavigate();

    // const handleButtonClick = (val) => {
    //     navigate(`/${val}`)
    // }
    return (
        <CSSTransition
            in={props.open}
            timeout={300}
            classNames="dropdown"
            unmountOnExit
        >
            <div className="user-dropdown" onMouseEnter={props.enterMenu} onMouseLeave={props.exitMenu}>

            </div>
        </CSSTransition>
    )
}
