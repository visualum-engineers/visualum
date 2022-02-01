import useReduxTextInputs from "../../../hooks/use-redux-text-inputs"
import { updateActivityName } from "../../../../redux/features/activityCreation/activityCreationData"
const ActivityNameInput = () =>{
    const charLimit = 100
    const [activityName, onActivityNameChange] = useReduxTextInputs({
        reduxUpdateFunc: updateActivityName,
        selectorFunc: (state) => state.activityCreation.data.present.activityName,
        inputType: "input",
        charLimit: charLimit
    })
    return(
        <>
            <div className="activity-name-edit ">
                <label htmlFor="activity-name-edit">Activity Name</label>
                <input 
                    placeholder="Name"
                    id = "activity-name-edit"
                    value = {activityName}
                    onChange={onActivityNameChange}
                    autoFocus
                />
                <div
                    className="activity-name-edit-limit"
                >
                    <span>{charLimit - activityName.length} characters remaining</span>
                </div>
            </div>
        </>
    )
}
export default ActivityNameInput
