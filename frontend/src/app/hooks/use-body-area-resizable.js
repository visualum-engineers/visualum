import { useEffect, useRef } from "react"
import {
    useResizable, 
    applyOnResizeEndStyles, 
    applyOnResizeStartStyles
} from "./use-resizable"
import ResizableHande from "../components/utilities/resizable/ResizableHandle"
import useWindowWidth from "./use-window-width"

/* This is an abstraction for the use-resizable hook
    This hook uses the entire body element to be the area
    where elements can be resized, instead of a custom one
*/
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
}) =>{
    const smallWindowWidth = useWindowWidth(576)
    const [
        nodePos, 
        onResizeStart, 
        onResizeMove, 
        onResizeEnd
    ] = useResizable({})
    const textResizeStart = useRef()
    const onResizeStartWrapper = (e) =>{
        applyOnResizeStartStyles(smallWindowWidth)
        textResizeStart.current = true
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
        const onResizeEndWrapper = (e) =>{
            applyOnResizeEndStyles(smallWindowWidth)
            textResizeStart.current = false
            onResizeEnd(e)
        }
        const textAreaHandleMove = (e) =>{
            if(!textResizeStart.current) return
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
        }
        document.body.addEventListener("mousemove", textAreaHandleMove)
        document.body.addEventListener("touchmove", textAreaHandleMove)
        document.body.addEventListener("mouseup", onResizeEndWrapper)
        document.body.addEventListener("touchend", onResizeEndWrapper)
        return () => cleanup()
    },[onResizeMove, onResizeEnd, smallWindowWidth, handlePos])
    
    return {posData: nodePos, handle: resizeableHandle}
}
export default useBodyAreaResizable