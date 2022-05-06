import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
function SortableItem(props) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
        id: props.id,
        disabled: props.preview? props.preview : props.disabled,
        attributes:{
            tabIndex : props.preview? 0: -1,
        },
        data:{
            tapDraggableId : props.id,
            tapDroppableId: props.droppableId,
            index: props.index,
            categoryIndex: props.categoryIndex,
        }
    });
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };
    let previewProps = {}
    if(props.preview) previewProps = {
        onClick : null,
        onKeyDown : null,
        tabIndex : -1,
    }
    return (
      <div 
        id={"dragItem"+props.id}
        ref={setNodeRef} 
        style={style} 
        data-tap-draggable-id = {props.id.toString()}
        data-tap-droppable-id = {props.droppableId.toString()}
        data-tap-index={props.index}
        className = {`${props.draggableClassName}${isDragging ? " "+props.isDraggingClass: ""}`} 
        onClick = {props.onTap ? props.onTap:null}
        onKeyDown = {props.onTap ? props.onTap:null}
        {...attributes} 
        {...listeners}
        {...previewProps}
      >
         {props.children}
      </div>
    );
  }
  export default SortableItem