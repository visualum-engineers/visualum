import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { unstable_batchedUpdates } from "react-dom"
import { calculateTimeLeft } from "../utilities/timer/Timer"
import PopUpBg from "../utilities/popUp/PopUpBackground"
const ActivityTimeReminder = ({
    popUpBgStyles
}) =>{
    const timerEndTime = useSelector((state) => state.activities.data.clientData.present.clientAnswerData.activityEndTime)
    const timeIntervalDuration = useSelector((state) => state.activities.settings.timeIntervalDuration)
    const [timeReminderPopUp, setTimeReminderPopUp] = useState(false)
    const [currTime, setTimeLeft] = useState(timeIntervalDuration)
    //when time reminder settings change
    //we update and reset
    useEffect(()=>{
        let isMounted = true
        if(isMounted) setTimeLeft(timeIntervalDuration)
    }, [timeIntervalDuration])
    
    //time reminder popup 
    useEffect(() => {
        let isMounted = true
        const setTime = setTimeout(() => {
            if(isMounted) setTimeLeft((state) => state - 1000);
        }, 1000);
        if(currTime <= 1000) {
            unstable_batchedUpdates(()=>{
                if(!isMounted) return
                setTimeLeft(timeIntervalDuration)
                setTimeReminderPopUp(true)
            })
        }
        return () => {
            isMounted = false
            clearTimeout(setTime);
        }
    }, [timeIntervalDuration, currTime]);

    const timeLeft = calculateTimeLeft(+new Date(timerEndTime))

    return (
        <>
            {timeReminderPopUp &&
                <PopUpBg
                    ariaLabel="exit-time-reminder"
                    onClick={() => setTimeReminderPopUp(false)}
                    containerStyles = {{...popUpBgStyles, zIndex: "5"}}
                >
                    <div className="activity-reset-popup col-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                        <span>
                            You have {timeLeft.hours + " hrs and " + timeLeft.minutes + " mins left"}
                        </span>
                        <button
                            className="btn btn-danger"
                            aria-label = "close-time-reminder"
                            onClick={() => setTimeReminderPopUp(false)}
                        >Close</button>
                </div>
               </PopUpBg> 
            }
        </>
        
    )
}
export default ActivityTimeReminder