/* use this hook when you want a controlled text input
* being controlled directly by redux.
* returns the selected input, and the change function
*/
import {useSelector, useDispatch} from "react-redux"
const useReduxControlledTextInputs = ({
    reduxUpdateFunc,
    selectorFunc, 
    inputType,
    charLimit,
}) =>{
    const reduxTextInput = useSelector(selectorFunc)
    const dispatch = useDispatch()
    
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
        updateReduxInput(value)
    }
    return [reduxTextInput, onTextInputChange]
}
export default useReduxControlledTextInputs