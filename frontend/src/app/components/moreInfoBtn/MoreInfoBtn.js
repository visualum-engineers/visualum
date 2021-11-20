import { useEffect, useState } from "react"


const MoreInfoBtn = ({textContent="", customContainerClass="", customContainerAriaLabel="", customDropDownID="", setTimeoutOnMount=0}) =>{
    const [infoToggled, setInfoToggled] = useState(true)
    const [isDisabled, setIsDisabled] = useState(false)
    //on mount, pop up should appear, but then disappear after 5 seconds
    useEffect(()=>{if(setTimeoutOnMount) setTimeout(() => setInfoToggled(false), setTimeoutOnMount)}, [setTimeoutOnMount])
    
    const handleInfoBtn = (e) => {   
        //prevent updating for a specified amount of time
        if(isDisabled) return null 
        
        if(e.type ==="keydown" && e.key ==="Enter") setInfoToggled(state => !state)
        else if(e.type === "mouseleave") setInfoToggled(false)
        else if (e.type ==="mouseenter") setInfoToggled(true)
        
        setIsDisabled(true)

        //restore ability to respond to events
        setTimeout(()=>{
            setIsDisabled(false)
        }, 100)
    }

    return(
        <div 
            className={customContainerClass + " info-btn-container"} 
            aria-label={customContainerAriaLabel} 
            aria-describedby="info"
            onMouseEnter = {handleInfoBtn}
            onMouseLeave = {handleInfoBtn}
        >
            <button 
                aria-labelledby={customDropDownID}
                onKeyDown = {handleInfoBtn}
            ><i className="fas fa-info-circle"></i>
                
            </button>
            <div 
                    aria-hidden={!infoToggled}
                    className={`${infoToggled ? "instructions-show": ""} instructions`}
                >
                    <div className="info-triangle"/>
                    <div className="info-triangle-2"/>
                    <p id={customDropDownID}>{textContent}</p>
            </div>    
        </div>
    )   
}
export default MoreInfoBtn
