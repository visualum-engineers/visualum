const NavItem = ({sidebar=false, url=false, handleSideBar=false, btn=false, textContent, styles=false, hidden="false"}) =>{  
    return (
        <>
            {sidebar ? 
                //when btn parameter is not provided, we default to links
                //if not we provide a button 
                //both accept custom classes
                !btn ? 
                    <a
                        className={`${sidebar === "primary" ? "primary":"secondary"}-sidebar-link ${styles? styles:""}`} 
                        aria-label={textContent}
                        href={url}
                        aria-hidden = {hidden}
                        tabIndex={`${hidden ? "-1":"0"}`}
                    >
                            <span>{textContent}</span>
                    </a>
                    :
                    <button
                        className={styles ? styles : ""}
                        aria-label={textContent}
                        aria-hidden = {hidden}
                        tabIndex={`${hidden ? "-1":"0"}`}
                    >
                        <span>{textContent}</span>
                    </button>
                :
                <button 
                    className="nav-btn home-page-nav mx-1" 
                    aria-label={textContent}
                    onClick={handleSideBar}
                    aria-hidden = {hidden}
                    tabIndex={`${hidden ? "-1":"0"}`}
                >
                        <span>{textContent}</span>
                </button>
            }
        </>
    )
}
export default NavItem