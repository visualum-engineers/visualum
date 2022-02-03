import { useState, useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import onlyNumInput from "../../../../helpers/onlyNumInput"
import { updateActivityTimer } from "../../../../../redux/features/activityCreation/activityCreationData"
import {debounce} from "lodash"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"
const ActivityTimerInput = ({
    smallWindowWidth
}) =>{
    const initialState = {
        hours: "",
        minutes: "", 
        seconds: "",
    }
    const activityTimer = useSelector(state => state.activityCreation.data.present.activityTimer)
    const dispatch = useDispatch()
    const [localActivityTimer, setLocalActivityTimer] = useState(activityTimer)
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
        <div className={`d-flex ${!smallWindowWidth? "w-100": "w-50"}`}>
            {//btn for adding a timer
                !activityTimer && 
                <button 
                    onClick = {() => dispatch(updateActivityTimer(initialState))}
                    aria-label = {"add-activity-timer"}
                    className={`activity-creation-timer-add ${!smallWindowWidth? "w-100": ""}`}
                >
                    <FontAwesomeIcon icon={faPlus} />
                    <span>Add Timer</span>
                </button>
            }
            {activityTimer && localActivityTimer &&
                <div className={`d-flex flex-column w-100`}>
                    <label 
                        className="activity-timer-creation-label"
                    >Activity Timer</label>
                    <div className="d-flex">
                        <div className="activity-timer-inputs">
                            <input
                                type={'number'}
                                data-input-type = {"hours"}
                                value = {localActivityTimer.hours}
                                onChange = {onInputChange}
                                onKeyDown={onlyNumInput}
                                placeholder={"hr"}
                                aria-label={"timer-hours"}
                            />
                            :
                            <input 
                                type={'number'}
                                data-input-type = {"minutes"}
                                value = {localActivityTimer.minutes}
                                onChange = {onInputChange}
                                onKeyDown={onlyNumInput}
                                placeholder={"min"}
                                aria-label={"timer-minutes"}

                            />
                            :
                            <input 
                                type={"number"}
                                data-input-type = {"seconds"}
                                value = {localActivityTimer.seconds}
                                onChange = {onInputChange}
                                onKeyDown={onlyNumInput}
                                placeholder={"sec"}
                                aria-label={"timer-seconds"}
                            />
                        </div>
                        <button
                            onClick = {() => {
                                dispatch(updateActivityTimer(null))
                                setLocalActivityTimer(null)
                            }}
                            aria-label = {"remove-activity-timer"}
                            className={"activity-creation-timer-remove"}
                            
                        >
                            <FontAwesomeIcon icon ={faMinus} />
                            {smallWindowWidth && <span>Remove</span>}
                        </button>
                    </div>  
                </div>
            }
        </div>
    )
}
export default ActivityTimerInput