import MultipleChoiceApp from "./MultipleChoice/MultipleChoiceApp"
import ShortAnswerApp from "./ShortAnswer/ShortAnswerApp"
import SortActivityApp from "./SortActivity/SortActivityApp"
import MatchActivityApp from "./MatchActivity/MatchActivityApp"
import ActivityBtns from "./NavActivityBtn/ActivityBtns"
import { useState } from "react"

const activeActivityBg = "images/active-activity-bg.jpg"
const activityData = {
    //matching
    3: {
        type: "matching",
        matchPair:{
            "Pair1Pair1Pair1Pair1Pair1Pair1Pair1Pair1Pair1Pair1":"Pair1-Pair1-Pair1-Pair1-Pair1-", 
            "Pair1-Pair1-Pair1-Pair1-Pair1-":"Pair1Pair1Pair1Pair1Pair1Pair1Pair1Pair1Pair1Pair1",
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
            "Pair12":"Pair12-", 
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
        imageURL : "",
        answerChoices: ["Good What faces this world", "Bad", "No"]
    },
    //sorting
    1: {
        type: "sort",
        categories: [
            {categoryId: 1, name: "Good"},
            {categoryId: 2, name: "Medium"},
            {categoryId: 3, name: "Bad"},
            {categoryId: 4, name: "Nice"},
            {categoryId: 5, name: "Bye"}

        ],

        answers: [
            {categoryId: "1", id:"1", content:"Okay"}, 
            {categoryId: "1", id:"2", content:"Good"},
            {categoryId: "1", id:"3", content:"Nice" },
            {categoryId: "2", id:"4", content:"Duh" },
            {categoryId: "2", id:"5",content:"Bruh"},
            {categoryId: "2", id:"6",content:"Yuh" },
            {categoryId: "3", id:"7",content:"Fuh" },
        ]
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
        <div className = "activity-body row flex-column align-items-center ">
            <img src = {activeActivityBg} className="active-activity-bg" alt="planet and stars background"/>
            <div className = "activity-type-container col-11 col-md-9 col-lg-7 col-xl-6 d-flex flex-column justify-content-center">
                {state.type ? activityType[state.type]
                :  <p>You've Submitted!</p>}
            </div>
            {/*loads appropriate btns depending if 
                    1. There are prev questions
                    2. This is the last questions */}
            <div className="col-11 col-md-9 col-lg-7 col-xl-6 nav-activity-btns">
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
