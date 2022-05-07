 import { ActivityCreationQuestion } from "./index"
 import { useSelector} from "react-redux"
 import {CSSTransition} from "react-transition-group"
import { RootState } from "../../../../../redux/store"
 const duration = 375
 const defaultTransition = {
    transition: `all ${duration}ms ease-out`,
    transitionProperty: "opacity, transform, left",
}
 const ActivityCreationBody = ({
    smallWindowWidth,
    mediumWindowWidth,
 }: any) =>{
    const sidebarToggle = useSelector((state: RootState) => state.activityCreation.settings.sidebarToggled)
    const questions = useSelector((state: RootState) => state.activityCreation.data.saved.present.questions)
    const currQuestion = useSelector((state: RootState) => state.activityCreation.settings.currQuestion)

    return(
        <div className={`activity-creation-body`}>
            <div className={`activity-creation-question-container`
                            + `${sidebarToggle && mediumWindowWidth ? " move-left": ""}`
                            + `${smallWindowWidth ? " move-down": ""}`
                        }>
                {questions.map((question, index)=>{
                    return(
                        <CSSTransition 
                            key={`question-${index}`}
                            in = {parseInt(currQuestion.toString()) === parseInt(index.toString())}
                            timeout={duration}
                            mountOnEnter
                            unmountOnExit 
                        >
                            <ActivityCreationQuestion
                                smallWindowWidth={smallWindowWidth}
                                mediumWindowWidth={mediumWindowWidth}
                                questionType = {question?.questionType}
                                style ={{...defaultTransition}}
                                currQuestion = {index}
                            />
                        </CSSTransition>
                    )
                     
                })}
               
            </div>
        </div>
    )
 }

 export default ActivityCreationBody