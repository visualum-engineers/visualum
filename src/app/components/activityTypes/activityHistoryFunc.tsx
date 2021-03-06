
import { updateActivityData } from "../../../redux/features/activityTypes/activitiesData";
import { resetPopUpOff } from "../../../redux/features/activityTypes/activitiesSettings";
export const resetHistory = ({
    dispatch,
    questionNum,
    newState
}:any) => {
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
}:any) =>{
    dispatch({type: "activities/data/undo"})
}
export const redoHistory = ({
    dispatch
}:any) =>{
    dispatch({type: "activities/data/redo"})
}