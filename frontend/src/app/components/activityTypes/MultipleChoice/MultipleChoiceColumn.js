import MultipleChoiceItem from "./MultipleChoiceItem"
const MultipleChoiceColumn = ({
    data,
    columns, 
    rows,
    mediumWindowWidth,
    updateAnswerChoice,
}) =>{
    return (
        <div className={`w-100 mc-activity-answer-container${!mediumWindowWidth ?" portrait-mode":""}`}>
            {/*renders different answer choices*/}
            {!mediumWindowWidth ? 
                Array(rows).fill(0).map((content, rowIndex) => {
                    const startSlice = rowIndex*columns
                    const endSlice = (rowIndex+1)*columns
                    return (
                        <div className="d-flex w-100" key={rowIndex}>
                            {data.answerChoices.slice(startSlice, endSlice).map((choice, index)=>{
                                if(!choice) return <div key="index" className="mc-activity-mc-item w-100 grid-layout empty-mc-item"></div>
                                return(
                                    <MultipleChoiceItem
                                        key={choice}
                                        index={rowIndex*columns+index} 
                                        data ={data} 
                                        choice={choice} 
                                        updateAnswerChoice={updateAnswerChoice} 
                                        customContainerClass = "mc-activity-mc-item grid-layout w-100" 
                                    />
                                )
                            })}
                        </div>
                )})
            : data.answerChoices.map((choice, index)=>{
                    if(!choice) return null
                    return(
                            <MultipleChoiceItem
                                key = {choice}
                                index={index} 
                                data ={data} 
                                choice={choice} 
                                updateAnswerChoice={updateAnswerChoice} 
                                customContainerClass = "w-100 mc-activity-mc-item" 
                            />
                    )
                })
            }
        </div>     
    )
}
export default MultipleChoiceColumn