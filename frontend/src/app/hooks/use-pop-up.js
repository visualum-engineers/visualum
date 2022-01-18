import { useState, useEffect } from "react"
const usePopUp = ({
    setTimeoutOnMount = false
}) =>{
    const [popUpToggled, setPopUpToggled] = useState(setTimeoutOnMount ? true : false)
    const handleBtn = (e) => {           
        if(e.type ==="keydown" && e.key ==="Enter") setPopUpToggled(state => !state)
        else if(e.type === "mouseleave") setPopUpToggled(false)
        else if (e.type ==="mouseenter") setPopUpToggled(true)
    }
    //on mount, pop up should appear, but then disappear after 5 seconds
    useEffect(()=>{
        if(setTimeoutOnMount) setTimeout(() => setPopUpToggled(false), setTimeoutOnMount)
    }, [setTimeoutOnMount])
    
    
    return [popUpToggled, handleBtn]
}
export default usePopUp