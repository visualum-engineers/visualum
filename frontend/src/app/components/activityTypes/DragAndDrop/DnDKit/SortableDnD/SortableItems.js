import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
function SortableItem(props) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging
    } = useSortable({
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
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };
    
    return (
      <div 
        ref={setNodeRef} 
        style={style} 
        className = {`${props.draggableClassName} ${isDragging ? props.isDraggingClass: ""}`} 
        onClick = {props.onTap ? props.onTap:null}
        onKeyDown = {props.onTap ? props.onTap:null}
        {...attributes} 
        {...listeners}
      >
         <div>{props.content}</div>
      </div>
    );
  }
  export default SortableItem