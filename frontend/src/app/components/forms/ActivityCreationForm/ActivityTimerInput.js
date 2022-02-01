import { useState, useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import onlyNumInput from "../../../helpers/onlyNumInput"
import { updateActivityTimer } from "../../../../redux/features/activityCreation/activityCreationData"
import {debounce} from "lodash"
const ActivityTimerInput = () =>{
    const activityTimer = useSelector(state => state.activityCreation.data.activityTimer)
    const dispatch = useDispatch()
    const [localActivityTimer, setLocalActivityTimer] = useState({
        hours: "",
        minutes: "", 
        seconds: "",
    })
    //update local state to reflect redux
    useEffect(() => {
        let isMouted = true
        if(isMouted && activityTimer) setLocalActivityTimer(activityTimer)
        return () => {
            isMouted = false
        }
    }, [activityTimer])
    //debounced redux update
    const updateTimerRedux = (
        newState, 
        dispatch, 
        updateActivityTimer
    ) =>{
        dispatch(
            updateActivityTimer(newState)
        )
    }
    const debouncedTimerChange = useMemo(
        () => debounce(updateTimerRedux,1000)
    , [])
    const onInputChange = (e) =>{
        const target = e.target.closest("input")
        const inputType = target.dataset.inputType
        const value = target.value.toString()

        //each input should only have 2 integers
        if(value.length > 2) return
        setLocalActivityTimer((state) => {
            const newState = {
                ...state, 
                [inputType]: value
            }
            debouncedTimerChange(
                newState,
                dispatch,
                updateActivityTimer
            )
            return newState
        })
    }
    return(
        <>
            {activityTimer &&
                <div className="activity-timer-inputs">
                    <input
                        type={'number'}
                        data-input-type = {"hours"}
                        value = {localActivityTimer.hours}
                        onChange = {onInputChange}
                        onKeyDown={onlyNumInput}
                    />
                    <input 
                        type={'number'}
                        data-input-type = {"minutes"}
                        value = {localActivityTimer.minutes}
                        onChange = {onInputChange}
                        onKeyDown={onlyNumInput}
                    />
                    <input 
                        type={"number"}
                        data-input-type = {"seconds"}
                        value = {localActivityTimer.seconds}
                        onChange = {onInputChange}
                        onKeyDown={onlyNumInput}
                    />
                </div>
            }
        </>
    )
}
export default ActivityTimerInput