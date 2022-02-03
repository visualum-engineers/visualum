
const MiniScreenSideBar = ({
    data = [],
    header,
    mediumWindowWidth, 
    smallWindowWidth,
}) =>{
    return (
        <div className="mini-screen-sidebar" style={{position: !mediumWindowWidth ? "relative": "fixed"}}>
            <div className="mini-screen-sidebar-header"> 
                {header}
            </div>
            
            <div className="mini-screen-slideshow-screens">
                {data.map((value) =>{
                    return (
                        <button key = {value.key} 
                            className="mini-screen-slide"
                        >
                            <div className="mini-screen-container">
                                {value.slide}
                            </div>
                            <div className="mini-screen-text-content">
                                {value.textContent}
                            </div>
                            <div className="mini-screen-drag-handle">
                                <svg viewBox="0 0 120 140">
                                    <line y1="25" y2="25" x1="5" x2="115"></line>
                                    <line y1="70" y2="70" x1="5" x2="115"></line>
                                    <line y1="115" y2 ="115" x1="5" x2="115"></line>
                                </svg>
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    ) 
}
export default MiniScreenSideBar