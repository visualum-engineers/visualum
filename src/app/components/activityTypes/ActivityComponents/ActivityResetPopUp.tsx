import PopUpBg from "../../utilities/popUp/PopUpBackground";
const ActivityResetPopUp = (props: any) => {
    return (
        <PopUpBg
            ariaLabel="exit-reset-question"
            onClick={props.onClick}
            containerStyles = {props.popUpBgStyles}
        > 
            <div className="activity-reset-popup col-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                <h2 className="resetQuestion"> {`You will lose your answers and progress to this question. Do you want to continue?`}</h2>
                <div className="reset-popup-btn-container d-flex w-100 justify-content-center">
                    <button 
                        className="btn btn-danger"
                        data-btn-id = "yes"
                        onClick = {props.onClick}
                        aria-label = "confirm-reset-question"
                        data-action-label = "confirm-reset-question"
                    > Reset
                    </button>
                    <button 
                        className ="btn reset-cancel-btn"
                        data-btn-id = "no"
                        onClick = {props.onClick}
                        aria-label = "exit-reset-question"
                        data-action-label = "exit-reset-question"
                        autoFocus
                    > Cancel
                    </button>
                </div>
            </div>
        </PopUpBg>
    )
}
export default ActivityResetPopUp