const ResizableHande = ({
    customClass,
    onResizeStartWrapper, 
    handleType
}) =>{
    let handleClass
    switch(handleType){
        case "N":
            handleClass = "north-handle"
            break;  
        case "S": 
            handleClass = "south-handle"
            break
        case "W": 
            handleClass = "west-handle"
            break;
        case "E": 
            handleClass = "east-handle"
            break;
        default:
            handleClass = ""
            break
    } 
    return(
        <button
            className={`resizable-handle ${handleClass}${customClass? " "+customClass: ""}`}
            onMouseDown={onResizeStartWrapper}
            onTouchStart={onResizeStartWrapper}
            
        >
            <div className='handle-icon'><span className='inner-handle'></span></div>
        </button>
    )
    
}
export default ResizableHande