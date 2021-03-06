import Image from "../../utilities/imageContainer/Image"
import ImageContainer from "../../utilities/imageContainer/ImageContainer"
import ZoomableContext from "../../utilities/contexts/ZoomableContext"
const LabelPicturesImage = ({
    popUpBgStyles, 
    data
}:any) =>{
    const newPopUpBgStyles = {
        ...popUpBgStyles,
        zIndex: 4
    }
    return (
    <ZoomableContext>
        <ImageContainer 
            defaultContainerClass = {"label-pic-activity-img-container"}
            zoomContainerClass={"label-pic-activity-img-container zoomed-in"}
            popUpBgStyles={newPopUpBgStyles}
            popUpEl={
                <Image 
                    className={"label-pic-activity-image zoomed-in"}
                    src = {data.imageURL}
                    alt = {data.alt}
                    tabIndex={0}
                />
            }
        >
            <Image
                className={"label-pic-activity-image"}
                src = {data.imageURL}
                alt = {data.alt}
                tabIndex={0}
            />
        </ImageContainer>
    </ZoomableContext>
    )
}
export default LabelPicturesImage