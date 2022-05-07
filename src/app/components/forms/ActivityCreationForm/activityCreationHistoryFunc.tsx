
import { updateQuestionData } from "../../../../redux/features/activityCreation/activityCreationData";
import { updateResetPopUp } from "../../../../redux/features/activityCreation/activityCreationSettings";
import { batch } from "react-redux";
export const resetHistory = ({
    dispatch,
    questionNum,
    newState
}: any) => {
    batch(()=>{
        dispatch(updateResetPopUp(false))
        //update current data in redux store
        dispatch(updateQuestionData({
            questionNum: questionNum,
            data: newState
        }))
    })
}

export const undoHistory = ({
    dispatch
}: any) =>{
    dispatch({type: "activityCreationData/undo"})
}
export const redoHistory = ({
    dispatch
}: any) =>{
    dispatch({type: "activityCreationData/redo"})
}