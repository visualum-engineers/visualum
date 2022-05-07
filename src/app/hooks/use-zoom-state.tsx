import { useState } from "react"
import { useZoomed } from "../components/utilities/contexts/ZoomableContext"
const useZoomState = ({onClick}:any): [boolean, (e: any) => void] =>{
    const [stateChange, setStateChange] = useState(false)
    const zoom = useZoomed()
    const zoomState = zoom ? zoom.currZoomState : false
    const onLocalClick = (e: any) => {
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