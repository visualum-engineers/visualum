import LabelPicturesImage from "./LabelImage"
import LabelQuestion from "./LabelQuestion"
import LabelQuestionNavBtns from "./LabelQuestionNavBtns"
import { useState, useEffect } from "react"
import {CSSTransition} from "react-transition-group"
const duration = 500
const inPropDuration = duration + 200
const LabelPicturesQuestion = (props) =>{
    //used for transitions between internal label questions
    const [currQuestion, setCurrQuestion] = useState(0)
    const [prevQuestion, setPrevQuestion] = useState(0)
    //detect transition occuring
    const [inProp, setInProp] = useState(true)
    useEffect(() =>{
        setTimeout(() =>{
            setInProp(false)
        }, inPropDuration)
    }, [])
    const questionContent = props.data.questions[currQuestion].content
    const questionID = props.data.questions[currQuestion].id
    const onQuestionNavClick = (e) =>{
        const target = e.target.closest("button")
        if(!target || inProp) return
        setPrevQuestion(currQuestion)
        setInProp(true)
        switch(target.dataset.actionLabel){
            case "prev-question":
                setCurrQuestion(state => state - 1)
                break
            case "next-question":
                setCurrQuestion(state => parseInt(state) + 1)
                break
            default:
                break
        }
        setTimeout(() =>{
            setInProp(false)
        }, inPropDuration)
    }
    return (
        <div 
            className="label-pic-activity-question-container d-flex flex-column align-items-center"
            style={inProp ? {overflow: "hidden"}: null}
        >
            <h2 className="label-pic-activity-column-titles">
                <span>Question</span>
            </h2>
            <LabelPicturesImage 
                data={props.data}
                popUpBgStyles={props.popUpBgStyles}
            />
            <LabelQuestionNavBtns 
                onClick={onQuestionNavClick}
            />
            {Object.keys(props.data.categories).map((key) => {
                const moveLeft = (prevQuestion - currQuestion) >= 0
                return(
                    <CSSTransition
                        key = {`label-pic-question-${key}`}
                        in = {questionID.toString() === key.toString()}
                        timeout={duration}
                        classNames={`${moveLeft? "label-pic-question-move-left":"label-pic-question-move-right"}`}
                        mountOnEnter
                        unmountOnExit
                    >
                        <LabelQuestion
                            {...props}
                            questionID = {questionID}
                            questionContent = {questionContent}
                        />
                    </CSSTransition>
                )
            })}
        </div>
    )
}
export default LabelPicturesQuestion