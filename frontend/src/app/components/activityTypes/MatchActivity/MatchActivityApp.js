import React, {useState,useEffect} from 'react'
import GridTiles from './GridTiles'
import Timer from "./Timer"
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

const MatchActivityApp = ({activityData}) => {
    //for updating redux store(data to be sent to backend)
    const [state, setState] = useState(activityData.matchPair)

    //for shuffling tile positions
    const shuffleArray = shuffleItems(Object.keys(activityData.matchPair))
    
    //for internal component rendering
    //since we only shuffle once at the start
    const [tileShuffle, setTileShuffle] = useState(shuffleArray)
   
    //Necessary for drag and drop bounds to work and not cause overflow on drag
    const useGridSize = () => {
        const [gridSize, setGridSize] = useState({width: undefined, height: undefined, rect: undefined});
        useEffect(() => {
            function handleResize() {
                // Set gridLayout width/height to state
                setGridSize({
                    rect: document.querySelector(".activity-type-container").getBoundingClientRect(),
                });
            }
        // Add event listener
        window.addEventListener("resize", handleResize);
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
        }, []); // Empty array ensures that effect is only run on mount
        return gridSize;
    }
    const gridSize = useGridSize();

    //determine column and rows of grid
    const gridShape = nearestSquare(Object.keys(activityData.matchPair))
    const rows = Array(gridShape[1]).fill(0)
    const columns=gridShape[0]

    //check if all tiles have been matched or not
    const allTilesMatched = tileShuffle.every(tile => tile === null)
   
    //starting (current dragging element) 
    // and final element (current element being overlapped) 
    let startEl
    let finalEl
    let newTilesPos
    const onTouchStart = () =>{
        startEl.classList.add("active")
        //grab positions of all other tiles. Necessary for detect overlay on touch inputs
        const allTiles = document.querySelectorAll(".gridTiles");
        newTilesPos = Object.keys(allTiles).map((content)=>{
            if(allTiles[content]===startEl) return null
            return [allTiles[content].getBoundingClientRect(), allTiles[content].id]
        })
    }
    const onStart =(e) =>{
        e.preventDefault()
        //updates selected element
        startEl = e.target.closest("div") 
        document.querySelector("body").style.cursor = "grabbing"
    }

    let isDisabled = false
    const onDrag = (e) =>{
        if(!isDisabled){
            isDisabled = true
            //scrolls page automatically in 50px increments 
            if(startEl.getBoundingClientRect().top <= 0) {
                window.scrollBy({top: -50, behavior:"smooth"})
            }
            if(startEl.getBoundingClientRect().bottom >= window.innerHeight) {
                window.scrollBy({top: 50})
            }
            //for touch events
            //if performance becomes issue,move this if-else to onStop 
            //function and replace touches with changedTouches
            if(e.type==="touchmove"){
                //touches for move, changedtouches for touchend
                const startXPos = e.touches[0].clientX
                const startYPos = e.touches[0].clientY
                let overlapEl
                //find which element touch input currently overlaps with
                for(let tile of newTilesPos){
                    if(!tile || !tile[0]) continue;
                    //check width parameters
                    if(!(startXPos>=tile[0].x && startXPos<tile[0].right)) continue;
                    //check height parameters and update final el
                    if(startYPos>=tile[0].y && startYPos<tile[0].bottom){
                        overlapEl = document.getElementById(tile[1])
                        if(finalEl && finalEl!==overlapEl)finalEl.classList.remove("hover")
                        finalEl = overlapEl
                        finalEl.classList.add("hover")
                    }
                }
            }else{
                //for click events 
                finalEl = e.target.closest("div")
            }
            //restore function
            setTimeout(()=>{
                isDisabled = false
            }, 150)
        }
    } 
    const onStop = () => {
        //return default styling
        document.querySelector("body").style.cursor = "auto"
        if(finalEl)finalEl.classList.remove("hover")

        //updates the overlapping element
        const final = !finalEl ? null: finalEl.getAttribute("content")
        const start = startEl.getAttribute("content")
        const newMatchList = Object.assign({}, state)
        const newShuffleList = [...tileShuffle]
        
        //when elements are not considered a matching pair
        //it will simply return item to original position
        if(state[start] !== final) return

        //when elements are considered a matching pair
        //it will remove the element pair
        //and replace it with an empty grid tile
        newShuffleList.splice(newShuffleList.indexOf(start),1, null)
        newShuffleList.splice(newShuffleList.indexOf(final),1, null)
        
        delete newMatchList[start]
        delete newMatchList[final]
        
        setState(newMatchList)
        setTileShuffle(newShuffleList)
    }

    return(
        <>
        <p className="matchInstruction">Match the following</p>
        <Timer/>
        {/*renders tile grid*/}
        <div className = "gridLayout d-flex justify-content-center">
            { allTilesMatched ? <p className="tilesMatchedMessage">You Matched Everything!</p>
              : rows.map((content,rowIndex)=>{
                return(
                    <div key={rowIndex} className="d-flex flex-column w-100">
                        {tileShuffle.slice((rowIndex)*columns, (rowIndex+1)*columns).map((content, index)=>{
                            if(content === null) return <div key={index} className="emptyTile"></div>
                            return <GridTiles 
                                onTouchStart={onTouchStart}
                                gridSize ={gridSize}
                                onStop = {onStop}
                                onDrag = {onDrag}
                                onStart = {onStart}
                                key={index+columns*rowIndex} 
                                id={"gridTile-"+(index+columns*rowIndex)} 
                                index ={index}
                                content = {content}
                            />
                        })}
                    </div>
                )
            })}
        </div>
        </>
    )
}

export default MatchActivityApp