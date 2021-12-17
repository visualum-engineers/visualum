//id must be unique to keep track
import {useDroppable} from '@dnd-kit/core';

function Droppable(props) {
    const {isOver, setNodeRef} = useDroppable({
      id: props.id,
    });

    return (
      <div 
        ref={setNodeRef} 
        className={`${props.innerDroppableClassName} ${isOver || props.isOver === props.id ? props.draggingOverClass : ""} ${props.placeHolderClass? props.placeHolderClass: ""}`}
        onClick = {props.firstElTap ?  props.onTap: null}
        onKeyDown = {props.firstElTap? props.onTap: null}
        tabIndex = {props.firstElTap ? 0: -1}
        data-tap-droppable-id = {props.id.toString()}
      >
        {props.children}
      </div>
    );
  }

export default Droppable