import { batch, useDispatch, useSelector } from "react-redux"
const useActivityMiniScreenData = ({
    reduxSelectorFunc,
    currQuestionSelector,
    changeQuestionPos,
    addQuestion,
    deleteQuestion,
    changeCurrQuestion,
    //this a component
    SlideComponent
}) =>{
    const dispatch = useDispatch()
    const slides = useSelector(reduxSelectorFunc)
    const currQuestion = useSelector(currQuestionSelector)
    const miniScreenData = slides.map((slide, index)=>{
        return{
            key: slide.key,
            slide: <SlideComponent
                        currQuestion = {index} 
                        questionType = {slide.questionType}
                        preview={true}
                    />,
            slideAriaLabel: `go-to-slide-${parseInt(index)+1}`,
        }
    })
    const onSlideClick = (e) =>{
        const target = e.target.closest(".mini-screen-slide");
        if(!target) return
        const value = target.dataset.slideNum
        if(!value) return 
        dispatch(changeCurrQuestion(value))
    }
    const onAddNewClick = (e) =>{
        dispatch(addQuestion(true))
    }
    
    const onRemoveClick =(e) =>{
        const target = e.target.closest("button")
        if(!target) return
        const value = target.dataset.questionNum
        if(!value) return
        batch(()=>{
            if(parseInt(currQuestion) === parseInt(value)){
                const lastSlide = parseInt(currQuestion) === slides.length-1
                const deleteCurrQuestion = parseInt(currQuestion) === parseInt(value)
                if(lastSlide && deleteCurrQuestion) {
                    if(!(parseInt(currQuestion) === 0)){
                        const newValue = value - 1
                        dispatch(changeCurrQuestion(newValue))
                    } 
                }
            }
            if(parseInt(currQuestion) > parseInt(value)){
                dispatch(changeCurrQuestion(currQuestion - 1))
            }

            dispatch(deleteQuestion({questionNum : value}))
        })
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
        currQuestion: currQuestion,
        onDragEnd: onDragEnd,
        onAddNewClick: onAddNewClick,
        onRemoveClick: onRemoveClick,
        onSlideClick: onSlideClick,
    }
}
export default useActivityMiniScreenData