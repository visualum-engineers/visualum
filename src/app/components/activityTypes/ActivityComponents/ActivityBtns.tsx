import NavActivityBtn from "./NavActivityBtn";
import { useDispatch, useSelector } from "react-redux";
import { updateTrackCompletion } from "../../../../redux/features/activityTypes/activitiesData";

const ActivityBtns = ({
    onNavBtnClick, 
    lastQuestion, 
    prevQuestion,
    currQuestion
}) => {
    const questionData = useSelector((state) => state.activities.data.clientData.present.clientAnswerData.questions[currQuestion])
    const dispatch = useDispatch()
    const onClick = (e: any) =>{
        dispatch(updateTrackCompletion({
            questionNum: currQuestion,
            question: questionData
        }))
        //update new numbers
        onNavBtnClick(e)
    }
    return (
        <div className = {`w-100 d-flex ${!prevQuestion ? "justify-content-end":"justify-content-between"}`}>
                {prevQuestion ? <NavActivityBtn 
                                    onClick = {onClick} 
                                    prev={prevQuestion}/>
                : null}
                <NavActivityBtn 
                    onClick = {onClick} 
                    last={lastQuestion}/>
        </div>
    )
}
export default ActivityBtns
