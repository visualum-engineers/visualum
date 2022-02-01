import { updateActivityDescription } from "../../../../redux/features/activityCreation/activityCreationData"
import useReduxTextInputs from "../../../hooks/use-redux-text-inputs"
const ActivityDescription = () =>{
    const charLimit = 1000
    const [activityDescription, onDescriptionChange] = useReduxTextInputs({
        reduxUpdateFunc: updateActivityDescription,
        selectorFunc: (state) => state.activityCreation.data.present.activityDescription,
        inputType: "textarea",
        charLimit: 1000
    })
    return(

        <div 
            className="activity-creation-activity-description-edit"
        >
            <label htmlFor="activity-creation-activity-description-edit">
                Activity Description
            </label>
            <div
                className="description-edit-textarea"
                data-replicated-value = {activityDescription}
            >
                <textarea
                    id = "activity-creation-activity-description-edit" 
                    value={activityDescription}
                    onChange={onDescriptionChange}
                />
            </div>
            <div
                className="activity-description-edit-limit"
            >
                <span>{charLimit - activityDescription.length} characters remaining</span>
            </div>
        </div>
        
    )
}
export default ActivityDescription