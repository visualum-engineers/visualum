
import { updateQuestionData } from "../../../../redux/features/activityCreation/activityCreationData";
import { updateResetPopUp } from "../../../../redux/features/activityCreation/activityCreationSettings";
import { batch } from "react-redux";
export const resetHistory = ({
    dispatch,
    questionNum,
    newState
}) => {
    batch(()=>{
        dispatch(updateResetPopUp())
        //update current data in redux store
        dispatch(updateQuestionData({
            questionNum: questionNum,
            data: newState
        }))
    })
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