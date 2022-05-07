import { useEffect, useRef} from "react"
import {
    useResizable, 
    applyOnResizeEndStyles, 
    applyOnResizeStartStyles
} from "./use-resizable"
import ResizableHande from "../components/utilities/resizable/ResizableHandle"
import useWindowWidth from "./use-window-width"

/* 
* This is an abstraction for the use-resizable hook
* This hook uses the entire body element to be the area
* where elements can be resized, instead of a custom one
*/

// const handleParentTouchAction = (node, eType) =>{
//     if(!node || node.isEqualNode(document)) return
//     const nodeHeight = node.clientHeight 
//     const nodeScrollHeight = node.scrollHeight 
//     //if ending event
//     //if(eType === "end" && (nodeScrollHeight > nodeHeight) && node.style.touchAction === "none") node.style.touchAction = null

//     const parentNode = handleParentTouchAction(node.parentNode, eType)
//     return parentNode
// }
export const useBodyAreaResizable = ({
    nodeRef = null,
    handleType = "S", 
    handleClassName = "",
    handlePos = {
        south: true, 
        north: false, 
        east: false, 
        west: false
    }
}: any) =>{
    const smallWindowWidth = useWindowWidth(576)
    const [
        nodePos, 
        onResizeStart, 
        onResizeMove, 
        onResizeEnd
    ] = useResizable({})
    const resizeStart = useRef(false)
    const onResizeStartWrapper = (e: any) =>{
        applyOnResizeStartStyles(smallWindowWidth)
        resizeStart.current = true
        onResizeStart({
            e: e,
            node: nodeRef.current,
        })
    }
    const resizeableHandle = <ResizableHande 
                                onResizeStartWrapper={onResizeStartWrapper}
                                handleType={handleType}
                                customClass={handleClassName}
                            />
    useEffect(()=>{
        const onResizeEndWrapper = (e: any) =>{
            //resize hasnt started
            if(!resizeStart.current) return
            applyOnResizeEndStyles(smallWindowWidth)
            resizeStart.current = false
            onResizeEnd(e)
        }
        const textAreaHandleMove = (e: any) =>{

            if(!resizeStart.current) return 
            onResizeMove({
                e: e, 
                handlePos: handlePos,
            })
        }
        const cleanup = () =>{
            document.body.removeEventListener("mousemove", textAreaHandleMove)
            document.body.removeEventListener("touchmove", textAreaHandleMove)
            document.body.removeEventListener("mouseup", onResizeEndWrapper)
            document.body.removeEventListener("touchend", onResizeEndWrapper)
            document.body.removeEventListener("mouseleave", onResizeEndWrapper)
            document.body.removeEventListener("touchcancel", onResizeEndWrapper)
        }
        document.body.addEventListener("mousemove", textAreaHandleMove)
        document.body.addEventListener("touchmove", textAreaHandleMove)
        document.body.addEventListener("mouseup", onResizeEndWrapper)
        document.body.addEventListener("mouseleave", onResizeEndWrapper)
        document.body.addEventListener("touchend", onResizeEndWrapper)
        document.body.addEventListener("touchcancel", onResizeEndWrapper)
        return () => cleanup()
    },[onResizeMove, onResizeEnd, smallWindowWidth, handlePos, nodeRef])
    
    return {posData: nodePos, handle: resizeableHandle}
}
export default useBodyAreaResizable