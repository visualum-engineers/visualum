import React, {useState, useEffect} from 'react'
import GridTiles from './GridTiles'
import ActivityBtns from '../NavActivityBtn/ActivityBtns'
/*
To-dos
Backend: 
    1. Missing updating the backend with partial completion of assignment
    2. Missing updating the backend with grade after completion
Frontend:
    1. Adding selecting logic for activity to work on mobile device
        - Relevant code affecting this, is located in onStart 
          and onDrag function and nowhere else. 
          onStop function logic does not need to be changed
            -The issue arises because on mobile, startEl and
             finalEl will be selecting the element being dragged
             when only the startEl should be selecting it.
             The finalEl SHOULD be selecting the element underneath
             the one being dragged
    2. Add animation transition when elements are removed 
    3. Missing re-rendering logic, when user answers question and moves on to the next one.
    4. Missing progress saved on local storage/memory (if user exits out of page)
*/

//Fisher-Yates shuffling algo
//shuffles our given pairs order
function shuffleItems(array){   
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

const MatchActivityApp = ({last, prev, onNavBtnClick, activityData}) => {
    //for shuffling tile positions
    const shuffleArray = shuffleItems(Object.keys(activityData.matchPair))

    //for state
    const [state, setState] = useState(activityData.matchPair)
    const [tileShuffle, setTileShuffle] = useState(shuffleArray)
    
    //for determining question order. 
    //Important to determine navBtns continue, prev, or submit
    const prevQuestion = prev
    const lastQuestion = last

    // Hook for resizing of Grid. 
    //Necessary for drag and drop bounds to work
    const gridSize = useGridSize();
    function useGridSize() {
        const [gridSize, setGridSize] = useState({width: undefined, height: undefined, rect: undefined});
        useEffect(() => {
            function handleResize() {
                // Set gridLayout width/height to state
                setGridSize({
                    rect: document.querySelector(".matchActivityApp").getBoundingClientRect(),
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

    //for comparing the starting (current dragging element)
    //and final element (current element being overlapped) 
    // and see if a match exists
    let startEl
    let finalEl

    const onStart =(e) =>{
        e.preventDefault()
        //updates selected element
        startEl = e.target.closest("div") 
        //disable events for selected element
        startEl.style.pointerEvents = "none"
    }
    const onDrag = (e) =>{
        //updates the overlapping element
        finalEl = e.target.closest("div")
        
    }
    
    const onStop = () => {
        const final = !finalEl ? null: finalEl.getAttribute("content")
        const start = startEl.getAttribute("content")
        //copy object
        const newMatchList = Object.assign({}, state)
        const newShuffleList = [...tileShuffle]
        //restore events for selected element
        startEl.style.pointerEvents = "all"

        //when elements are not considered a matching pair
        //it will simply return item to original position
        if(state[start] !== final) return

       //when elements are considered a matching pair
       //it will remove the element pair
        newShuffleList.splice(newShuffleList.indexOf(start),1)
        newShuffleList.splice(newShuffleList.indexOf(final),1)
        
        delete newMatchList[start]
        delete newMatchList[final]
        
        setState(newMatchList)
        setTileShuffle(
            newShuffleList
        )
    }

    return(
        <div className = "d-flex justify-content-center">
            <div className="matchActivityApp d-flex flex-column align-items-center col-11 col-md-9 col-xl-8">
                <p className="matchInstruction">Match the following</p>
                <div className = "gridLayout d-flex justify-content-center flex-wrap">
                    {/*renders tiles to match*/}
                    {tileShuffle.map((content, index)=>{
                        return <GridTiles 
                                    gridSize ={gridSize}
                                    onStop = {onStop}
                                    onDrag = {onDrag}
                                    onStart = {onStart}
                                    key={index} 
                                    id={index} 
                                    index ={index}
                                    content = {content}
                                    />
                    })}
                </div>

                <div className = {`d-flex col-10 col-sm-9 col-lg-10 ${!prevQuestion ? "justify-content-end":"justify-content-between"}`}>
                    <ActivityBtns 
                                prevQuestion = {prevQuestion} 
                                lastQuestion = {lastQuestion}
                                onNavBtnClick = {onNavBtnClick}
                                />
                </div>
            </div>
        </div>
    )
}

export default MatchActivityApp