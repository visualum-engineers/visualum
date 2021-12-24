import NavItem from "../navItems/NavItems"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleQuestion} from '@fortawesome/free-regular-svg-icons';
import {faCog} from '@fortawesome/free-solid-svg-icons';

const Logo = "./images/VisualumLogo.png"
const settingsLink = <>
    <span className="icon-container"><FontAwesomeIcon icon = {faCog}/></span>
    <span className="ms-1">Settings</span>
</>
const helpLink = <>
    <span className="icon-container"><FontAwesomeIcon icon = {faCircleQuestion}/></span>
    <span className="ms-1">Help Center</span>
</>
const SecondarySideBar = (props) =>{
    return (
    <>
        <div 
                aria-label ="sidebar" 
                className={`${props.sidebarToggle ?"sidebar-right":"sidebar-left"}${props.customSidebarClass ? " "+props.customSidebarClass: ""} d-flex flex-column sidebar-nav secondary-sidebar-nav fixed-top`}
                aria-hidden ={!props.sidebarToggle}
            >
        
            <div className="secondary-sidebar-header d-flex justify-content-center align-items-center">
                <a href="/" aria-hidden ={!props.sidebarToggle} tabIndex ={!props.sidebarToggle?"-1": "0"}>
                    <img className="secondary-sidebar-visualum-logo" 
                        src={Logo} 
                        alt="Visualum logo"/>
                </a>
                <a href="/" aria-hidden ={!props.sidebarToggle} tabIndex ={!props.sidebarToggle?"-1": "0"}>visualum</a>
            </div>
            <div className="secondary-sidebar-link-container d-flex flex-column align-items-center">
                {props.data.map((navItem, index)=>{
                    if(navItem.type ==="link") return <NavItem 
                            key={index} 
                            textContent={navItem.textContent} 
                            sidebar={"secondary"} 
                            url={navItem.url}
                            styles = {navItem.styles}
                            hidden = {!props.sidebarToggle}
                        />
                    else return <NavItem
                            key={index}
                            textContent={navItem.textContent}
                            sidebar={"secondary"}
                            btn={true}
                            styles={navItem.styles}
                            hidden ={!props.sidebarToggle}
                        /> 
                })}
                
            </div>
            <div className="secondary-sidebar-footer d-flex flex-column align-items-center justify-content-end flex-grow-1">
                <NavItem 
                    textContent={settingsLink} 
                    sidebar={"secondary"} 
                    url={"/"} 
                    hidden = {!props.sidebarToggle} 
                    styles={`${props.customFooterLinkClass}`}
                />
                <NavItem 
                    textContent={helpLink} 
                    sidebar={"secondary"} 
                    url={"/"} 
                    hidden = {!props.sidebarToggle} 
                    styles={`${props.customFooterLinkClass}`}
                />
            </div>
            
        </div>
        <button 
            className={`secondary-exit-sidebar-btn${props.sidebarToggle ?"":" sidebar-close"}`} 
            aria-label="exit-sidebar"
            onClick={props.handleSideBar}>
            <i className={`fas fa-angle-${props.sidebarToggle ? "left":"right"}`}></i>
        </button>
        {!props.windowWidth ? 
            <button 
                className={`sidebar-dark-bg fixed-top ${props.sidebarToggle ?"sidebar-bg-show":"sidebar-bg-hide"}`}
                aria-label="exit-sidebar"
                onClick={props.handleSideBar}
                aria-hidden ={!props.sidebarToggle}
                tabIndex = {!props.sidebarToggle?"-1": "0"}
            >
            </button>
            : null
        }    
    </>
    )
}
export default SecondarySideBar