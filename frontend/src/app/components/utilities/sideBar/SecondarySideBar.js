import NavItem from "../navItems/NavItems"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars, faTimes} from '@fortawesome/free-solid-svg-icons';

const Logo = "./images/VisualumLogo.png"

const SecondarySideBar = (props) =>{
    return (
    <>
        {props.exitSideBarBtn && <button 
            className={`secondary-exit-sidebar-btn`
                        + `${props.sidebarToggle ?" sidebar-open":" sidebar-close"}`
                        + ` ${props.exitSideBarBtnClass}`
                    } 
            aria-label="exit-sidebar"
            onClick={props.handleSideBar}
        >
            <FontAwesomeIcon 
                icon= {props.sidebarToggle ? faTimes : faBars}
            />
        </button>}
        
        <nav 
            aria-label ="sidebar" 
            aria-hidden ={!props.sidebarToggle}
            className={`d-flex flex-column sidebar-nav secondary-sidebar-nav `
                        + `${props.sidebarToggle ?"sidebar-right":"sidebar-left"}`
                        + `${props.customSidebarClass ? " "+props.customSidebarClass: ""}` 
                    }
        >
            {props.logo && <div className="secondary-sidebar-header d-flex justify-content-center align-items-center">
                    <a href="/" aria-hidden ={!props.sidebarToggle} tabIndex ={!props.sidebarToggle?"-1": "0"}>
                        <img className="secondary-sidebar-visualum-logo" 
                        src={Logo} 
                        alt="Visualum logo"/>
                    </a>
                    <a href="/" aria-hidden ={!props.sidebarToggle} tabIndex ={!props.sidebarToggle?"-1": "0"}>visualum</a>
                </div> 
            }
            
            <div className="secondary-sidebar-link-container d-flex flex-column">
                {props.data && props.data.map((navItem, index)=>{
                    return <NavItem 
                                key={index} 
                                navType = {navItem.type}
                                content={navItem.content} 
                                sidebar={"secondary"} 
                                customClass = {navItem.customClass}
                                hidden = {!props.sidebarToggle}
                                onClick={navItem.onClick}
                                url={navItem.type === "link" && navItem.url}
                        />
                })}
            </div>
            
            <div 
                className={`secondary-sidebar-footer d-flex flex-column align-items-center`
                + ` justify-content-${props.userProfile ? "start":"end"} `}
            >
                {props.footerData && props.footerData.map((navItem, index)=>{
                    return <NavItem 
                                key={index} 
                                navType = {navItem.type}
                                content={navItem.content} 
                                sidebar={"secondary"} 
                                customClass = {navItem.customClass}
                                hidden = {!props.sidebarToggle}
                                onClick={navItem.onClick}
                                url={navItem.type === "link" && navItem.url}
                        />
                })}
                {//add user profile if provided
                    props.userProfile
                }
            </div>
            
        </nav>
        
        {!props.windowWidth &&  
            <button 
                className={`sidebar-dark-bg fixed-top ${props.sidebarToggle ?"sidebar-bg-show":"sidebar-bg-hide"}`}
                aria-label="exit-sidebar"
                onClick={props.handleSideBar}
                aria-hidden ={!props.sidebarToggle}
                tabIndex = {!props.sidebarToggle?"-1": "0"}
            >
            </button>
        }    
    </>
    )
}
export default SecondarySideBar