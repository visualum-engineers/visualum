const NavItem = ({sidebar=false, url=false, handleSideBar=false, btn=false, textContent, styles=false}) =>{  
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
                        href={url}>
                            <p>{textContent}</p>
                    </a>
                    :
                    <button
                        className={styles ? styles : ""}
                        aria-label={textContent}
                    >
                        <p>{textContent}</p>
                    </button>
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