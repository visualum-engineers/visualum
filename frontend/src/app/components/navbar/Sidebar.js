import NavItem from "./NavItems"
const SideBar = (props) =>{
    return (
    <>
        <div className={`sidebar-nav fixed-top ${props.sidebarToggle ?"sidebar-right":"sidebar-left"}`}>
            <div className="sidebar-link-container">
                {props.btnType=== "Discover"?
                    <>
                        <NavItem textContent={"Get Started"} sidebar={true} url={"/"}/>
                        <NavItem textContent={"Account Type"} sidebar={true} url={"/"}/>
                        <NavItem textContent={"Visualum News"} sidebar={true} url={"/"}/>
                        <NavItem textContent={"About Us"} sidebar={true} url={"/"}/>
                    </>
                :props.btnType==="Help" ?
                    <>
                        <NavItem textContent={"Help?"} sidebar={true} url={"/"}/>
                        <NavItem textContent={"Contact Us"} sidebar={true} url={"/"}/>
                        <NavItem textContent={"Common Questions"} sidebar={true} url={"/"}/>
                    </>
                :props.btnType==="Subjects" ? 
                    <p>Testing</p>
                :null} 
            </div>
            <button 
                className="exit-sidebar-btn" 
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
export default SideBar

/*

*/