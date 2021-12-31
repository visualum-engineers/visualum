import { useState, useEffect } from "react"
import {DragDropContext} from "react-beautiful-dnd"
import ActivityHeader from "../ActivityHeader"
//import test from '../../../../../public/images/eureka_1.jpg'
import WordBank from "./WordBank"
import ImageLabels from "./ImageLabels.js"
import { useDispatch, useSelector } from "react-redux"

const LabelPicturesApp = ({
    activityData, 
    questionNum, 
    activityID, 
    moreInfoOnClick,
    resetBtnOnClick, 
    moreInfoBtn, 
    mediumWindowWidth,
    smallWindowWidth
}) =>{
    const [data, setData] = useState(activityData)
    //redux states
    const dispatch = useDispatch()
    const disableDnD = useSelector((state) => !state.activities.dndEnabled)
    const resetPopUp = useSelector((state) => state.activities.resetPopUp)

    //if it exists, grab info from local storage on mount.
    useEffect(() => {
        //on mount check local storage for data
        let stored = localStorage.getItem(`${activityID}-label_activity_client_answer-${questionNum}`)
        if(!stored) return
        setData(JSON.parse(stored))
    }, [activityID, questionNum])

    const toggleTap = () =>{

    }
    
    return(
        <>
            <ActivityHeader 
                mediumWindowWidth={mediumWindowWidth}
                smallWindowWidth = {smallWindowWidth}
                data ={data}
                resetBtnOnClick ={resetBtnOnClick} 
                questionNum={questionNum}
                disableDnD ={disableDnD}
                toggleTap = {toggleTap}
                type="DnD"
            />
            <div className="label-pic-activity-container">

            </div>
        </>
    )
}
export default LabelPicturesApp
//function parameters to connect to activity
//{last, prev, onNavBtnClick, activityData}
//activityData.imageSource
// const LabelPicturesApp = () => {
//     //generate word bank labels
//     const smallLayout = (teacherLabels) =>{
//         let totalColumns = [[],[]]
//         for(let i in teacherLabels){
//             totalColumns[i%2].push(teacherLabels[i])
//         }
//         return totalColumns
//     }
//     const largeLayout = (teacherLabels) =>{
//         let totalColumns = [[],[],[]]
//         for(let i in teacherLabels){
//            totalColumns[i%3].push(teacherLabels[i])
//         }
//         return totalColumns
//     }
//     activityData.wordBankLabels = window.innerWidth>576 ? largeLayout(activityData.teacherLabels) : smallLayout(activityData.teacherLabels)
    
//     //generate image label groups
//     let imageLabels = []
//     for(let i =0; i<Object.keys(activityData.teacherLabels).length; i++){
//         imageLabels.push([])
//     }
//     activityData.imageLabels = imageLabels
    
//     //state
//     const [state, setState] = useState(activityData)
//     const [imageIsMounted, setMount] = useState({isMounted : false})
    
//     //check if component is mounted to generated label indicators
//     useEffect(() =>{
//         if(!imageIsMounted.isMounted) setMount((s)=>{
//             const container = document.querySelector(".imgIndicatorContainer").getBoundingClientRect()
//             return {
//                 ...s,
//                 isMounted: true, 
//                 indicatorPos:{
//                     x : container.x + window.scrollX, 
//                     y: container.y + window.scrollY,
//                     width: container.width,
//                     height: container.height,
//                 }
//             }
//         })
//     }, [imageIsMounted])// Empty array ensures that effect is only run on mount

//     //handles resizing events that change
//     useEffect(() => {
//         const resize = () => {
//              //1. indicator postion
//             setMount((imageIsMounted)=>{
//                 const container = document.querySelector(".imgIndicatorContainer").getBoundingClientRect()
//                 return {
//                     ...imageIsMounted,
//                     indicatorPos: {
//                         x : container.x + window.scrollX, 
//                         y: container.y + window.scrollY,
//                         width: container.width,
//                         height: container.height,
//                     }
//                 }
//             })
            
//             //2. word bank layout 
//                 //if user has already moved words out of word bank
//                 //we dont re-order those again!
//             let copy = [...state.wordBankLabels]
//             let currWordBank = []
//             while(copy.length!== 0){
//                 currWordBank = [...currWordBank, ...copy.splice(0,1)[0]]
//             }
//             if(window.innerWidth>576 && state.wordBankLabels.length<=2) setState((state)=>{
//                 return {...state, wordBankLabels: largeLayout(currWordBank)}
//             })
//             else if (window.innerWidth<576 && state.wordBankLabels.length>2) setState((state)=>{
//                 return {...state, wordBankLabels: smallLayout(currWordBank)}
//             })
//         }
        
//         window.addEventListener('resize', resize);

//         // Remove event listener on cleanup
//         return () => window.removeEventListener("resize", resize)
//     }, [state.wordBankLabels, imageIsMounted]); 
    
//     //handles updating answer selections at the end of a drag
//     const onDragEnd= (result) => {
//         const {destination, source, draggableId} = result
//         //Drop in a non-droppable container
//         if(!destination) return null
//         //final and starting elements
//         const start = source.droppableId
//         const final = destination.droppableId
//         //conditions: 
//         let wordBankCopy = [...state.wordBankLabels]
//         let imageLabelCopy = [...state.imageLabels]
//         let newAnswerPostion
//         let startAnswerPosition
//         let finalAnswerPosition
//         let newState 
//         switch(true){
//             //1. drop into the same container, in word bank, at same position
//             case destination.index === source.index && destination.droppableId === source.droppableId:
//                 return null
//             //2. dropping into the same container, in a different position
//             case start === final:
//                 newAnswerPostion = wordBankCopy[start[0]]
//                 newAnswerPostion.splice(source.index, 1);
//                 newAnswerPostion.splice(destination.index, 0, state.teacherLabels[draggableId]);
//                 newState = {
//                     ...state,
//                     wordBankLabels: wordBankCopy,
//                 }
//                 setState(newState)
//                 return 
//             //3. dropping between two word bank containers 
//             case start!==final && /.wordBankColumn/.test(start) && /.wordBankColumn/.test(final): 
//                 startAnswerPosition = wordBankCopy[start[0]]
//                 finalAnswerPosition = wordBankCopy[final[0]]
//                 startAnswerPosition.splice(source.index, 1);
//                 finalAnswerPosition.splice(destination.index, 0, state.teacherLabels[draggableId]);
//                 newState = {
//                     ...state,
//                     wordBankLabels: wordBankCopy,
//                 }
//                 setState(newState)
//                 return;

//             //4.dropping between two label containers
//             case start !== final && !(/.wordBankColumn/.test(start) || /.wordBankColumn/.test(final)):
//                 startAnswerPosition = imageLabelCopy[start[0]]
//                 finalAnswerPosition = imageLabelCopy[final[0]]
//                 if(finalAnswerPosition.length>0){
//                     startAnswerPosition.splice(source.index, 1, finalAnswerPosition[destination.index ===1? destination.index-1: destination.index]);
//                     finalAnswerPosition.splice(destination.index ===1? destination.index-1: destination.index, 1, state.teacherLabels[draggableId]);
//                 } else {
//                     startAnswerPosition.splice(source.index, 1);
//                     finalAnswerPosition.splice(destination.index, 0, state.teacherLabels[draggableId])
//                 }
                
//                 newState = {
//                     ...state,
//                     imageLabels: imageLabelCopy,
//                 }
//                 setState(newState)
//                 return 

//             //5. dropping between a label container and a word bank
//             case start!==final :
//                 startAnswerPosition = /.wordBankColumn/.test(start) ? wordBankCopy[start[0]] : imageLabelCopy[start[0]]
//                 finalAnswerPosition = /.wordBankColumn/.test(final) ? wordBankCopy[final[0]] : imageLabelCopy[final[0]]
                
//                 //handles when:
//                 //  1.An element is dragged from image label to word bank
//                 //  2.An element is dragged from word bank to empty image label 
//                 if( (finalAnswerPosition.length<=0 && /.wordBankColumn/.test(start)) || !/.wordBankColumn/.test(start)){
//                     startAnswerPosition.splice(source.index, 1);
//                     finalAnswerPosition.splice(destination.index, 0, state.teacherLabels[draggableId]);
//                 }
                
//                 //handles when:
//                 //  1.An element is dragged from word bank to non-empty label
//                 else{
//                     startAnswerPosition.splice(source.index, 1, finalAnswerPosition[destination.index ===1? destination.index-1: destination.index]);
//                     finalAnswerPosition.splice(destination.index ===1? destination.index-1: destination.index, 1, state.teacherLabels[draggableId]);
//                 }
               
//                 newState = {
//                     ...state,
//                     imageLabels: imageLabelCopy,
//                     wordBankLabels: wordBankCopy,
//                 }
//                 setState(newState)
//                 return
                
//             default:
//                 return;
//         }
//     }
    
//     return(
//         <div className="label-pic-activity d-flex align-items-center justify-content-center">
//             <div className = "d-flex flex-column align-items-center col-9 col-md-7 col-xl-6">
//                 <p>Label the following image</p>
//                 <DragDropContext onDragEnd={onDragEnd}>
//                     <div className = "d-flex align-items-start justify-content-center">
//                         <ImageLabels state={state} />
//                         <div className="imgIndicatorContainer">
//                             <img src={state.imageSource} alt="hello"/>
//                             {imageIsMounted.isMounted ? Object.keys(state.teacherLabels).map((content)=>{
//                                 const oldX = state.teacherLabels[content].x
//                                 const oldY = state.teacherLabels[content].y
//                                 const oldWidth = state.teacherLabels[content].width
//                                 const oldHeight = state.teacherLabels[content].height
//                                 //actual image size
//                                 const imgSizeWidth = state.teacherLabels[content].imgSize.width
//                                 const imgSizeHeight = state.teacherLabels[content].imgSize.height
//                                 //current image size
//                                 const imgWidth = imageIsMounted["indicatorPos"].width
//                                 const imgHeight = imageIsMounted["indicatorPos"].height 
//                                 const style = {
//                                     top: `${(imgHeight*oldY/imgSizeWidth)}px`,
//                                     left: `${(imgWidth*oldX/imgSizeHeight)}px`,
//                                     width:`${(oldWidth)/imgSizeWidth}px`,
//                                     height: `${(oldHeight)/imgSizeHeight}px`,
//                                 }
//                                 return <div 
//                                             style={style}   
//                                             key ={content}
//                                             className="labelIndicators">
//                                             {content}
//                                     </div>
//                             }) : null}
//                         </div>
//                     </div>
//                     <WordBank state={state}/>
//                 </DragDropContext>
//             </div>
//         </div>
//     )
// }