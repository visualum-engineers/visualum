import { useEffect, useState } from "react"


const MoreInfoBtn = ({textContent="", customContainerClass="", customContainerAriaLabel="", customDropDownID="", setTimeoutOnMount=0}) =>{
    const [infoToggled, setInfoToggled] = useState(true)

    //on mount, pop up should appear, but then disappear after 5 seconds
    useEffect(()=>{if(setTimeoutOnMount) setTimeout(() => setInfoToggled(false), setTimeoutOnMount)}, [setTimeoutOnMount])
    
    const handleInfoBtn = (e) => {   
        if(e.type ==="click") setInfoToggled((state)=>!state)
        else if(e.type === "mouseleave") setInfoToggled(false)
    }

    return(
        <div className={customContainerClass + " info-btn-container"} aria-label={customContainerAriaLabel} aria-describedby="info">
            <button 
                aria-labelledby={customDropDownID}
                onClick={handleInfoBtn}
            ><i className="fas fa-info-circle"></i>
                
            </button>
            <div 
                    aria-hidden={!infoToggled}
                    className={`${infoToggled ? "instructions-show": ""} instructions`}
                    onMouseLeave = {handleInfoBtn}
                >
                    <div className="info-triangle"/>
                    <div className="info-triangle-2"/>
                    <p id={customDropDownID}>{textContent}</p>
            </div>    
        </div>
    )   
}
export default MoreInfoBtn
