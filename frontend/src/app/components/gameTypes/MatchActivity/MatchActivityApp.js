import React, {useState, useRef, useEffect} from 'react'
import GridTiles from './GridTiles'

const activityData = {
    1: {
        "Hi":"Okay", 
        "Okay":"Hi", 
        "Bye":"No", 
        "No":"Bye",
        "Cool":"But", 
        "But":"Cool",
    },
}
const MatchActivityApp = () => {
    const currQuestion = 1
    const [state, setstate] = useState(activityData)
    const [position, setPosition] = useState({x:"0", y:"0"})
    const nodeRef = useRef(null)
    const size = useGridSize();

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

    const onDragEnd = (e, data) => {
        //if the elements are not considered a matching pair
       console.log(e)
        //if the elements are considered a matching pair
    }
    return(
        <div className="matchActivityApp d-flex flex-column align-items-center">
            <p>Match the following Tiles</p>
            <div className = "gridLayout d-flex justify-content-center flex-wrap">
                {Object.keys(state[currQuestion]).map((content, index)=>{
                    return <GridTiles 
                                size ={size}
                                onDragEnd = {onDragEnd}
                                key={index} 
                                id={index} 
                                index ={index}
                                content = {content}
                                nodeRef = {nodeRef} 
                                {...state}/>
                })}
            </div>
        </div>
    )
}

export default MatchActivityApp