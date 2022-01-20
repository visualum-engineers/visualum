import useBodyAreaResizable from '../../../hooks/use-body-area-resizable'
import { useRef } from 'react'
const ShortAnswerTextArea = ({
    data, 
    handleInput
}) =>{
    const textAreaRef = useRef()
    const {
        posData: textAreaPos, 
        handle: resizableHandle
    } = useBodyAreaResizable({
            nodeRef: textAreaRef,
            handleType: "S",
            handlePos : {
                south: true, 
                north: false, 
                east: false, 
                west: false
            }
    })
    const textAreaHeight = {height: textAreaPos ? textAreaPos.height: null}
    return(
        <>
            <div 
                className="sa-activity-text-input form-floating w-100 d-flex flex-column"
                style={{position: "relative", zIndex: "1", height: textAreaPos ? "fit-content":null}}
            >
                <textarea
                    ref={textAreaRef} 
                    className="form-control flex-grow-1" 
                    placeholder="Type your answer here" 
                    id="sa-activity-text"
                    onChange={handleInput}
                    value = {data.clientAnswer}
                    style={textAreaHeight}  
                />
                <label htmlFor="sa-activity-text">
                    Type your answer here
                </label> 
                {resizableHandle}
            </div>
        </>
    )
}
export default ShortAnswerTextArea