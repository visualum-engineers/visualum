import { useState, useRef} from "react"
export function applyOnResizeStartStyles(width = true){
    //declartive styles so 
    //touch inputs do not trigger scroll on mobile
    const body = document.querySelector("body")
    document.querySelector("html").style.touchAction = "none"
    //body.style.touchAction = "none"
    body.style.cursor = "ns-resize"
    if(!width) body.style.overflow = "hidden"
}
export function applyOnResizeEndStyles(width = true) {
    //declartive styles so 
    //touch inputs do not trigger scroll on mobile
    const body = document.querySelector("body")
    document.querySelector("html").style.touchAction = "auto"
    //body.style.touchAction = "auto"
    body.style.cursor = null
    if(!width) body.style.overflow = null
}
export function horizontalMove ({
    left,
    right,
    east,
    west,
    currPointerX,
    prevPointerX
}){
    //return default values
    if(!left && !east) return {left: left, east: east, width: east - left}

    let newLeft, newRight, pointerDiff
    if(east){
        pointerDiff = currPointerX - prevPointerX
        newRight = right + pointerDiff
        newLeft = left
    }
    if(west){
        pointerDiff = prevPointerX - currPointerX
        newLeft = left + pointerDiff
        newRight = right
    }
    const newWidth = (right - left) + pointerDiff
    return {width: newWidth, left: newLeft, right: newRight}
}

export function verticalMove ({
    top,
    bottom,
    south, 
    north,
    currPointerY,
    prevPointerY
}) {
    //return default values
    if(!south && !north) return {top: top, bottom: bottom, height: bottom - top}
    let newTop, newBottom, pointerDiff
    
    if(south){
        pointerDiff = currPointerY - prevPointerY
        newBottom = bottom + pointerDiff
        newTop = top
    }
    if(north){
        pointerDiff = prevPointerY - currPointerY
        newTop = top + pointerDiff
        newBottom = bottom
    }
    const newHeight = (bottom - top) + pointerDiff
    return {height : newHeight, top: newTop, bottom: newBottom}
}

export const useResizable = ({
    initialPos = null,
}) =>{
    const [currPos, setPos] = useState(initialPos)
    const initialNodePos = useRef(null)

    const onResizeStart = ({
        e, 
        node
    }) => {
        const pointerX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX
        const pointerY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY 
        const rect = node.getBoundingClientRect()
        rect["pointerX"] = pointerX
        rect["pointerY"] = pointerY 
        initialNodePos.current = rect
    }
    const onResizeMove=({
        e, 
        handlePos,
    })=>{
        if(!handlePos || !e || !initialNodePos.current) return
        const {north, east, west, south} = handlePos
        const rect = initialNodePos.current
        const pointerX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX
        const pointerY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY

        const horizontalPos = horizontalMove({
                                currPointerX: pointerX,
                                prevPointerX: rect.pointerX,
                                east : east,
                                west: west,
                                left: rect.left,
                                right: rect.right,
                            })

        const verticalPos = verticalMove({
                                currPointerY: pointerY,
                                prevPointerY: rect.pointerY,
                                north: north,
                                south: south, 
                                top: rect.top,
                                bottom: rect.bottom,
                            })
        const newPos = {
            ...horizontalPos,
            ...verticalPos
        }
        setPos(newPos)
        return newPos 
    }
    const onResizeEnd = (e) => {
        initialNodePos.current = null
    }
    return [
        currPos, 
        onResizeStart, 
        onResizeMove, 
        onResizeEnd
    ]
}

export default useResizable