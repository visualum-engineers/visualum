
import { useState } from "react";
import { useZoomed } from "./Zoomable";
import PopUpBg from "../popUp/PopUpBackground";
//import ConditionalWrapper from "../conditionalWrapper/ConditionalWrapper";
const ImageContainer = (props) =>{
    const [stateChange, setStateChange] = useState(false)
    const zoom = useZoomed()
    const zoomState = zoom ? zoom.currZoomState : null
    const onClick = (e) => {
        e.preventDefault()
        if(stateChange) return
        //prevent constant clicking, and allow animation to play
        setStateChange(true)

        if(props.onClick) props.onClick(e)
        //toogle state on and off
        if(zoom) zoom.changeZoomState(!zoomState)

        setTimeout(()=>{
            setStateChange(false)
        }, 500)
    }
    //add more here
    return(
        <>
            <div className={props.defaultContainerClass}>
                <img 
                    onClick={onClick}
                    className = {props.defaultImageClass}
                    src={props.src}
                    alt={props.alt}
                    tabIndex={0}
                /> 
            </div> 
            {zoomState && 
                <PopUpBg 
                    onClick = {onClick}
                    ariaLabel = {"zoom-out-image"}
                    containerStyles = {props.popUpBgStyles}
                >
                    <div className={
                        zoomState && props.zoomContainerClass ? props.zoomContainerClass
                        : props.defaultContainerClass
                    }>
                        <img 
                            onClick={onClick}
                            className = {
                                zoomState && props.zoomImageClass ? props.zoomImageClass
                                : props.defaultImageClass
                            }
                            src={props.src}
                            alt={props.alt}
                            tabIndex={0}
                        /> 
                    </div> 
                </PopUpBg>
            }
        </>
        
    )
}

export default ImageContainer

/* <ConditionalWrapper
        condition={zoomState}
        wrapper={children => <PopUpBg
            onClick = {onClick}
            ariaLabel = {"zoom-out-image"}
            containerStyles = {props.popUpBgStyles}
        >
                {children}
            </PopUpBg>
        }
    >
        <div className={
            zoomState && props.zoomContainerClass ? props.zoomContainerClass
            : props.defaultContainerClass
        }>
            <img 
                onClick={onClick}
                className = {
                    zoomState && props.zoomImageClass ? props.zoomImageClass
                    : props.defaultImageClass
                }
                src={props.src}
                alt={props.alt}
                tabIndex={0}
            /> 
        </div> 
    </ConditionalWrapper> */