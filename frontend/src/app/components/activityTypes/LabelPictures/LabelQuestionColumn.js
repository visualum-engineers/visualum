import LabelPicturesImage from "./LabelImage"
import LabelQuestionTransition from "./LabelQuestionTransition"
import LabelQuestionNavBtns from "./LabelQuestionNavBtns"
import { useState, useEffect } from "react"
import {CSSTransition} from "react-transition-group"
import MoreInfoBtn from "../../utilities/moreInfoBtn/MoreInfoBtn"
const duration = 400
const inPropDuration = duration + 100
const defaultTransition = {
    transition: `all ${duration}ms ease-out`,
    transitionProperty: "opacity, transform, left",
}
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

    const onQuestionNavClick = (e) =>{
        const target = e.target.closest("button")
        if(!target || inProp) return
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
        setPrevQuestion(currQuestion)
        setInProp(true)
        setTimeout(() =>{
            setInProp(false)
        }, inPropDuration)
    }
    
    return (
        <div 
            className={`label-pic-activity-question-container d-flex flex-column align-items-center${!props.mediumWindowWidth ?" portrait-size":""}`}
            style={inProp ? {overflow: "hidden"}: null}
        >
            <h2 className="label-pic-activity-column-titles">
                <span>Question</span>
                <div className="label-pic-activity-instructions-position d-flex">
                    <MoreInfoBtn 
                        textContent = "View Instructions"
                        customContainerClass = "label-pic-activity-instructions"
                        customContainerAriaLabel = "activity-instructions"
                        customDropDownID = "label-pic-activity-instructions"
                        setTimeoutOnMount = {!props.moreInfoBtn? 4000: 0}
                        onClick = {props.moreInfoOnClick}
                    />
                </div>
            </h2>
            <LabelPicturesImage 
                data={props.data}
                popUpBgStyles={props.popUpBgStyles}
            />
            <LabelQuestionNavBtns 
                totalQuestions = {props.data.questions.length}
                currQuestion={currQuestion}
                onClick={onQuestionNavClick}
            />
            <div 
                className="d-flex flex-column align-items-center flex-grow-1 col-11 col-sm-10 col-lg-8"
                style={{position:"relative"}}
            >
                {Object.keys(props.data.categories).map((key, index) => {
                    const moveLeft = (prevQuestion - currQuestion) >= 0
                    const questionID = props.data.questions[currQuestion].id
                    return(
                        <CSSTransition
                            key = {`label-pic-question-${key}`}
                            in = {questionID.toString() === key.toString()}
                            timeout={duration}
                            classNames={`${moveLeft? "label-pic-question-move-left":"label-pic-question-move-right"}`}
                            //mountOnEnter
                            unmountOnExit
                        >
                            <LabelQuestionTransition
                                {...props}
                                questionKey = {key}
                                questionIndex = {index}
                                style ={{...defaultTransition}}
                            />
                        </CSSTransition>
                    )
                })}
            </div>
            
        </div>
    )
}
export default LabelPicturesQuestion