import MoreInfoBtn from '../../moreInfoBtn/MoreInfoBtn';
import DroppableArea from "../DragAndDrop/ReactBeautifulDnD/DroppableArea"
const AnswerBank = ({
    data, 
    firstTapEl, 
    mediumWindowWidth, 
    moreInfoOnClick, 
    disableDnD, 
    onTap, 
    moreInfoBtn,
    removedEl
}) => {
    return (
        <div className={`match-activity-columns d-flex justify-content-center${mediumWindowWidth? " full-size": " w-100"}`}>
            <div className="match-activity-keys-column w-50 d-flex flex-column align-items-center">
                <h2 className="match-activity-column-titles">Key</h2>
                {Object.keys(data.keyPairs).map((content,index)=>{
                    let last = index===Object.keys(data.keyPairs).length-1
                    return (
                        <div key={index} className={`match-activity-keys w-100 d-flex align-items-center justify-content-center${last? " last-item":""}`}>
                            <p className="w-100 d-flex flex-column justify-content-center align-items-center">{content}</p>
                        </div>
                    )
                })}
            </div>
        
            <div className="match-activity-answers-column w-50 d-flex flex-column align-items-center">
                <div className="match-activity-column-titles">
                    <div className="match-activity-instructions-position">
                        <MoreInfoBtn 
                            textContent = "View Instructions"
                            customContainerClass = "match-activity-instructions"
                            customContainerAriaLabel = "activity-instructions"
                            customDropDownID = "match-activity-instructions"
                            setTimeoutOnMount = {!moreInfoBtn? 4000: 0}
                            onClick = {moreInfoOnClick}
                        />
                    </div>
                    Answer
                </div>
                
                {Object.keys(data.keyPairs).map((content, index)=>{
                    let last = index===Object.keys(data.keyPairs).length-1
                    return (
                        <DroppableArea
                            firstElTap = {firstTapEl} 
                            key={data.categoryIDs[content]} 
                            id={data.categoryIDs[content]}
                            content = {data.keyPairs[content]}
                            droppableClassName = {`match-activity-answers-droppables w-100${last? " last-item":""}`}
                            draggableClassName = {"match-activity-draggables d-flex align-items-center justify-content-center"}
                            innerDroppableClassName = {`${disableDnD && firstTapEl? "match-activity-tap-active ": ""}match-activity-inner-droppable w-100 h-100 d-flex flex-column justify-content-start align-items-center`}
                            draggingOverClass={"match-activity-draggable-over"}
                            isDraggingClass={"match-activity-dragging"}
                            onTap={disableDnD? onTap: null}
                            removedEl = {removedEl && removedEl[0]}                        
                        />
                    )
                })}
            </div>
        </div>
    )
}
export default AnswerBank