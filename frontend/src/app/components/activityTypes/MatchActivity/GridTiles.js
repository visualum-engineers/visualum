import React, {useState, useRef, useEffect, memo} from 'react'
import DraggableCore from 'react-draggable';

const GridTiles = ({id, content, onStop, onDrag, onStart, onTouchStart, gridSize, startEl=false})=>{
    console.log(id)
    const nodeRef = useRef(null)
    //this will set bounds so element is limited to gridLayout area
    const [bounds, setBounds] = useState(false)

    //gets four corners of tile element
    const [tilePosition, setTilePosition] = useState({rect: undefined});
    
    // Hook for resizing of window changing tile position
    useEffect(() => {
        function handleResize() {
            // Set gridLayout width/height to state
            setTilePosition({
                rect: document.getElementById(id).getBoundingClientRect(),
            });
        }
        if(!tilePosition.rect) setTilePosition({
            rect: document.getElementById(id).getBoundingClientRect()
        })
        // Add event listener
        window.addEventListener("resize", handleResize);

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, [id, tilePosition.rect]); // Empty array ensures that effect is only run on mount
    
    const onMouseDown = () =>{
        //will update draggable bounds of element
        //gets coordinates of all four corners of the grid layout that all tiles will reside in
            setBounds({
                top: gridSize.rect.top - tilePosition.rect.top+90,
                bottom: gridSize.rect.bottom - tilePosition.rect.bottom,
                left:  gridSize.rect.left-tilePosition.rect.left,
                right:  gridSize.rect.right- tilePosition.rect.right
            })
    }
 
    return(
        <DraggableCore 
            key={id} 
            defaultPosition={{x: 0, y: 0}}
            position={{x:0, y:0}}
            onMouseDown ={onMouseDown}
            onStart = {onStart}
            onStop = {onStop}
            onDrag = {onDrag}
            bounds = {bounds}
            nodeRef={nodeRef}
            disabled={startEl ? !(startEl.id===id): startEl}
           >
            <div 
                onTouchStart={onTouchStart}
                tabIndex="0"
                id={id}
                className={`gridTiles d-flex align-items-center justify-content-center`}
                content={content} 
                ref={nodeRef} >
                    <p>{content}</p>
            </div>          
        </DraggableCore>
    )
}
function arePropsEqual(prevProps, nextProps) {
    const startEl = prevProps.startEl===nextProps.startEl
    const gridSize = prevProps.gridSize === nextProps.gridSize
    return startEl && gridSize; 
}
export default memo(GridTiles, arePropsEqual)
