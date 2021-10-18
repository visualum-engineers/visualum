import React, {useState, useRef, useEffect, memo} from 'react'
import DraggableCore from 'react-draggable';
import debounce from 'lodash/debounce'

const GridTiles = ({id, content, onStop, onDrag, onStart, onTouchStart, startEl=false})=>{
    //this will set bounds so element is limited to gridLayout area
    const [bounds, setBounds] = useState(false)

    const nodeRef = useRef(null)
    //gets four corners of tile element
    const tilePosition = useRef(null)
     //store current container size. Necessary for updating tile bounds
    const gridSize = useRef(null);

    // Hook for resizing of window changing tile position
    useEffect(() => {
        function handleResize() {
            // Set gridLayout width/height to state
            if(document.getElementById(id)){
                tilePosition.current = {
                    rect: document.getElementById(id).getBoundingClientRect(),
                }
            }
            if(document.querySelector(".gridLayout")){
                gridSize.current = {
                    rect: document.querySelector(".gridLayout").getBoundingClientRect(),
                };
            }
        }
        const debouncedHandleResize = debounce(handleResize, 100)
        
        if(!tilePosition.current) tilePosition.current =  {
            rect: document.getElementById(id).getBoundingClientRect()
        }
        if(!gridSize.current) gridSize.current ={
            rect: document.querySelector(".gridLayout").getBoundingClientRect(),
        }
        
        // Add event listener
        window.addEventListener("resize", debouncedHandleResize);
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", debouncedHandleResize);
    }, [id]); // Empty array ensures that effect is only run on mount

    const onMouseDown = () =>{
        //will update draggable bounds of element
        //gets coordinates of all four corners of the grid layout that all tiles will reside in
        setBounds({
            top: gridSize.current.rect.top - tilePosition.current.rect.top,
            bottom: gridSize.current.rect.bottom - tilePosition.current.rect.bottom,
            left:  gridSize.current.rect.left-tilePosition.current.rect.left,
            right:  gridSize.current.rect.right- tilePosition.current.rect.right
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
    return startEl; 
}
export default memo(GridTiles, arePropsEqual)
