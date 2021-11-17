import React, {useState, useRef, useEffect} from 'react'
import Timer from "./Timer"
import {DragDropContext} from 'react-beautiful-dnd';
import useWindowWidth from '../../../hooks/use-window-width'
/*
To-dos
Backend: 
    1. Missing updating the backend with partial completion of assignment
    2. Missing updating the backend with grade after completion
Frontend:
    1. Add animation transition when elements are removed 
    2. Missing progress saved on local storage/memory (if user exits out of page)
*/

//shuffles our given pairs order
const shuffleItems = (array) => {   
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}
//to render the closest square looking shape that exists for these tiles
//will return an array. 1st value is row, 2nd value, is columns
const nearestSquare = (array) =>{
    //check if a square exists
    //round up if no perfect square
    const sqrt = (array.length**0.5) % 1 === 0 ? array.length**0.5 : Math.floor(array.length**0.5 + 1) 
    //if no square, decrement column by 1
    //and check if its too small to fit all tiles.
    if (sqrt**2 === array.length) return [sqrt, sqrt]
    if (sqrt * (sqrt-1) < array.length) return  [sqrt, sqrt]
    else return [sqrt, sqrt-1]
}

const MatchActivityApp = ({activityData, questionNum, activityID}) => {
    const [state, setState] = useState(activityData)

    //if it exists, grab info from local storage on mount.
    useEffect(() => {
        let stored = localStorage.getItem(`${activityID}-match_activity_client_answer-${questionNum}`)
        if(!stored) return
        setState(JSON.parse(stored))
    }, [activityID, questionNum])
    
    const onTouchStart = () =>{
        
    }
    const onStart = (e) =>{
       

    }
    const onDrag = (e) =>{
        
    }
    const onStop = (e) => {
        let newMatchList = {}
        let newShuffleList = {}
        let store = [newMatchList, newShuffleList]
        localStorage.setItem(`${activityID}-match_activity_client_answer-${questionNum}`, JSON.stringify(store))
    }

    return(
        <>
        <div>
            <p>{}</p>
        </div>
        <p className="matchInstruction">Find the Match!</p>
        {  state["timer"] ?
            <div className="match-activity-timer d-flex justify-content-center align-items-center">
                <span>Time Left: </span>
                <Timer
                    timer={state.timer}
                    autoStart={false}
                />
            </div>
          : null 
        }
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