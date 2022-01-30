import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import useScrollPos from '../../hooks/use-scroll-pos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { links } from './DropdownLinks'
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
    const [isMouseOverButton, setIsMouseOverButton] = useState(false);
    const [isMouseOverMenu, setIsMouseOverMenu] = useState(false);
    const windowScrollY = useScrollPos()

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
                    className={`user ${open ? "user-active" : ""} ${windowScrollY ? "navbarScrollActive" : ""}`}
                    onClick={onClick}
                    onMouseLeave={exitButton}
                    onMouseEnter={enterMenu}
                >
                    <div className="user-student-name">
                        Student User
                    </div>
                </button>
            </li>
            <UserDropdown
                open={open}
                enterMenu={enterMenu}
                exitMenu={exitMenu}
                type="teacher"
                windowScrollY={windowScrollY}
            />
        </>
    );
}

function UserDropdown(props) {
    let navigate = useNavigate();

    const handleButtonClick = (val) => {
        navigate(`/${val}`)
    }

    const values = links[props.type].map(link => {
        return (
            <button className='user-dropdown-button' onClick={() => handleButtonClick(link.value)}>
                <span className='user-dropdown-text'>{link.name}</span>
                <FontAwesomeIcon className='user-dropdown-icon' icon={link.icon} />
            </button>
        )
    })

    return (
        <CSSTransition
            in={props.open}
            timeout={300}
            classNames="dropdown"
            unmountOnExit
        >
            <div
                className={`user-dropdown ${props.windowScrollY ? "navbarScrollActive" : ""}`}
                onMouseEnter={props.enterMenu}
                onMouseLeave={props.exitMenu}
            >
                {values}
            </div>
        </CSSTransition>
    )
}
