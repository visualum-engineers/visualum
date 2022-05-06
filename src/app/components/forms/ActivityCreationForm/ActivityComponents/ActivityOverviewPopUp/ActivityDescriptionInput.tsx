import { updateUnsavedActivityDescription } from "../../../../../../redux/features/activityCreation/activityCreationData"
import { useReduxControlledTextInputs } from "../../../../../hooks"
const ActivityDescription = () =>{
    const charLimit = 1000
    const [activityDescription, onDescriptionChange] = useReduxControlledTextInputs({
        reduxUpdateFunc: updateUnsavedActivityDescription,
        selectorFunc: (state) => state.activityCreation.data.unsaved.activityDescription,
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