const ActivityPopUp = (props) =>{
    return (
        <div className="d-flex justify-content-center align-items-center activity-popup-dark-bg">
            <button 
                className={props.btnClassName} 
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
export default ActivityPopUp