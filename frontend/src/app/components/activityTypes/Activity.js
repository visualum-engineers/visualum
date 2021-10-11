import MultipleChoiceApp from "./MultipleChoice/MultipleChoiceApp"
import ShortAnswerApp from "./ShortAnswer/ShortAnswerApp"
import SortActivityApp from "./SortActivity/SortActivityApp"
import MatchActivityApp from "./MatchActivity/MatchActivityApp"
import ActivityBtns from "./NavActivityBtn/ActivityBtns"
import { useState } from "react"
const activityData = {
    //matching
    1: {
        type: "matching",
        matchPair:{
            "Pair1Pair1Pair1Pair1Pair1Pair1Pair1Pair1Pair1Pair1":"Pair1-", 
            "Pair1-":"Pair1Pair1Pair1Pair1Pair1Pair1Pair1Pair1Pair1Pair1",
            "Pair2":"Pair2-", 
            "Pair2-":"Pair2", 
            "Pair3":"Pair3-", 
            "Pair3-":"Pair3",
            "Pair4-":"Pair4",
            "Pair4":"Pair4-", 
            "Pair5":"Pair5-",
            "Pair5-":"Pair5",
            "Pair6":"Pair6-", 
            "Pair6-":"Pair6",
            "Pair7-":"Pair7",
            "Pair7":"Pair7-", 
            "Pair8":"Pair8-",
            "Pair8-":"Pair8",
            "Pair9":"Pair9-", 
            "Pair9-":"Pair9",
            "Pair10-":"Pair10",
            "Pair10":"Pair10-", 
            "Pair11":"Pair11-",
            "Pair11-":"Pair11",
            "Pair12":"Pair12", 
            "Pair12-":"Pair12",
            "Pair13-":"Pair13",
            "Pair13":"Pair13-", 
            "Pair14":"Pair14-",
            "Pair14-":"Pair14",
        },
    },
    //multiple choice
    2:{
        type: "multipleChoice",
        question: "What faces this world?",
        answerChoices: ["Good What faces this world", "Bad", "No"]
    },
    //sorting
    3: {
        type: "sort",
        answerChoices: {
            "1": {id: "1", choice:"Okay"}, 
            "2": {id: "2", choice:"Good"},
            "3": {id: "3", choice:"Nice" },
            "4": {id: "4", choice:"Duh" },
            "5": {id: "5", choice:"Bruh"},
            "6": {id: "6", choice:"Yuh" },
            "7": {id: "7", choice:"Fuh" },
        },
        columns: {
            "Good": [],
            "Medium":[],
            "Bad":[],
            "answerChoices": ["1","2","3","4", "5", "6", "7"],
        },
    },
    //short answer
    4: {
        type: "shortAnswer",
        question: "What faces this world?",
    }
}
const Activity = () =>{
    let currQuestion = 1
    const [question, setQuestion] = useState(1)
    const [state, setState] = useState(activityData[currQuestion])
    const onNavBtnClick = (e) =>{
        const btnType = e.target.closest("button").getAttribute("btntype")
        //different btn actions
        if(btnType === "prev") currQuestion = question - 1
        if(btnType === "continue") currQuestion = question + 1
        if(btnType === "submit") return null
        
        setState(activityData[currQuestion])
        setQuestion(currQuestion)
    }
    //render activity based off data provided
    const activityType = {
        "matching": <MatchActivityApp 
                    activityData = {state}
                    />,
        "multipleChoice": <MultipleChoiceApp
                            activityData = {state}
                            />,
        "sort": <SortActivityApp
                    activityData = {state}
                    />,
        "shortAnswer": <ShortAnswerApp
                        activityData = {state}
                        />,
    }
    return(
    <>
        <div className = "activity-body row flex-column align-items-center justify-content-center">
            <div className = "activity-type-container col-11 col-md-8 col-lg-6 col-xl-5">
                {state.type ? activityType[state.type]
                :  <p>You've Submitted!</p>}
            </div>
            {/*loads appropriate btns depending if 
                    1. There are prev questions
                    2. This is the last questions */}
            <div className="col-11 col-md-8 col-lg-6 col-xl-5">
                <ActivityBtns 
                    prevQuestion = {question !== 1} 
                    lastQuestion = {Object.keys(activityData).length === question}
                    onNavBtnClick = {onNavBtnClick}
                />
            </div>
        </div>
        
    </>
    )
}
export default Activity
