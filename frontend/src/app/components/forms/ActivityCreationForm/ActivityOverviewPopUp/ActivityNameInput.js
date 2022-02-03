import { useReduxControlledTextInputs } from "../../../../hooks"
import { updateUnsavedActivityName } from "../../../../../redux/features/activityCreation/activityCreationData"
// import { useEffect } from "react"
// import removeAddedWhiteSpace from "../../../../helpers/removeWhiteSpace"
//import { useDispatch } from "react-redux"
const ActivityNameInput = () =>{
    const charLimit = 100
    const [activityName, onActivityNameChange] = useReduxControlledTextInputs({
        reduxUpdateFunc: updateUnsavedActivityName,
        selectorFunc: (state) => state.activityCreation.data.unsaved.activityName,
        inputType: "input",
        charLimit: charLimit
    })
    //const dispatch = useDispatch()
    // useEffect(() =>{
    //     const checkEmpty = () =>{
    //         if(removeAddedWhiteSpace(activityName).length <= 0){
    //             dispatch(updateUnsavedActivityName("Untitled"))
    //         }
    //     }
    //     checkEmpty()
    //     return () => checkEmpty()
    // }, [activityName, dispatch])
    
    return(
        <>
            <div className="activity-name-edit">
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
