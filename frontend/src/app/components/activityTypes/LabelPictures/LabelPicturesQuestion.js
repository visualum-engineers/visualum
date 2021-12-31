import ImageContainer from "../../utilities/imageContainer/ImageContainer"
const LabelPicturesQuestion = ({
    data
}) =>{
    console.log(data)
    return (
        <div className="label-pic-activity-question-container">
            <h2 className="label-pic-activity-column-titles">
                <span>Question</span>
            </h2>
            <ImageContainer 
                defaultContainerClass = {"label-pic-activity-img-container"}
                zoomContainerClass={"zoomed-in"}
                src = {data.imageURL}
                alt = {data.alt}
            >

            </ImageContainer>
        </div>
    )
}
export default LabelPicturesQuestion