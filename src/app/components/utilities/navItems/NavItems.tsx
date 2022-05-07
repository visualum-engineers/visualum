const NavItem = ({
    sidebar=false, 
    url=false, 
    handleSideBar=false, 
    btn=false, 
    content, 
    customClass=false, 
    ariaLabel=false, 
    hidden="false",
    onClick,
    navType
}: any) =>{  
    const navTypes: any = {
        link: <a
                className={`${sidebar === "primary" ? "primary":"secondary"}-sidebar-link ${customClass? customClass:""}`} 
                aria-label={ariaLabel ? ariaLabel: null}
                href={url}
                aria-hidden = {hidden}
                tabIndex={hidden ? -1:0}
            >
                    <span className="nav-item-text">{content}</span>
            </a>,
        btn: <button
                className={customClass ? customClass : ""}
                aria-label={ariaLabel ? ariaLabel: null}
                data-action-label ={ariaLabel ? ariaLabel : null}
                aria-hidden = {hidden}
                tabIndex={hidden ? -1:0}
                onClick={onClick}
            >
                <span className="nav-item-text">{content}</span>
            </button>,
        custom: content,
    }
    return(
        <>
            {sidebar ? navTypes[navType]
                //when btn, or custom el parameter is not provided, we default to links
                //if not we provide a button 
                //both accept custom classes
            : <button 
                className="nav-btn home-page-nav mx-1" 
                aria-label={ariaLabel ? ariaLabel: null}
                onClick={handleSideBar}
                aria-hidden = {hidden}
                tabIndex={hidden ? -1:0}

            >
                    <span className="nav-item-text">{content}</span>
            </button>
            }
        </>
    )
}
export default NavItem