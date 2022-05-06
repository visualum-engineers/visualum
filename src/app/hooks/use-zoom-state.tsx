import { useState } from "react"
import { useZoomed } from "../components/utilities/contexts/ZoomableContext"
const useZoomState = ({onClick} = {}) =>{
    const [stateChange, setStateChange] = useState(false)
    const zoom = useZoomed()
    const zoomState = zoom ? zoom.currZoomState : null
    const onLocalClick = (e) => {
        e.preventDefault()
        if(stateChange) return
        //prevent constant clicking, and allow animation to play
        setStateChange(true)

        if(onClick) onClick(e)
        //toogle state on and off
        if(zoom) zoom.changeZoomState(!zoomState)
        setTimeout(()=>{
            setStateChange(false)
        }, 500)
    }
    return [
        zoomState,
        onLocalClick
    ]
}

export default useZoomState