import NavItem from "../navItems/NavItems"
const Logo = "./images/VisualumLogo.png"
const SecondarySideBar = (props) =>{
    return (
    <>
        <div className={`d-flex flex-column sidebar-nav secondary-sidebar-nav fixed-top ${props.sidebarToggle ?"sidebar-right":"sidebar-left"}`}>
            <div className="secondary-sidebar-header d-flex align-items-end justify-content-center">
                <img className="secondary-sidebar-visualum-logo" 
                    src={Logo} 
                    alt="Visualum logo"/>
                <a href="/">visualum</a>
            </div>
            <div className="secondary-sidebar-link-container d-flex flex-column align-items-center">
                {props.data.map((navItem, index)=>{
                    if(navItem.type ==="link") return <NavItem 
                            key={index} 
                            textContent={navItem.textContent} 
                            sidebar={"secondary"} 
                            url={navItem.url}
                            styles = {navItem.styles}
                        />
                    else return <NavItem
                            key={index}
                            textContent={navItem.textContent}
                            sidebar={"secondary"}
                            btn={true}
                            styles={navItem.styles}
                        /> 
                })}
                
            </div>
            <div className="secondary-sidebar-footer d-flex flex-column align-items-center justify-content-end flex-grow-1">
                <NavItem textContent={"Settings"} sidebar={"secondary"} url={"/"}/>
                <NavItem textContent={"Help Center"} sidebar={"secondary"} url={"/"}/>
            </div>
            
        </div>
        <button 
            className={`secondary-exit-sidebar-btn ${props.sidebarToggle ?"":"sidebar-close"}`} 
            aria-label="exit-sidebar"
            onClick={props.handleSideBar}>
            <i className={`fas fa-angle-${props.sidebarToggle ? "left":"right"}`}></i>
        </button>
        {!props.windowWidth ? 
            <button 
                className={`sidebar-dark-bg fixed-top ${props.sidebarToggle ?"sidebar-bg-show":"sidebar-bg-hide"}`}
                aria-label="exit-sidebar"
                onClick={props.handleSideBar}
            >
            </button>
            : null
        }    
    </>
    )
}
export default SecondarySideBar