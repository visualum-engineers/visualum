//import ActivityCreationQuestion from "../ActivityCreationQuestion"
import { useDispatch, useSelector } from "react-redux"
const useActivityMiniScreenData = ({
    reduxSelectorFunc,
    changeQuestionPos,
    addQuestion,
    deleteQuestion,
}) =>{
    const dispatch = useDispatch()
    const slides = useSelector(reduxSelectorFunc)
    const miniScreenData = slides.map((slide, index)=>{
        return{
            key: slide.key,
            textContent:<>
                <h2 className="mini-screen-slide-header">
                    {`Question ${parseInt(index)+1}`}
                </h2>
                <h3 className="mini-screen-slide-sub-text">
                    {slide.slideType}
                </h3> 
            </>,
            slide: <div></div>,
            slideAriaLabel: `go-to-slide-${parseInt(index)+1}`,
        }
    })
    const onAddNewClick = (e) =>{
        //e.preventDefault()
    }
    
    const onRemoveClick =(e) =>{
        //e.preventDefault()
    }

    const onDragEnd = (result) =>{
        const {draggableId, source, destination} = result
        if(!destination || !source) return
        const startIndex = source.index
        const endIndex = destination.index
        if(startIndex === endIndex) return
        const slideData = slides.filter((slide) => slide.key.toString() === draggableId)[0]
       
        dispatch(changeQuestionPos({
            startIndex: startIndex,
            endIndex: endIndex, 
            slideData: slideData
        }))
    }
    return {
        data: miniScreenData,
        onDragEnd: onDragEnd,
        onAddNewClick: onAddNewClick,
        onRemoveClick: onRemoveClick
    }
}
export default useActivityMiniScreenData