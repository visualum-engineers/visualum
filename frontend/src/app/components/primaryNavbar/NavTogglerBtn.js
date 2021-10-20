import React, { useState, useEffect } from 'react'
//NavToggler Icon
function NavIcon(props) {
    const { toggled } = props;
    return (
        <span id="nav-icon" className={`fa ${toggled ? 'fa-arrow-down' : 'fa-bars'}`} />
    )
}

//Button Components
const NavToggler = () => {
    const [toggled, setToggled] = useState(false);
    const [disabled, setDisabled] = useState(false);

    // Every time "disabled" changes, runs this callback.
    useEffect(() => {
        setTimeout(() => setDisabled(false), 160)
    }, [disabled]);

    const handleClick = () => {
        setToggled(currToggled => !currToggled);
        setDisabled(true);
    }
    return (
        <button
            disabled={disabled}
            id="nav-toggler"
            className="container-fluid navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="true"
            aria-label="Toggle navigation"
            onClick={handleClick}
        >
            <NavIcon toggled={toggled} />
        </button>
    )
}
export default NavToggler