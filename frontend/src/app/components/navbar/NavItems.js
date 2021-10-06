const NavItem = (props) =>{    
    return (
    <button 
        className="nav-btn mx-2" 
        aria-label={props.textContent}
        onClick={props.openSideBar}>
            {props.textContent}
    </button>)
}
export default NavItem