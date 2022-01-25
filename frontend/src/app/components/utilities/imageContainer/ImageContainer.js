
import {useContext, createContext} from "react";
import { createPortal } from "react-dom";
import useZoomState from "../../../hooks/use-zoom-state";
import PopUpBg from "../popUp/PopUpBackground";

const ImgContainerContext = createContext(null)

const ImageContainer = ({
    defaultContainerClass,
    popUpBgStyles,
    zoomContainerClass,
    popUpEl,
    children,
    onClick,
}) =>{
    const [zoomState, onLocalClick] = useZoomState({onClick: onClick})

    return(
        <ImgContainerContext.Provider 
            value={{zoomState: zoomState, onImgContainerClick: onLocalClick}}
        >
            <div 
                className={defaultContainerClass}
            >
                {children}
            </div> 
            {zoomState && 
                createPortal(
                    <PopUpBg 
                        onClick = {onLocalClick}
                        ariaLabel = {"zoom-out-image"}
                        containerStyles = {popUpBgStyles}
                    >
                        <div className={
                            zoomState && zoomContainerClass ? zoomContainerClass
                            : defaultContainerClass
                        }>
                            {popUpEl}
                        </div> 
                    </PopUpBg>,
                    document.body
                )
                
            }
        </ImgContainerContext.Provider>
    )
}
export const useImgContainerProps = () =>{
    return useContext(ImgContainerContext)
}
export default ImageContainer
