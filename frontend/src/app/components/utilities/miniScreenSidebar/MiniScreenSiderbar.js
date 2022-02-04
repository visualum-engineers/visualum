
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { 
    DragDropContext,
    Droppable,
    Draggable
} from "react-beautiful-dnd"
import ExitIcon from "../exitIcon/ExitIcon"

const MiniScreenSideBar = ({
    data = [],
    // header,
    mediumWindowWidth, 
    // smallWindowWidth,
    onRemoveClick,
    onAddNewClick,
    onDragEnd,
}) =>{

    return (
        <DragDropContext
            onDragEnd = {onDragEnd}
        >
            <div className="mini-screen-sidebar-container" style={{position: "fixed"}}>
                <div className="mini-screen-sidebar">
                    {/* <div className="mini-screen-sidebar-header"> 
                        {header}
                    </div> */}
                    <Droppable 
                        droppableId="mini-screen-slideshow-screen"
                        direction="vertical"
                    >
                        {(provided, snapshot) => (
                        <div 
                            className={`mini-screen-slideshow-screens ${snapshot.isDraggingOver? "is-over" : ""}`}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {data.map((value, index) =>{
                                return (
                                    <Draggable 
                                        key={value.key}
                                        draggableId={value.key.toString()}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                className={`mini-screen-slide-container`}
                                                key = {value.key}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                            >
                                                <button 
                                                    className="mini-screen-remove-slide"
                                                    onClick = {onRemoveClick}
                                                >
                                                    <ExitIcon 
                                                        customStrokeWidth={"0.6rem"}
                                                    />    
                                                </button>
                                                <button key = {value.key} 
                                                    className={`mini-screen-slide ${snapshot.isDragging ? "is-dragging":""}`}
                                                >
                                                    <div className="mini-screen-container">
                                                        <span 
                                                            className="mini-screen-slide-num">
                                                                {index+1}
                                                        </span>
                                                        
                                                        {value.slide}
                                                    </div>
                                                    {/* <div className="mini-screen-text-content">
                                                        {value.textContent}
                                                    </div> */}
                                                    <div 
                                                        className="mini-screen-drag-handle"
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <svg viewBox="0 0 120 140">
                                                            <line y1="25" y2="25" x1="5" x2="115"></line>
                                                            <line y1="70" y2="70" x1="5" x2="115"></line>
                                                            <line y1="115" y2 ="115" x1="5" x2="115"></line>
                                                        </svg>
                                                    </div>
                                                </button>
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                        </div>
                        )}
                    </Droppable>
                </div>
                <div className="mini-screen-sticky-btn-container">
                    <button 
                        onClick={onAddNewClick}
                        className="mini-screen-sticky-btn"
                    >   
                        <div className="mini-screen-container">
                            <FontAwesomeIcon icon={faPlus}/>
                            <span>Add New...</span>
                        </div>
                        {/* <div className="mini-screen-sticky-btn-text">
                            <span>Add New...</span>
                        </div> */}
                    </button>
                </div>
            </div>
        </DragDropContext>
    ) 
}
export default MiniScreenSideBar