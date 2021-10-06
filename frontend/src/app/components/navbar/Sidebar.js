const SideBar = (props) =>{
    return (
        <>
        <div className={`sidebar-nav fixed-top ${props.sidebarToggle ?"sidebar-right":"sidebar-left"}`}>

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