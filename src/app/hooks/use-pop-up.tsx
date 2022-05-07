import { useState, useEffect } from "react"
const usePopUp = ({
    setTimeoutOnMount = false
}: any):[
    boolean,
    (e: any) => void
] =>{
    const [popUpToggled, setPopUpToggled] = useState(setTimeoutOnMount ? true : false)
    const handleBtn = (e: any) => {           
        if(e.type ==="keydown" && e.key ==="Enter") setPopUpToggled(state => !state)
        else if(e.type === "mouseleave") setPopUpToggled(false)
        else if (e.type ==="mouseenter") setPopUpToggled(true)
    }
    //on mount, pop up should appear, but then disappear after 5 seconds
    useEffect(()=>{
        let isMounted = true
        if(setTimeoutOnMount && isMounted) setTimeout(() => {
            if(isMounted) setPopUpToggled(false)
        }, setTimeoutOnMount)
        
        return () => {isMounted = false}
    }, [setTimeoutOnMount])
    
    return [popUpToggled, handleBtn]
}
export default usePopUp