/* similar to use-text-inputs
* but this debounces updates to the redux store
* Meant to make a history stack more accurate
* Or for search queries
* only local state and debounced func are exposed
*/
import { useEffect, useState, useMemo } from "react"
import {useSelector, useDispatch} from "react-redux"
import {debounce} from "lodash"

const useReduxDebouncedTextInputs = ({
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
    const updateTextInput = (
        newInput,
        dispatch, 
        reduxUpdateFunc,
    ) => dispatch(
        reduxUpdateFunc(newInput)
    )
    //we debounce redux update to prevent 
    //expensive calls to local storage AND,
    //to maintain a more accurate history stack
    const debouncedUpdateTextInput = useMemo(
        () => debounce(updateTextInput, 1000)
    , [])
    const onTextInputChange = (e) =>{
        const target = e.target
        const value = target.closest(inputType).value
        if(charLimit && value.length > charLimit) return
        setLocalTextInput(value)
        debouncedUpdateTextInput(
            value, 
            dispatch, 
            reduxUpdateFunc
        )
    }
    return [localTextInput, onTextInputChange]
}
export default useReduxDebouncedTextInputs