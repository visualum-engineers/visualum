import React, {useState, useRef, useEffect} from 'react'
import GridTiles from './GridTiles'
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
    3. Missing answer validation (check if their sorting is correct)
    4. Missing re-rendering logic, when user answers question and moves on to the next one.
    5. Missing progress saved on local storage/memory (if user exits out of page)
*/
const activityData = {
    1: {
        "Pair1":"Pair1-", 
        "Pair2":"Pair2-", 
        "Pair3":"Pair3-", 
        "Pair1-":"Pair1",
        "Pair2-":"Pair2", 
        "Pair3-":"Pair3",
    },
}
const MatchActivityApp = () => {
    const currQuestion = 1
    const [state, setState] = useState(activityData)
    
    const nodeRef = useRef(null)
    const gridSize = useGridSize();

    // Hook for resizing of Grid
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

    let startEl
    let finalEl

    const onStart =(e) =>{
        //updates selected element
        startEl = e.target.closest("div") 
        //disable events for selected elements
        startEl.style.pointerEvents = "none"
    }
    const onDrag = (e) =>{
        //updates the overlapping element
        finalEl = e.target.closest("div")
    }
    
    const onStop = () => {
        const final = !finalEl ? null: finalEl.getAttribute("content")
        const start = startEl.getAttribute("content")
        const newMatchList = Object.assign({}, state[currQuestion])
        
        //restore events for selected element
        startEl.style.pointerEvents = "all"

        //when elements are not considered a matching pair
        //it will simply return item to original position
        if(state[currQuestion][start] !== final) return

       //when elements are considered a matching pair
       //it will remove the element pair
        delete newMatchList[start]
        delete newMatchList[final]
        setState({
            ...state,
            [currQuestion]: newMatchList
        })
    }

    
    return(
        <div className="matchActivityApp d-flex flex-column align-items-center">
            <p className="matchInstruction">Match the following</p>
            <div className = "gridLayout d-flex justify-content-center flex-wrap">
                {Object.keys(state[currQuestion]).map((content, index)=>{
                    return <GridTiles 
                                gridSize ={gridSize}
                                onStop = {onStop}
                                onDrag = {onDrag}
                                onStart = {onStart}
                                key={index} 
                                id={index} 
                                index ={index}
                                content = {content}
                                nodeRef = {nodeRef}
                                />
                })}
            </div>
        </div>
    )
}

export default MatchActivityApp