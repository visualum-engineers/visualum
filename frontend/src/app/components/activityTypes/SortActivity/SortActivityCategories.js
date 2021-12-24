import SortableArea from "../DragAndDrop/DnDKit/SortableDnD/SortableArea"
import MoreInfoBtn from "../../moreInfoBtn/MoreInfoBtn"
const SortActivityCategories = ({
        numCategories,
        data, 
        mediumWindowWidth, 
        onTap=null, 
        firstTapEl = null,
        isOver=null,
        moreInfoBtn = null,
        moreInfoOnClick=null,
        disableDnD=null,
    }) =>{
    return (
        <div className={`sort-activity-categories ${mediumWindowWidth ? "full-size": "w-100"}`}>
            <div className={`sort-activity-category-container`}>
                <div className="sort-activity-column-titles">
                    <div className="sort-activity-instructions-position">
                        <MoreInfoBtn 
                            textContent = "View Instructions"
                            customContainerClass = "match-activity-instructions"
                            customContainerAriaLabel = "activity-instructions"
                            customDropDownID = "match-activity-instructions"
                            setTimeoutOnMount = {!moreInfoBtn? 4000: 0}
                            onClick = {moreInfoOnClick}
                        />
                    </div>
                    Question
                </div>
                <div className="d-flex justify-content-center flex-wrap h-100 sort-activity-category-droppables">
                    {numCategories.map((columnTitle, columnIndex)=> {
                            const header = <p className="sort-activity-droppable-header">{columnTitle}</p>
                            const first = ((columnIndex) % 2) === 0 
                            return (
                            <SortableArea
                                key={columnTitle} 
                                id={columnTitle}
                                droppableHeader = {header}
                                content = {data.categories[columnTitle]}
                                droppableClassName = {`sort-activity-sort-droppables d-flex flex-column${mediumWindowWidth ?" small-screen": ""}${first? " first-item" : ""}`}
                                draggableClassName = {"sort-activity-draggables d-flex align-items-center justify-content-center"}
                                innerDroppableClassName = {`${disableDnD && firstTapEl? "sort-activity-tap-active ": ""}sort-activity-inner-droppable d-flex flex-column align-items-center`}
                                draggingOverClass = {"sort-activity-dragging-over"}
                                isDraggingClass = {"sort-activity-is-dragging"}
                                placeHolderClass={"sort-activity-droppable-placeholder"}
                                firstTapEl = {firstTapEl}
                                onTap={onTap}
                                isOver={isOver}
                                disableDnD = {disableDnD}
                            />
                        )}
                    )}
                </div>
            </div>
        </div>
    )
}
export default SortActivityCategories
