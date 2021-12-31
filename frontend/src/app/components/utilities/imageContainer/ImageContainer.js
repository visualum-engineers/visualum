
import { useState } from "react";
import { useZoomed } from "./Zoomable";
import PopUpBg from "../popUp/PopUpBackground";
//import ConditionalWrapper from "../conditionalWrapper/ConditionalWrapper";
const ImageContainer = ({
    defaultContainerClass,
    defaultImageClass,
    popUpBgStyles,
    zoomContainerClass,
    zoomImageClass,
    onClick,
    src,
    alt,
}) =>{
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
    //add more here
    return(
        <>
            <div className={defaultContainerClass}>
                <img 
                    onClick={onLocalClick}
                    className = {defaultImageClass}
                    src={src}
                    alt={alt}
                    tabIndex={0}
                /> 
            </div> 
            {zoomState && 
                <PopUpBg 
                    onClick = {onLocalClick}
                    ariaLabel = {"zoom-out-image"}
                    containerStyles = {popUpBgStyles}
                >
                    <div className={
                        zoomState && zoomContainerClass ? zoomContainerClass
                        : defaultContainerClass
                    }>
                        <img 
                            onClick={onLocalClick}
                            className = {
                                zoomState && zoomImageClass ? zoomImageClass
                                : defaultImageClass
                            }
                            src={src}
                            alt={alt}
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