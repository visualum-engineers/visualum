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
                defaultContainerClass = {`${customClass} controlled-inputs-activity-image-container`}
                zoomContainerClass = {"controlled-inputs-activity-image-container zoomed-in"}
                popUpBgStyles = {popUpBgStyles}
                popUpEl={
                    <Image
                        className={"controlled-inputs-activity-image zoomed-in"}
                        src = {data.imageURL}
                        alt = {data.alt}
                        tabIndex={0}
                    />
                }
            >
                <Image
                    className={"controlled-inputs-activity-image"}
                    src = {data.imageURL}
                    alt = {data.alt}
                    tabIndex={0}
                />
            </ImageContainer>
        </ZoomableContext>
    )
}
export default MultipleChoiceImage