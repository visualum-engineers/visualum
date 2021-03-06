import RadioItem from "./Radio/RadioItem"
import CheckboxItem from "./Checkbox/CheckboxItem"
const InputInnerGridList = ({
    inputType,
    startSlice, 
    endSlice, 
    data,
    inputItemProps
}: any) => <div className="d-flex w-100" >
        {data.answerChoices.slice(startSlice, endSlice).map((choice: any, index: number)=>{
            const checked = data.clientAnswer && choice.id.toString() in data.clientAnswer
            if(!choice) return <div key={index} className="w-100 grid-layout empty-mc-item"></div>
            if(inputType === "checkbox") return (
                <CheckboxItem 
                    key={choice.id}
                    id = {choice.id}
                    choice={choice.content}
                    checked={checked}  
                    {...inputItemProps}
                />
            )
            return(
                <RadioItem
                    key={choice.id}
                    id = {choice.id}
                    choice={choice.content}
                    checked={checked}
                    {...inputItemProps} 
                />
            )
        })}
    </div>

const InputInnerList = ({
    data, 
    inputType,
    inputItemProps
}: any) => data.answerChoices.map((choice: any)=>{
        const checked = data.clientAnswer && choice.id.toString() in data.clientAnswer
        if(!choice) return null
        if(inputType === "checkbox") return(
            <CheckboxItem 
                key={choice.id}
                id = {choice.id}
                choice={choice.content}
                checked={checked}
                {...inputItemProps}
            />
        )
        return(
            <RadioItem
                key = {choice.id}
                id = {choice.id}
                choice={choice.content}
                checked={checked} 
                {...inputItemProps}
            />
        )
    })

const ControlledInputsColumn = ({
    data,
    inputType,
    columns, 
    rows,
    mediumWindowWidth,
    smallWindowWidth,
    updateAnswerChoice,
}: any) =>{
    const inputItemProps = {
        clientAnswer: data.clientAnswer,
        updateAnswerChoice: updateAnswerChoice,
        customContainerClass: inputType === "checkbox" ? `${!mediumWindowWidth && smallWindowWidth? "grid-layout w-100 " : ""}controlled-inputs-checkbox-item d-flex align-items-center`
                              :`controlled-inputs-radio-item ${!mediumWindowWidth && smallWindowWidth ? "grid-layout w-100 " : ""}d-flex align-items-center`             
    }
    return (
        <div className={`w-100 controlled-inputs-activity-answer-container `
                        + `${!mediumWindowWidth ?" portrait-mode":""}`}
        >
            {/*renders different answer choices in specific layout*/}
            {!mediumWindowWidth && smallWindowWidth? 
                Array(rows).fill(0).map((content, index) => {
                    return (
                        <InputInnerGridList 
                            key={index}
                            data = {data}
                            inputType={inputType}
                            startSlice={index*columns}
                            endSlice={(index+1)*columns}
                            inputItemProps={inputItemProps}
                        />
                )})
                : <InputInnerList
                    data = {data}
                    inputType={inputType} 
                    inputItemProps={inputItemProps}
                />
            }
        </div>     
    )
}
export default ControlledInputsColumn