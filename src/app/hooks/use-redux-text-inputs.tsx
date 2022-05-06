/* use this hook when you want to control the timing of
* the redux update during a text input. For example
* In the use of a pop up where inputs must be saved first
* before an update to the redux store 
*/
import { useEffect, useState } from "react"
import {useSelector, useDispatch} from "react-redux"
const useReduxTextInputs = ({
    reduxUpdateFunc,
    selectorFunc, 
    inputType,
    charLimit,
}) =>{
    const reduxTextInput = useSelector(selectorFunc)
    const dispatch = useDispatch()
    const [localTextInput, setLocalTextInput] = useState(reduxTextInput)
    
    //ensure local state is updated when redux name changes
    useEffect(()=>{
        setLocalTextInput(reduxTextInput)
    }, [reduxTextInput])
    
    //updates redux text input
    const updateReduxInput = (
        newInput,
    ) => dispatch(
        reduxUpdateFunc(newInput)
    )

    const onTextInputChange = (e) =>{
        const target = e.target
        const value = target.closest(inputType).value
        if(charLimit && value.length > charLimit) return
        setLocalTextInput(value)
    }
    return [localTextInput, onTextInputChange, updateReduxInput]
}
export default useReduxTextInputs