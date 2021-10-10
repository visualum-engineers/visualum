import React, {useEffect,useState} from "react"
const CountDownTimer = ({timer={hours:1, minutes:1, seconds:1}}) =>{
    const calculateTimeLeft = (endTime) => {
        const difference = +endTime - +new Date();
        let timeLeft = {};
        if (difference > 0) {
          timeLeft = {
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          };
        }
        return timeLeft;
      };

    //state to keep track of time remaining
    const [endTime, setEndTime] = useState(+new Date() + (1000 * timer.seconds) + (1000*60*timer.minutes) + (1000*60*60*timer.hours))
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endTime));
    const [timerStarted, setTimerStarted] = useState(false)
    
    const startTimer = () =>{
        setEndTime(+new Date() + (1000 * timer.seconds) + (1000*60*timer.minutes) + (1000*60*60*timer.hours))
        setTimerStarted(true)
    }
    
    //updates timer every second
    useEffect(() => {
        
        const setTime = setTimeout(() => {
            if(timerStarted)setTimeLeft(calculateTimeLeft(endTime));
        }, 1000);

        return () => clearTimeout(setTime);
    });


    //generate timer format (H:M:S)
    let timerComponents = []
    Object.keys(timeLeft).forEach((interval) => {
        if (timeLeft[interval]>=10) timerComponents.push(<span key={interval}>{interval==="seconds"? timeLeft[interval]:timeLeft[interval]+":"}</span>);
        else if(timeLeft[interval] === 0) timerComponents.push(<span key={interval}>{`00:`}</span>);
        else timerComponents.push(<span key={interval}>{`0${interval==="seconds"? timeLeft[interval]:timeLeft[interval]+":"}`}</span>);
    });
    
    return (
        <>
            {timerComponents}
            <button onClick={startTimer}><span>Start Activity</span></button>
        </>
    );
}
export default CountDownTimer