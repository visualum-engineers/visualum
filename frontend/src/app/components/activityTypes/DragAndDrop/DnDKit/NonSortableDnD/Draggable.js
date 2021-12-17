//id must be unique to keep track
import {useDraggable} from '@dnd-kit/core';

function Draggable(props) {
  const {attributes, listeners, setNodeRef, isDragging} = useDraggable({
    id: props.id,
    disabled: props.disabled,
    attributes:{
        tabIndex : 0,
    },
    data:{
        tapDraggableId : props.id,
        tapDroppableId: props.droppableId,
        index: props.index,
    }
  });
  return (
    <div 
        ref={setNodeRef} 
        {...listeners} 
        {...attributes}
        className = {`${props.draggableClassName} ${isDragging ? props.isDraggingClass: ""}`} 
        onClick = {props.onTap ? props.onTap:null}
        onKeyDown= {props.onTap ? props.onTap:null}
    >
      {props.children}
    </div>
  );
}
export default Draggable