

const popUpBgStyles = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "calc(max(100%, 100vh))",
    zIndex: "2",
}
const PopUpBg = (props) =>{
    return (
        <div 
            className="d-flex justify-content-center align-items-center" 
            style={props.containerStyles ? props.containerStyles : popUpBgStyles}
        >
            <button 
                style={{...popUpBgStyles, backgroundColor: "rgba(0, 0, 0, 0.541)"}}
                aria-label={props.ariaLabel}
                onClick={props.onClick}
                onKeyDown = {props.onKeyDown}
                data-action-label = {props.ariaLabel}
            >
            </button>
            {props.children}
        </div>
    )
}
export default PopUpBg