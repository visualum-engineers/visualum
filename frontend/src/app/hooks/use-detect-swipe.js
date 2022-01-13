import { useRef } from "react"
const useDetectSwipe = () =>{
    const touchStartPos = useRef(null)
    const touchDirection = useRef({
        left: false,
        right: false,
        up: false,
        down: false
    })

    const onTouchStart = (e) => {
        touchDirection.current = {
            left: false,
            right: false,
            up: false,
            down: false
        }
        touchStartPos.current = {x: e.touches[0].clientX, y: e.touches[0].clientY}
    }
    
    const onTouchEnd = (e) => {
        if(!touchStartPos.current) return touchDirection.current
        const {x, y} = touchStartPos.current
        touchStartPos.current = null
        const endX = e.changedTouches[0].clientX
        const endY = e.changedTouches[0].clientY
        if(!x || !y) return

        if(x - endX > 0) touchDirection.current.left= true
        if(x - endX < 0) touchDirection.current.right= true
        
        if(y - endY > 0) touchDirection.current.up = true
        if(y - endY < 0) touchDirection.current.down = true
        
        return touchDirection.current
    }

    return [onTouchStart, onTouchEnd]
}
export default useDetectSwipe