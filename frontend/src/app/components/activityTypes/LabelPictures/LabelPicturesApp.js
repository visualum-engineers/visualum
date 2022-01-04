import { useState, useEffect } from "react"
import transformData from "./labelTransformData"
import {DragDropContext} from "react-beautiful-dnd"
import ActivityHeader from "../ActivityHeader"
import WordBank from "../../utilities/dragAndDrop/ReactBeautifulDnD/WordBank"
import LabelQuestionColumn from "./LabelQuestionColumn"
import { useDispatch, useSelector } from "react-redux"
import { resetPopUpOff, enableTap, enableDnD} from "../../../../redux/features/activityTypes/activitiesSlice"
import updateMultipleSortableLists from "../../utilities/dragAndDrop/DnDUpdateAlgo.js/Sortables/updateMultipleLists"


const LabelPicturesApp = ({
    activityData, 
    questionNum, 
    activityID, 
    moreInfoOnClick,
    resetBtnOnClick, 
    moreInfoBtn, 
    popUpBgStyles,
    mediumWindowWidth,
    smallWindowWidth,
}) =>{
    const [data, setData] = useState(transformData(activityData, 1))

    //used for dnd and tap and drop actions
    const [firstElTap, setFirstElTap] = useState(null)
    const [removedEl, setRemovedEl] = useState(undefined)
    //redux states
    const dispatch = useDispatch()
    const disableDnD = useSelector((state) => !state.activities.dndEnabled)
    const resetPopUp = useSelector((state) => state.activities.resetPopUp)
    
    //if it exists, grab info from local storage on mount.
    useEffect(() => {
        //on mount check local storage for data
        let stored = localStorage.getItem(`${activityID}-label_pic_activity_client_answer-${questionNum}`)
        if(!stored) return
        setData(JSON.parse(stored))
    }, [activityID, questionNum])
    //reset data
    useEffect(() =>{
        if(resetPopUp && resetPopUp.confirmed){
            //reset all state values to default
            setData(transformData(activityData, 1))
            setFirstElTap(null)
            dispatch(resetPopUpOff())
            //remove any saved data from local storage
            localStorage.removeItem(`${activityID}-label_pic_activity_client_answer-${questionNum}`)        
        }
    }, [dispatch, resetPopUp, activityData, activityID, questionNum])

    //test is item comes from a word bank column
    const answerChoiceTestEl = (el) => /answerChoices.*/.test(el)
    
    const onDragStart = () =>{
        //to prevent smooth scroll behavior from interfering with react-beautiful auto scroll
        document.querySelector("html").classList.add("sortActivityActive")
    }

    const onDragEnd = (result) =>{
        const newState = updateMultipleSortableLists(data, result, answerChoiceTestEl)
        if(!newState) return
        //update state
        setData(newState)
        localStorage.setItem(`${activityID}-label_pic_activity_client_answer-${questionNum}`, JSON.stringify(newState))
    }
    const toggleTap = (e) =>{
        if(e.type ==="keydown" && !(e.key === "Enter")) return
        //update redux store so instructions can dynamically change
        if (disableDnD) dispatch(enableDnD())
        else dispatch(enableTap())

        moreInfoOnClick()
        //if we're changing the mode, we need to reset this
        // as its only viable for tap mode
        if(firstElTap) firstElTap.node.classList.remove("label-picture-activity-dragging")
        setRemovedEl(undefined)
        setFirstElTap(null)
    }
    const onTap = (e) =>{
        console.log(e)
        //means a selection hasnt happened so skip for keyboard
        if(e.type === "keydown" && e.key !=="Enter") return
        //update the first element
        let droppableSelected = null
        let currListItem = e.target.closest(".label-pic-activity-draggables")
        if(!currListItem) {
            droppableSelected = true
            currListItem = e.target.closest(".label-pic-activity-inner-droppable")
        }
        //used when two list items are clicked, and not an empty droppable
        const droppableId = currListItem.dataset.tapDroppableId
        const draggableIndex = currListItem.dataset.index
        const firstDraggableId = currListItem.dataset.tapDraggableId
        
        if(!firstElTap) {
            setFirstElTap({
                droppableId: droppableId,
                draggableId: firstDraggableId,
                draggableIndex: draggableIndex,
                node: e.target
            })
            currListItem.classList.add("label-pic-activity-dragging")
            return
        }
        //update the second element, and perform tap logic
        firstElTap.node.classList.remove("label-pic-activity-dragging")
        const draggableId = firstElTap.draggableId
        const source = {
            droppableId: firstElTap.droppableId,
            index: firstElTap.draggableIndex
        }
        const destination = {
            droppableId: droppableId,
            index: droppableSelected ? 0 : draggableIndex,
        }
        const result={
            source: source,
            destination: destination,
            draggableId: draggableId
        }
        
        onDragEnd(result)
        setFirstElTap(null)
    }
    return(
        <>
            <ActivityHeader 
                data ={data}
                mediumWindowWidth={mediumWindowWidth}
                smallWindowWidth = {smallWindowWidth}
                resetBtnOnClick ={resetBtnOnClick} 
                questionNum={questionNum}
                disableDnD ={disableDnD}
                toggleTap = {toggleTap}
                type="DnD"
            />
            <div className="label-pic-activity-container d-flex">
                <DragDropContext 
                    onDragEnd = {!disableDnD ? onDragEnd : null}
                    onDragStart = {!disableDnD ? onDragStart : null}
                >
                    <WordBank 
                        data={data}
                        firstElTap= {firstElTap}
                        //disableDnD = {disableDnD}
                        onTap = {disableDnD? onTap: null}
                        overallContainerClass = {"label-pic-activity-itemBank d-flex align-items-center flex-column full-size"}
                        columnContainerClass = {"label-pic-activity-itemBank-column-container w-100 flex-grow-1 d-flex flex-column"}
                        columnTitleClass = {"label-pic-activity-column-titles answer-choices"}
                        columnClass = {"label-pic-activity-itemBank-column"}
                        droppableClassName = {`label-pic-activity-itemBank-droppables d-flex flex-column w-100`}
                        draggableClassName = {"label-pic-activity-draggables d-flex align-items-center justify-content-center"}
                        innerDroppableClassName = {`${disableDnD && firstElTap? "label-pic-activity-tap-active ": ""}label-pic-activity-inner-droppable w-100 d-flex flex-column align-items-center`}
                        draggingOverClass={"label-pic-activity-draggable-over"}
                        isDraggingClass = {"label-pic-activity-dragging"}
                    />
                    
                    <LabelQuestionColumn 
                        data = {data}
                        firstElTap = {firstElTap}
                        onTap = {disableDnD? onTap: null}
                        popUpBgStyles={popUpBgStyles}
                        placeholderClass ={"label-pic-activity-droppables-placeholder"}
                        columnContainerClass = {"label-pic-activity-question-column flex-grow-1 d-flex flex-column w-100"}
                        droppableClassName = {"label-pic-activity-question-droppables d-flex flex-column w-100"}
                        innerDroppableClassName = {`${disableDnD && firstElTap? "label-pic-activity-tap-active ": ""}label-pic-activity-inner-droppable d-flex flex-column align-items-center w-100`}
                        draggableClassName= {"label-pic-activity-draggables d-flex align-items-center justify-content-center"}
                        draggingOverClass={"label-pic-activity-draggable-over"}
                        isDraggingClass ={"label-pic-activity-dragging"}
                        moreInfoBtn = {moreInfoBtn}
                        moreInfoOnClick={moreInfoOnClick}
                    />
                </DragDropContext>
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