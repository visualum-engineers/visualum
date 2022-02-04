//import ActivityCreationQuestion from "../ActivityCreationQuestion"
import { 
    updateActivityEditPopUp, 
} from "../../../../../redux/features/activityCreation/activityCreationSettings"
import { 
   changeQuestionPos, 
   addQuestion, 
   deleteQuestion 
} from "../../../../../redux/features/activityCreation/activityCreationData"
import { useDispatch, useSelector } from "react-redux"
const useActivityMiniScreenData = () =>{
    const dispatch = useDispatch()
    const questions = useSelector(state => state.activityCreation.data.saved.present.questions)
    const activityName = useSelector(state => state.activityCreation.data.saved.present.activityName)
    const miniScreenHeader = <>
        <h1>{activityName}</h1>
        <button
            onClick={() => dispatch(updateActivityEditPopUp(true))}
        >edit name</button>
    </>
    
    const miniScreenData = questions.map((question, index)=>{
        return{
            key: question.key,
            textContent:<>
                <h2 className="mini-screen-slide-header">
                    {`Question ${parseInt(index)+1}`}
                </h2>
                <h3 className="mini-screen-slide-sub-text">
                    {question.questionType}
                </h3> 
            </>,
            slide: <div></div>
        }
    })

    const onDragEnd = (e) =>{
        const {draggableId, source, destination} = e
        const startIndex = source.index
        const endIndex = destination.index
        const questionData = questions.filter((question) => question.key.toString() === draggableId)[0]
        dispatch(changeQuestionPos({
            startIndex: startIndex,
            endIndex: endIndex, 
            questionData: questionData
        }))
    }
    const onAddNewClick = () =>{

    }
    return {
        header: miniScreenHeader,
        data: miniScreenData,
        onDragEnd: onDragEnd,
    }
}
export default useActivityMiniScreenData