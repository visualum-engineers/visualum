import ImageContainer from "../../utilities/imageContainer/ImageContainer"
import ZoomableContext from "../../utilities/imageContainer/ZoomableContext"
import Image from "../../utilities/imageContainer/Image"
const MultipleChoiceImage = ({
    data,
    customClass,
    popUpBgStyles
}) =>{
    return(
        <ZoomableContext>
            <ImageContainer 
                defaultContainerClass = {`${customClass} mc-activity-image-container`}
                zoomContainerClass = {"mc-activity-image-container zoomed-in"}
                popUpBgStyles = {popUpBgStyles}
                popUpEl={
                    <Image
                        className={"mc-activity-image zoomed-in"}
                        src = {data.imageURL}
                        alt = {data.alt}
                        tabIndex={0}
                    />
                }
            >
                <Image
                    className={"mc-activity-image"}
                    src = {data.imageURL}
                    alt = {data.alt}
                    tabIndex={0}
                />
            </ImageContainer>
        </ZoomableContext>
    )
}
export default MultipleChoiceImage