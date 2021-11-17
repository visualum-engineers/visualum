import NavItem from "../navItems/NavItems"
import useScrollPos from "../../hooks/use-scroll-pos"
const PrimarySideBar = (props) =>{
    const windowScrollY = useScrollPos()
    return (
    <>
        <div className={`sidebar-nav fixed-top primary-sidebar-nav ${props.sidebarToggle ?"sidebar-right":"sidebar-left"}`}>
            <div className={`primary-sidebar-link-container ${windowScrollY? "sidebarScrollActive":""}`}>
                {props.btnType=== "Discover"?
                    <>
                        <NavItem textContent={"Get Started"} sidebar={"primary"} url={"/"}/>
                        <NavItem textContent={"Account Type"} sidebar={"primary"} url={"/"}/>
                        <NavItem textContent={"Visualum News"} sidebar={"primary"} url={"/"}/>
                        <NavItem textContent={"About Us"} sidebar={"primary"} url={"/"}/>
                    </>
                :props.btnType==="Help" ?
                    <>
                        <NavItem textContent={"Help?"} sidebar={"primary"} url={"/"}/>
                        <NavItem textContent={"Contact Us"} sidebar={"primary"} url={"/"}/>
                        <NavItem textContent={"Common Questions"} sidebar={"primary"} url={"/"}/>
                    </>
                :props.btnType==="Subjects" ? 
                    <p>Testing</p>
                :null} 
            </div>
            <button 
                className="primary-exit-sidebar-btn" 
                aria-label="exit-sidebar"
                onClick={props.handleSideBar}>
                <i className="fas fa-angle-left"></i>

            </button>
        </div>
        <button 
            className={`sidebar-dark-bg fixed-top ${props.sidebarToggle ?"sidebar-bg-show":"sidebar-bg-hide"}`}
            aria-label="exit-sidebar"
            onClick={props.handleSideBar}
            >
        </button>
    </>
    )
}
export default PrimarySideBar
