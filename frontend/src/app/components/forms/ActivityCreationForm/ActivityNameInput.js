import useReduxTextInputs from "../../../hooks/use-redux-text-inputs"
import { updateActivityName } from "../../../../redux/features/activityCreation/activityCreationData"
const ActivityNameInput = () =>{
    const [activityName, onActivityNameChange] = useReduxTextInputs({
        reduxUpdateFunc: updateActivityName,
        selectorFunc: (state) => state.activityCreation.data.activityName,
        inputType: "input"
    })
    return(
        <>
            <input 
                placeholder="Activity Name"
                id = ""
                value = {activityName}
                onChange={onActivityNameChange}
            />
        </>
    )
}
export default ActivityNameInput
