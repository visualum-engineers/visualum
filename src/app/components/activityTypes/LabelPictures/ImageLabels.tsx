import { Droppable } from "react-beautiful-dnd"
import Choices from "./LabelChoices"
const ImageLabels = ({state}) =>{
    return (
        <div className="d-flex flex-column col-6 col-sm-4">
            {state.imageLabels.map((content,container)=>{ 
                return ( 
                <Droppable 
                    key={container.toString()} 
                    droppableId={container +"imgLabel"} 
                    direction="vertical">
                    {(provided) => (
                        <div 
                            className="imgLabelContainer d-flex flex-column"
                            {...provided.droppableProps} 
                            ref={provided.innerRef}>
                                {content.length !==0 ? <Choices 
                                    key={content[0].key}
                                    id = {content[0].key}
                                    index={0} 
                                    label ={content[0]}/> : null}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            )})}
        </div>
    )
}
export default ImageLabels
