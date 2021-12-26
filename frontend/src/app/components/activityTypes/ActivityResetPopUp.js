import ActivityPopUp from "./ActivityPopUp";
const ActivityResetPopUp = (props) => {
    return (
        <ActivityPopUp
            btnClassName="activity-popup-bg-exit-btn" 
            ariaLabel="exit-reset-question"
            onClick={props.onClick}
            onKeyDown={props.onClick}
        > 
            <div className="activity-reset-popup d-flex justify-content-center align-items-center flex-column col-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                <h2 className="resetQuestion"> This will reset your answers to the current question. Do you want to reset?</h2>
                <div className="reset-popup-btn-container">
                    <button 
                        className="btn btn-success"
                        data-btn-id = "yes"
                        onClick = {props.onClick}
                        onKeyDown = {props.onKeyDown}
                        aria-label = "confirm-reset-question"
                        data-action-label = "confirm-reset-question"
                    > Yes 
                    </button>
                    <button 
                        className ="btn btn-danger"
                        data-btn-id = "no"
                        onClick = {props.onClick}
                        onKeyDown = {props.onKeyDown}
                        aria-label = "exit-reset-question"
                        data-action-label = "exit-reset-question"
                    > No 
                    </button>
                </div>
            </div>
        </ActivityPopUp>
    )
}
export default ActivityResetPopUp