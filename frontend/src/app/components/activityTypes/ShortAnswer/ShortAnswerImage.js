import ImageContainer from "../../utilities/imageContainer/ImageContainer"
import ZoomableContext from "../../utilities/imageContainer/ZoomableContext"
import Image from "../../utilities/imageContainer/Image"
const ShortAnswerImage = ({
    data,
    customClass,
    popUpBgStyles
}) =>{
    return(
        <ZoomableContext>
            <ImageContainer 
                defaultContainerClass = {`sa-activity-image-container`}
                zoomContainerClass = {"sa-activity-image-container zoomed-in"}
                popUpBgStyles = {popUpBgStyles}
                popUpEl={
                    <Image
                        className={"sa-activity-image zoomed-in"}
                        src = {data.imageURL}
                        alt = {data.alt}
                        tabIndex={0}
                    />
                }
            >
                <Image
                    className={"sa-activity-image"}
                    src = {data.imageURL}
                    alt = {data.alt}
                    tabIndex={0}
                />
            </ImageContainer>
        </ZoomableContext>
    )
}
export default ShortAnswerImage