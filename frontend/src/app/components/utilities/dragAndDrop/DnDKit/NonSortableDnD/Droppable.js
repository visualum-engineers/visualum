//id must be unique to keep track
import {useDroppable} from '@dnd-kit/core';
import {useRef} from "react"
function Droppable(props) {
    function mergeRefs(refs) {
      return value => {
        refs.forEach(ref => {
          if (typeof ref === 'function') {
            ref(value)
          } else if (ref != null) {
            ref.current = value
          }
        })
      }
    }
    const droppableRef = useRef()
    const {isOver, setNodeRef} = useDroppable({
      id: props.id, 
      disabled: props.disabled,
      data:{
        node: droppableRef.current,
        parentNode: props.parentNode
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