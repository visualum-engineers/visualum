import { useState } from "react"
const verticalMove = ({
    top,
    bottom,
    south, 
    north,
    pointerY
}) =>{
    //return default values
    if(!south || !north) return {top: top, bottom: bottom, height: bottom - top}
    
    let newHeight, newTop, newBottom
    if(south){
        newHeight = pointerY - top
        newBottom = pointerY 
        newTop = top
    }
    if(north){
        newHeight =  bottom - pointerY
        newTop = pointerY 
        newBottom = bottom
    }
    return {height : newHeight, top: newTop, bottom: newBottom}
}

const horizontalMove = ({
    left,
    right,
    east,
    west,
    pointerX
}) =>{
    //return default values
    if(!left || !east) return {left: left, east: east, width: east - left}

    let newWidth, newLeft, newRight
    if(east){
        newWidth = pointerX - left 
        newRight = pointerX
        newLeft = left
    }
    if(west){
        newWidth = right - pointerX 
        newLeft = pointerX
        newRight = right

    }
    return {width: newWidth, left: newLeft, right: newRight}
}

const useResizable = ({
    initialPos = null,
}) =>{
    const [currPos, setPos] = useState(initialPos)
    
    const onResizeMove=({
        e, 
        node,
        handlePos,
    })=>{
        if(!handlePos || node || e) return
        const pointerX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX
        const pointerY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY
        const rect = node.getBoundingClient()
        const {north, east, west, south} = handlePos

        const horizontalPos = horizontalMove({
                                pointerX: pointerX,
                                east : east,
                                west: west,
                                left: rect.left,
                                right: rect. right,
                            })

        const verticalPos = verticalMove({
                                pointerY: pointerY,
                                north: north,
                                south: south, 
                                top: rect.top,
                                bottom: rect.bottom
                            })
        
        const newPos = {
            ...horizontalPos,
            ...verticalPos
        }
        setPos(newPos)
        return newPos 
    }
    return [currPos, onResizeMove]
}

export default useResizable