const NavItem = ({sidebar=false, url=false, handleSideBar=false, textContent}) =>{  
    return (
        <>
            {sidebar ?
                <a
                    className="sidebar-link" 
                    aria-label={textContent}
                    href={url}>
                        <p>{textContent}</p>
                </a>      
                :
                <button 
                    className="nav-btn home-page-nav mx-1" 
                    aria-label={textContent}
                    onClick={handleSideBar}>
                        <p>{textContent}</p>
                </button>
            }
        </>
    )
}
export default NavItem