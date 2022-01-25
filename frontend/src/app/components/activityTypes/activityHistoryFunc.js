
import { updateActivityData } from "../../../redux/features/activityTypes/activitiesData";
import { resetPopUpOff } from "../../../redux/features/activityTypes/activitiesSettings";
export const resetHistory = ({
    dispatch,
    questionNum,
    newState
}) => {
    dispatch(resetPopUpOff())
    //update current data in redux store
    dispatch(updateActivityData({
        type: "singleQuestionUpdate",
        questionNum: questionNum,
        data: newState
    }))
}

export const undoHistory = ({
    dispatch
}) =>{
    dispatch({type: "activities/data/undo"})
}
export const redoHistory = ({
    dispatch
}) =>{
    dispatch({type: "activities/data/redo"})
}