
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
    customClass,
    sidebarToggle,
    onRemoveClick,
    onAddNewClick,
    onDragEnd,
    onSlideClick
}) =>{

    return (
        <DragDropContext
            onDragEnd = {onDragEnd}
        >
            <div 
                className={`mini-screen-sidebar-container${customClass ? " "+customClass: ""}${sidebarToggle ? " sidebar-closed": " sidebar-open"}`} 
                style={{position: "fixed"}}
            >
                <div className="mini-screen-sidebar">
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
                                                {...provided.dragHandleProps}
                                            >
                                                <button 
                                                    className="mini-screen-remove-slide"
                                                    onClick = {onRemoveClick}
                                                    disabled = {sidebarToggle}
                                                    data-question-num = {index}
                                                >
                                                    <ExitIcon 
                                                        customStrokeWidth={"0.6rem"}
                                                    />    
                                                </button>
                                                <div 
                                                    className={`mini-screen-slide ${snapshot.isDragging ? "is-dragging":""}`}
                                                    onClick ={onSlideClick}
                                                    disabled = {sidebarToggle}
                                                    tabIndex = {sidebarToggle ? null : 0}
                                                    aria-label={value.slideAriaLabel}
                                                    data-slide-num = {index}
                                                >
                                                    <div 
                                                        className="mini-screen-container"
                                                    >
                                                        <span 
                                                            className="mini-screen-slide-num">
                                                                {index+1}
                                                        </span>
                                                        
                                                        {value.slide}
                                                    </div>
                                                </div>
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
                        disabled = {sidebarToggle}
                    >   
                        <div className="mini-screen-container">
                            <FontAwesomeIcon icon={faPlus}/>
                            <span>Add New...</span>
                        </div>
                    </button>
                </div>
            </div>
        </DragDropContext>
    ) 
}
export default MiniScreenSideBar

/*
<div 
    className="mini-screen-drag-handle"
    //{...provided.dragHandleProps}
>
    <svg viewBox="0 0 100 150">
        <g>
            <circle cx="25" cy="25" r="6"/>
            <circle cx="25" cy="75" r="6"/>
            <circle cx="25" cy="125" r="6"/>
        </g>
        <g>
            <circle cx="75" cy="25" r="6"/>
            <circle cx="75" cy="75" r="6"/>
            <circle cx="75" cy="125" r="6"/>
        </g>
    </svg>
     



    </div>
*/
/*
<svg viewBox="0 0 120 140">
        <line y1="25" y2="25" x1="5" x2="115"></line>
        <line y1="70" y2="70" x1="5" x2="115"></line>
        <line y1="115" y2 ="115" x1="5" x2="115"></line>
    </svg> }
*/