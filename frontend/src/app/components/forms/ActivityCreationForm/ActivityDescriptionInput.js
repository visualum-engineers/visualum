import { updateActivityDescription } from "../../../../redux/features/activityCreation/activityCreationData"
import useReduxTextInputs from "../../../hooks/use-redux-text-inputs"
const ActivityDescription = () =>{
    const [activityDescription, onDescriptionChange] = useReduxTextInputs({
        reduxUpdateFunc: updateActivityDescription,
        selectorFunc: (state) => state.activityCreation.data.activityDescription,
        inputType: "textarea"
    })
    return(
        <textarea 
            value={activityDescription}
            onChange={onDescriptionChange}
        />
    )
}
export default ActivityDescription