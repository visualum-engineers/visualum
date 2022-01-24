//id must be unique to keep track
import {useDroppable} from '@dnd-kit/core';
import {useRef} from "react"
import mergeRefs from '../../../../../helpers/mergeRefs';
function Droppable(props) {
    const droppableRef = useRef()
    const {isOver, setNodeRef} = useDroppable({
      id: props.id, 
      disabled: props.disabled,
      data:{
        node: droppableRef.current,
        parentNode: props.parentNode,
        customParentNode: props.customParentNode ? props.customParentNode.node : null,
      }
    });
    return (
      <div 
        ref={mergeRefs([setNodeRef, droppableRef])} 
        className={`${props.innerDroppableClassName}${isOver || props.isOver === props.id ? " "+props.draggingOverClass : ""}${props.placeHolderClass? " " + props.placeHolderClass: ""}`}
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