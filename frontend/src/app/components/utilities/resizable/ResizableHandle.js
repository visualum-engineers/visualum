const ResizableHande = ({
    customClass,
    onResizeStartWrapper, 
    handleType
}) =>{
    let handleClass
    switch(handleType){
        case "N":
            handleClass = "d-flex align-items-center north-handle"
            break;  
        case "S": 
            handleClass = "d-flex align-items-center south-handle"
            break
        case "W": 
            handleClass = "d-flex align-items-center west-handle"
            break;
        case "E": 
            handleClass = "d-flex align-items-center east-handle"
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