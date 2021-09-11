import MultipleChoiceApp from "./MultipleChoice/MultipleChoiceApp"
import ShortAnswerApp from "./ShortAnswer/ShortAnswerApp"
import SortActivityApp from "./SortActivity/SortActivityApp"
import MatchActivityApp from "./MatchActivity/MatchActivityApp"
import { useState } from "react"
const activityData = {
    //matching
    1: {
        type: "matching",
        matchPair:{
            "Pair1":"Pair1-", 
            "Pair2":"Pair2-", 
            "Pair3":"Pair3-", 
            "Pair1-":"Pair1",
            "Pair2-":"Pair2", 
            "Pair3-":"Pair3",
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
    switch(state.type){
        case "matching":
            return <MatchActivityApp 
                        activityData = {state}
                        prev= {question !== 1}
                        last={Object.keys(activityData).length === question} 
                        onNavBtnClick={onNavBtnClick}/>
        case "multipleChoice":
            return <MultipleChoiceApp
                        activityData = {state}
                        prev= {question !== 1}
                        last={Object.keys(activityData).length === question}
                        onNavBtnClick={onNavBtnClick}/>;
        case "sort":
            return <SortActivityApp
                        activityData = {state}
                        prev= {question !== 1}
                        last={Object.keys(activityData).length === question}
                        onNavBtnClick={onNavBtnClick}/>;
        case "shortAnswer":
            return <ShortAnswerApp
                        activityData = {state}
                        prev= {question !== 1}
                        last={Object.keys(activityData).length === question}
                        onNavBtnClick={onNavBtnClick}/>;
        default:
            return <p>You've Submitted!</p>
    }
}
export default Activity