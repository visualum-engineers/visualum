import React, {useState, useEffect} from 'react'
import Timer from '../../timer/Timer';
import {DragDropContext} from 'react-beautiful-dnd';
//import useWindowWidth from '../../../hooks/use-window-width'
import MoreInfoBtn from '../../moreInfoBtn/MoreInfoBtn';
import DroppableArea from "../DragAndDrop/DroppableArea"
/*
To-dos
Backend: 
    1. Missing updating the backend with partial completion of assignment
    2. Missing updating the backend with grade after completion
Frontend:
    1. Add animation transition when elements are removed 
    2. Missing progress saved on local storage/memory (if user exits out of page)
*/

const transformData = (data, itemBankColumns) =>{
        let newData = {}
        //on mount (initial data loaded)
        newData["keyPairs"] = {}
        newData["itemBank"] = {}
        newData["answerChoices"] = {}
        newData["allItems"] = {}
        newData["categoryIDs"]= {}
        newData.timer = data.timer
        if(!data.itemBank){
            for(let i of data.keyPairs) {
                newData["keyPairs"][i.name] = []
                //generate key-pars sorting both category id, and i name.
                //This assumes both are unique! (which it should be)
                newData.categoryIDs[i.categoryID] = i.name
                newData.categoryIDs[i.name] = i.categoryID
            }
            
            for(let i=0; i<itemBankColumns; i++){
                const elementsPresent = (data.answerChoices.length)%itemBankColumns === 0 ? (data.answerChoices.length)/itemBankColumns : Math.floor((data.answerChoices.length)/itemBankColumns+1)
                const startSlice = i * elementsPresent 
                const endSlice = (i+1) * elementsPresent
                newData.itemBank["answerChoices-" + i] = data.answerChoices.slice(startSlice, endSlice).map((answer) =>{
                    return {id: answer.id, content: answer.content}
                })
            }
            //keep a record of all items in word bank. 
            // Needed to create 2 or 3 columns based on screen size
            for(let i of data.answerChoices){
                newData.allItems[i.id] = {id: i.id, content: i.content}
                newData.answerChoices[i.id] = {id: i.id, content: i.content}
            }
            
        }
        //when data was already transformed on mount 
        else {
            for(let i of Object.keys(data.keyPairs)) {
                newData["keyPairs"][i] = [...data.keyPairs[i]]
            }
                
            for(let i=0; i<itemBankColumns; i++){
                const keys = Object.keys(data.allItems)
                const elementsPresent = (keys.length)%itemBankColumns === 0 ? (keys.length)/itemBankColumns : Math.floor((keys.length)/itemBankColumns+1)
                const startSlice = i * elementsPresent 
                const endSlice = (i+1) * elementsPresent
                newData["itemBank"]["answerChoices-" + i] = keys.slice(startSlice, endSlice).map((answer) =>{
                    return data.answerChoices[answer]
                })
            }
            newData["allItems"] = {...data.allItems}
            newData["answerChoices"] = {...data.answerChoices}
            newData["categoryIDs"] = {...data.categoryIDs}
        }
        
        return newData
}

const MatchActivityApp = ({activityData, questionNum, activityID}) => {
    //const windowWidth = useWindowWidth()
    //const columns = windowWidth ? Array(2).fill(0) : Array(1).fill(0)
    const [data, setData] = useState(transformData(activityData, 2))
    //if it exists, grab info from local storage on mount.
    useEffect(() => {
        //on mount check local storage for data
        let stored = localStorage.getItem(`${activityID}-match_activity_client_answer-${questionNum}`)
        if(!stored) return
        setData(JSON.parse(stored))
    }, [activityID, questionNum])
    // //handle width resizing
    // useEffect(() => {
    //     setData((data) => transformData(data, columns.length))
    // }, [windowWidth, columns.length])

    //when dragging starts
    const onDragStart = (e) =>{
        //to prevent smooth scroll behavior from interfering with react-beautiful auto scroll
        document.querySelector("html").classList.add("sortActivityActive")
    }
    //while dragging
    const onDragUpdate = (e) =>{
        
    }
    //when dragging stops
    const onDragEnd = (result) =>{
        //to re-enable smooth scrolling for the remainder of the pages
        document.querySelector("html").classList.remove("sortActivityActive")
        //setup
        const {destination, source, draggableId} = result
        //means that nothing has changed
        if(!destination) return
        if(destination.droppableId === source.droppableId && destination.index === source.index) return
        //start and end containers
        const answerChoiceTestEl = (el) => /answerChoices.*/.test(el)
        const start = answerChoiceTestEl(source.droppableId) ? source.droppableId : data.categoryIDs[source.droppableId]
        const finish = answerChoiceTestEl(destination.droppableId) ? destination.droppableId : data.categoryIDs[destination.droppableId]

        const startContainerType = answerChoiceTestEl(start) ? "itemBank" : "keyPairs"
        const finishContainerType = answerChoiceTestEl(finish) ? "itemBank" : "keyPairs"
        //setup
        const startAnswersList = Array.from(answerChoiceTestEl(start) ? data.itemBank[start] : data.keyPairs[start])
        const finishAnswersList = Array.from(answerChoiceTestEl(finish) ? data.itemBank[finish] : data.keyPairs[finish])
        const sameContainer = start===finish
        let newState
        startAnswersList.splice(source.index, 1)
        
        //list container are same 
        //remove el from old index, add to new index
        if(sameContainer){
            startAnswersList.splice(destination.index, 0, data.answerChoices[draggableId]);
            newState = {
                ...data,
                [startContainerType]: {
                    ...data[startContainerType],
                    [start]: startAnswersList,
                }
            }
        } 
        //list containers are different - move elements into the new container, and remove them from old one
        else {
            finishAnswersList.splice(destination.index, 0, data.answerChoices[draggableId]);
            newState = startContainerType===finishContainerType ? {
                ...data,
                [startContainerType]:{
                    ...data[startContainerType],
                    [start] : startAnswersList,
                    [finish] : finishAnswersList,
                },
            }
            : {
                ...data,
                [startContainerType]:{
                    ...data[startContainerType],
                    [start] : startAnswersList,
                },
                [finishContainerType] : {
                    ...data[finishContainerType],
                    [finish] : finishAnswersList,
                }
            }
        } 
        //console.log(start, finish, data.categoryIDs[start], data)
        //maintain itembank across resize, since we have to generate multiple columns
        if(startContainerType==="itemBank") delete newState.allItems[draggableId]
        if(finishContainerType==="itemBank") newState.allItems[draggableId] = data.answerChoices[draggableId]
        
        //update state
        setData(newState)
        localStorage.setItem(`${activityID}-match_activity_client_answer-${questionNum}`, JSON.stringify(newState))
    }
    
    return(
        <>
        <div className="d-flex justify-content-center">
            <div className="match-activity-header d-flex justify-content-center">
                {data.timer ?
                    <div className="match-activity-timer d-flex justify-content-center align-items-center">
                        <span>TIME:</span>
                        <Timer
                            timer={data.timer}
                            autoStart={false}
                        />
                    </div>
                : null 
                }
            </div>    
        </div>
        
        <DragDropContext onDragEnd = {onDragEnd} onDragUpdate={onDragUpdate} onDragStart={onDragStart}>
            <div className="match-activity-columns d-flex justify-content-center">
                <div className="match-activity-keys-column w-50 d-flex flex-column align-items-center">
                    {Object.keys(data.keyPairs).map((content,index)=>{
                        let last = index===Object.keys(data.keyPairs).length-1
                        return (
                            <div key={index} className={`match-activity-keys w-100 d-flex align-items-center justify-content-center ${last? "last-item":""}`}>
                                <p className="w-100 d-flex flex-column justify-content-center align-items-center">{content}</p>
                            </div>
                        )
                    })}
                </div>
            
                <div className="match-activity-answers-column w-50 d-flex flex-column align-items-center">
                <div className="match-activity-timer-positioning">
                    <MoreInfoBtn 
                        textContent = "Match the items in the word bank with those on the left column. The items can be dragged, or moved with the keyboard"
                        customContainerClass = "match-activity-instructions"
                        customContainerAriaLabel = "activity-instructions"
                        customDropDownID = "match-activity-instructions"
                        setTimeoutOnMount = {5000}
                    />
                </div>
                    {Object.keys(data.keyPairs).map((content, index)=>{
                        let last = index===Object.keys(data.keyPairs).length-1
                        return (
                            <DroppableArea 
                                key={data.categoryIDs[content]} 
                                id={data.categoryIDs[content]}
                                content = {data.keyPairs[content]}
                                droppableClassName = {`match-activity-answers-droppables w-100 ${last? "last-item":""}`}
                                draggableClassName = {"match-activity-draggables d-flex align-items-center justify-content-center"}
                                innerDroppableClassName = {"match-activity-inner-droppable w-100 h-100 d-flex flex-column justify-content-center align-items-center"}
                                draggingOverClass={"match-activity-draggable-over"}
                                isDraggingClass={"match-activity-dragging"}
                            />
                        )
                    })}
                </div>
            </div>

            <div className="d-flex justify-content-center">
                <div className="match-activity-itemBank w-100 d-flex justify-content-center">

                    {Object.keys(data.itemBank).map((key, index)=>{
                        let last = index===Object.keys(data.itemBank).length-1
                        return (
                            <div key={key} className={`match-activity-itemBank-column-${index+1} w-50 d-flex flex-column align-items-center`}>
                                <DroppableArea 
                                    id={key}
                                    content = {data.itemBank[key]}
                                    droppableClassName = {`match-activity-itemBank-droppables w-100 ${last? "last-item":""}`}
                                    draggableClassName = {"match-activity-draggables d-flex align-items-center justify-content-center"}
                                    innerDroppableClassName = {"match-activity-inner-droppable w-100  d-flex flex-column justify-content-center align-items-center"}
                                    draggingOverClass={"match-activity-draggable-over"}
                                    isDraggingClass = {"match-activity-dragging"}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </DragDropContext>
        
     </>
    )
}
export default MatchActivityApp
//import GridTiles from './GridTiles'
/*prev state*/
    // //for updating redux store(data to be sent to backend)
    // const [matchPair, setMatchPair] = useState(activityData.matchPair)
    // //we only shuffle tiles once at the start
    // const [tileShuffle, setTileShuffle] = useState(shuffleItems(Object.keys(activityData.matchPair)))
    // //check if all tiles have been matched or not
    // const allTilesMatched = tileShuffle.every(tile => !tile)
// //store starting and final elements
    // const [startEl, setStartEl] = useState(null)
    // const finalEl = useRef(null)
    // //determine if we are on mobile, for grid layout of 2 colums
    // const windowWidth = useWindowWidth() 
    // //determine column and rows of grid (for mobile and desktop)
    // const gridShape = nearestSquare(Object.keys(tileShuffle))
    // const rows = !windowWidth? Array(tileShuffle.length/2).fill(0): Array(gridShape[1]).fill(0)
    // const columns= !windowWidth? 2: gridShape[0] 
    // //for touch input, we search through this to determine if an overlay exists
    // const newTilesPos = useRef(null)
    // //to disable drag event so it doesnt fire all the time
    // let dragEvtDisabled = false
    // //handle adding tiles to end of activity to fill last row if needed.
    // if(rows.length*columns !== tileShuffle.length){
    //     let newTiles = [...tileShuffle]
    //     for (let i=0; i<rows.length*columns-tileShuffle.length; i++){
    //         newTiles.push(null)
    //     }
    //     setTileShuffle(newTiles)
    // }    
    // //grab positions of all other tiles. Necessary for detect overlay on touch inputs
    // const grabTilePos = () =>{
    //     const allTiles = document.querySelectorAll(".gridTiles");
    //     newTilesPos.current = Object.keys(allTiles).map((content)=>{
    //             if(allTiles[content]===startEl) return null
    //             return [allTiles[content].getBoundingClientRect(), allTiles[content].id]
    //         })
    // }
    // //handles autoscrolling,
    // const autoScroll = () =>{
    //     if(!startEl) return
    //     const startTilePos = startEl.getBoundingClientRect()
    //     if(startTilePos.top <= 30) window.scrollBy({top:-startTilePos.height, behavior: 'smooth'})
    //         //startEl.style.transform = `translate(${startXTransform}px,${startYTransform -startTilePos.height}px)`
            
    //     if(startTilePos.bottom >= window.innerHeight-30) window.scrollBy({top: startTilePos.height, behavior: 'smooth'})
    //         //startEl.style.transform = `translate(${startXTransform}px,${startYTransform + startTilePos.height}px)`
    // }
/*onTouch*/
// startEl.classList.add("active")
        // grabTilePos();
/*onStart*/
 // e.preventDefault()
        // setStartEl(e.target.closest("div"))
        // document.querySelector("body").style.cursor = "grabbing"
/* onDrag */
// if(!dragEvtDisabled){
        //     dragEvtDisabled = true
        //     autoScroll();
        //     // for touch events
        //     if(e.type==="touchmove"){
        //         grabTilePos();
        //         const startXPos = e.touches[0].clientX
        //         const startYPos = e.touches[0].clientY
        //         let overlapEl
        //         for(let tile of newTilesPos.current){
        //             if(!tile || !tile[0]) continue;
        //             //check width parameters
        //             if(!(startXPos>=tile[0].x && startXPos<tile[0].right)) continue;
        //             //check height parameters and update final el
        //             if(startYPos>=tile[0].y && startYPos<tile[0].bottom){
        //                 overlapEl = document.getElementById(tile[1])
        //                 if(finalEl.current && finalEl.current!==overlapEl)finalEl.current.classList.remove("hover")
        //                 finalEl.current = overlapEl
        //                 finalEl.current.classList.add("hover")
        //             }
        //         }
        //     }else{
        //         //for click events 
        //         finalEl.current = e.target.closest("div")
        //     }
        //     //restore function
        //     setTimeout(()=>{
        //         dragEvtDisabled = false
        //     }, 150)
        // }
/* onStop */
// //return default styling
        // document.querySelector("body").style.cursor = "auto"
        // if(finalEl.current)finalEl.current.classList.remove("hover")
        // //setup
        // const final = !finalEl.current ? null: finalEl.current.getAttribute("content")
        // const start = startEl.getAttribute("content")
        // const newMatchList = Object.assign({}, matchPair)
        // const newShuffleList = [...tileShuffle]
        // //reset startEl 
        // setStartEl(null)
        // finalEl.current = null
        // //when elements are not considered a matching pair
        // //it will simply return item to original position
        // if(matchPair[start] !== final) return

        // //when elements are a matching pair
        // //it will remove it and replace it with an empty grid tile
        // newShuffleList.splice(newShuffleList.indexOf(start),1, false)
        // newShuffleList.splice(newShuffleList.indexOf(final),1, false)
        
        // delete newMatchList[start]
        // delete newMatchList[final]
        
        // setMatchPair(newMatchList)
        // setTileShuffle(newShuffleList)
        //update local storage
/*renders tile grid*/
        /* <div className = "gridLayout">
            {allTilesMatched ? <p className="tilesMatchedMessage">You Matched Everything!</p>
              : rows.map((content,rowIndex)=>{
                return(
                    <div key={rowIndex} className="row g-0">
                        {tileShuffle.slice((rowIndex)*columns, (rowIndex+1)*columns).map((content, index)=>{
                            if(!content) return <div key={index+columns*rowIndex} className="col m-2 tile"><div className="emptyTile"></div></div>
                            return (
                                <div key={index+columns*rowIndex}  className="col m-2 tile">
                                    <GridTiles 
                                        onTouchStart={onTouchStart}
                                        onStop = {onStop}
                                        onDrag = {onDrag}
                                        onStart = {onStart}
                                        id={"gridTile-"+(index+columns*rowIndex)} 
                                        content = {content} 
                                        startEl = {startEl}
                                        finalEl = {finalEl.current? finalEl.current.id === "gridTile-"+(index+columns*rowIndex): false}
                                    />
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div> */