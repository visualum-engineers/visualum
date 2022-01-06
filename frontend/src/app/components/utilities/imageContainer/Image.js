import { useImgContainerProps } from "./ImageContainer"
const Image = ({
    className,
    src,
    alt,
    tabIndex,
    onClick,
}) =>{
    const {onImgContainerClick} = useImgContainerProps()

    //merge a click handler provided only for image container, 
    //with the img click handler. 
    //This is done to provide functionality for zooming, 
    //but also allow for flexibility in attached event handlers.
    const onLocalClick = (e) =>{
        if(onImgContainerClick) onImgContainerClick(e)
        if(onClick) onClick(e)
    }
    
    return(
        <img 
            className={className}
            src = {src}
            alt = {alt}
            tabIndex={tabIndex}
            onClick={onLocalClick}
     />
    )
}
export default Image