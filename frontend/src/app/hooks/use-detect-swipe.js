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
        const {x, y} = touchStartPos.current
        const endX = e.changedTouches[0].clientX
        const endY = e.changedTouches[0].clientY
        console.log(x, endX)
        if(!x || !y) return

        if(x - endX > 0) touchDirection.current.left= true
        if(x - endX < 0) touchDirection.current.right= true
        
        if(y - endY > 0) touchDirection.current.up = true
        if(y - endY < 0) touchDirection.current.down = true
        
        touchStartPos.current = null

        return touchDirection.current
    }

    return [onTouchStart, onTouchEnd]
}
export default useDetectSwipe