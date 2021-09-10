import React, {useState, useRef, useEffect} from 'react'
import DraggableCore from 'react-draggable';

const GridTiles = ({id, content, index, onStop, onDrag, onStart, gridSize})=>{
    const nodeRef = useRef(null)
    
    //this will set bounds so element is limited to gridLayout area
    const [bounds, setBounds] = useState(null)
    //gets four corners of tile element
    const tileRect = useTilePosition()
    
    // Hook for resizing of window changing tile position
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

    const onMouseDown = () =>{
        //will update draggable bounds of element
            setBounds({
                top: gridRect.top - tileRect.rect.top+100,
                bottom: gridRect.bottom - tileRect.rect.bottom,
                left:  -tileRect.rect.left,
                right: gridRect.right - tileRect.rect.right
            })
    }

    //gets coordinates of all four corners of the grid layout that all tiles will reside in
    const gridRect = gridSize.rect 
 
    return(
        <DraggableCore 
            key={id} 
            index={index}
            defaultPosition={{x: 0, y: 0}}
            position={{x:0, y:0}}
            onMouseDown ={onMouseDown}
            onStart = {onStart}
            onStop = {onStop}
            onDrag = {onDrag}
            bounds = {bounds}
            nodeRef={nodeRef}
           >
                <div 
                    id={id}
                    className="gridTiles d-flex align-items-center justify-content-center col-5 col-sm-3 col-lg-2" 
                    content={content} 
                    ref={nodeRef} >
                        <p>{content}</p>
                </div>          
        </DraggableCore>
    )
}
export default GridTiles