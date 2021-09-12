import { useState, useEffect } from "react"
import test from '../../../../images/eureka_1.jpg'
import {DragDropContext} from "react-beautiful-dnd"
import WordBank from "./wordBank"
const activityData = {
    imageSource: test,
    teacherLabels:[
        {top:10,bottom:10,width:10,content:"Hello"},
        {top:20,bottom:20,width:20,content:"Hi"},
        {top:30,bottom:30,width:30,content:"But"},
        {top:30,bottom:30,width:30,content:"Nah"}
    ],
    studentLabels:[],
}
//function parameters to connect to activity
//{last, prev, onNavBtnClick, activityData}
//activityData.imageSource
const LabelPicturesApp = () => {
    const [state, setState] = useState(activityData)
    const [wordBankColumns, setColumns] = useState(window.innerWidth>576? Array(3).fill(0):Array(2).fill(0))
    
    //handles word bank layout based off window
    useEffect(() => {
        const resize = () => {
            if(window.innerWidth>576) setColumns(Array(3).fill(0))
            else setColumns(Array(2).fill(0))
        }
        window.addEventListener('resize', resize);
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", resize);
    }, []); // Empty array ensures that effect is only run on mount

    return(
        <div className="labelPicApp d-flex align-items-center justify-content-center">
            <div className = "d-flex flex-column align-items-center col-9 col-md-7 col-xl-6">
                <p>Label the following image</p>
                <DragDropContext>
                    <div className = "labelPicAppConatiner d-flex align-items-center justify-content-center">
                        <img src={state.imageSource}/>
                        <div className="labelPicBox"></div>
                    </div>
                    <WordBank wordBankColumns={wordBankColumns} state={state}/>
                </DragDropContext>
            </div>
        </div>
    )
}
export default LabelPicturesApp