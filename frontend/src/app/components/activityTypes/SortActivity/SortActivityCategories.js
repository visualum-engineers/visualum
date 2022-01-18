import SortableArea from "../../utilities/dragAndDrop/DnDKit/SortableDnD/SortableArea"
import MoreInfoBtn from "../../utilities/moreInfoBtn/MoreInfoBtn"

const SortActivityCategories = ({
        numCategories,
        data, 
        mediumWindowWidth, 
        onTap=null, 
        firstElTap = null,
        isOver=null,
        moreInfoBtn = null,
        moreInfoOnClick=null,
        disableDnD=null,
        smallWindowWidth
    }) =>{
    return (
        <div className={`sort-activity-categories ${mediumWindowWidth ? "full-size": "portrait-mode w-100"}`}>
            <div className={`sort-activity-category-container`}>
                <div className={`sort-activity-column-titles d-flex align-items-center justify-content-center`}>
                    <span className={`${!smallWindowWidth? "ms-4":""}`}>Question</span>
                    <div className="sort-activity-instructions-position d-flex">
                        <MoreInfoBtn 
                            textContent = "View Instructions"
                            customContainerClass = "match-activity-instructions"
                            customContainerAriaLabel = "activity-instructions"
                            customDropDownID = "match-activity-instructions"
                            setTimeoutOnMount = {!moreInfoBtn? 4000: 0}
                            onClick = {moreInfoOnClick}
                        />
                    </div>
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
                                firstElTap = {firstElTap}
                                onTap={onTap}
                                isOver={isOver}
                                disableDnD = {disableDnD}
                                //classes
                                droppableContainerClassName = {"sort-activity-sort-droppable"
                                                             + `${!smallWindowWidth ?" small-screen"
                                                             : first ? " first-item" 
                                                             : ""}`}
                                droppableClassName = {"sort-activity-sort-droppable-area d-flex flex-column"}
                                innerDroppableClassName = {`${disableDnD && firstElTap? "sort-activity-tap-active ": ""}sort-activity-inner-droppable d-flex flex-column align-items-center`}
                                draggableClassName = {"sort-activity-draggables d-flex align-items-center justify-content-center"}
                                draggingOverClass = {"sort-activity-dragging-over"}
                                isDraggingClass = {"sort-activity-is-dragging"}
                                placeHolderClass={"sort-activity-droppable-placeholder"}
                            />
                        )}
                    )}
                </div>
            </div>
        </div>
    )
}
export default SortActivityCategories
