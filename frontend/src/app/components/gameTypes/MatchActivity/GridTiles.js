import React, { useState, useEffect} from 'react'
import Draggable from 'react-draggable';

const GridTiles = ({id, content, index, onDragEnd, nodeRef, size})=>{
    const [tileBounds, setTileBounds] = useState(null)

    //gets coordinates of all four corners of the grid layout that all tiles will reside in
    const gridRect = size.rect

    //gets four corners of tile element
    const tileRect = useTilePosition()

    //stores difference between mouse x-coordinate, and left-corner of element
    let xOffset

    // Hook for resizing of Tiles
    function useTilePosition() {
        const [tilePosition, setTilePosition] = useState({rect: undefined});
        useEffect(() => {
     
        function handleResize() {
            // Set gridLayout width/height to state
            setTilePosition({
                rect: document.getElementById(id).getBoundingClientRect(),
            });
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
        }, []); // Empty array ensures that effect is only run on mount
        return tilePosition;
    }

    const onStart = (e) =>{
        //updates difference between mouse x-coordinate and left-corner of element
        xOffset = Math.floor(tileRect.rect.right + 5) - e.clientX
    }

    const onDrag =(e, data) =>{
        //prevents element from being dragged out of bounds
        if(Math.abs(e.clientX + xOffset) >= gridRect.right){
            setTileBounds({
                right :gridRect.right - tileRect.rect.right
            })
        }
    }

    const onStop = (e, data) =>{
        
    }
    
    return(
        <Draggable 
            key={id} 
            index={index}
            defaultPosition={{x: 0, y: 0}}
            position={{x:0, y:0}}
            onStart={onStart}
            onDrag = {onDrag}
            onStop = {onDragEnd}
            nodeRef={nodeRef}
            bounds = {tileBounds}
           >
                <div id={id} className="gridTiles d-flex align-items-center justify-content-center col-5 col-sm-3 col-lg-2" ref={nodeRef} >
                    <p>{content}</p>
                </div>          
        </Draggable>
    )
}
export default GridTiles