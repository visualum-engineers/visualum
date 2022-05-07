import MoreInfoBtn from "../../utilities/moreInfoBtn/MoreInfoBtn"
const LabelQuestionColumnTitle = (props: any) =>{
    return(
        <h2 className="label-pic-activity-column-titles">
            <span>Questions</span>
            <div className="label-pic-activity-instructions-position d-flex">
                <MoreInfoBtn 
                    textContent = "View Instructions"
                    customContainerClass = "label-pic-activity-instructions"
                    customContainerAriaLabel = "activity-instructions"
                    customDropDownID = "label-pic-activity-instructions"
                    setTimeoutOnMount = {!props.moreInfoBtn? 4000: 0}
                    onClick = {props.moreInfoOnClick}
                />
            </div>
        </h2>
    )
}

export default LabelQuestionColumnTitle