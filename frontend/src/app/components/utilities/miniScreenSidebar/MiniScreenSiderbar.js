const MiniScreenSideBar = ({
    data = [],
    header,
    mediumWindowWidth, 
    smallWindowWidth,
}) =>{
    console.log(data)
    return (
        <div className="mini-screen-sidebar" style={{position: !mediumWindowWidth ? "relative": "fixed"}}>
            <div className="mini-screen-sidebar-header"> 
                {header}
            </div>
            
            <div className="mini-screen-slideshow-screens">
                {data.map((value) =>{
                    return (
                        <div className="mini-screen-slide">
                            <div className="mini-screen-container">
                                {value.slide}
                            </div>
                            <div className="mini-screen-textContent">
                                {value.textContent}
                            </div>
                            <div className="dragHandle">

                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    ) 
}
export default MiniScreenSideBar