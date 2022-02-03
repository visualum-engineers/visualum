import ActivityCreationQuestion from "../ActivityCreationQuestion"
import { updateActivityEditPopUp } from "../../../../../redux/features/activityCreation/activityCreationSettings"
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

    const miniScreenData = questions.map((question, index) =>{
        return ({
            textContent: <> 
                            <h2 className="mini-screen-slide-header">
                                {`Question ${parseInt(index)+1}`}
                            </h2>
                            <h3 className="mini-screen-slide-sub-text">
                                {question.type}
                            </h3>
                        </> 
            ,
            slide: <ActivityCreationQuestion 
                    data={question}
                />
            ,
        })})
    return {
        header: miniScreenHeader,
        data: miniScreenData
    }
}
export default useActivityMiniScreenData