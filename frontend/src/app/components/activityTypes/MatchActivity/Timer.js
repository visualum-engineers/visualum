import React, {useEffect,useState} from "react"
const CountDownTimer = ({timer={hours:20, minutes:12, seconds:1}}) =>{
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
    const [endTime, setEndTime] = useState(+new Date() + (1000 * timer.seconds) + (1000*60*timer.minutes) + (1000*60*60*timer.hours))
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endTime));
    useEffect(() => {
        const setTime = setTimeout(() => {
            setTimeLeft(calculateTimeLeft(endTime));
        }, 1000);
        return () => clearTimeout(setTime);
    });
    //generate timer format (H:M:S)
    let timerComponents = []
    Object.keys(timeLeft).forEach((interval) => {
        if (timeLeft[interval]>=10) timerComponents.push(<span>{interval==="seconds"? timeLeft[interval]:timeLeft[interval]+":"}</span>);
        else if(timeLeft[interval] === 0) timerComponents.push(<span>{`00:`}</span>);
        else timerComponents.push(<span>{`0${interval==="seconds"? timeLeft[interval]:timeLeft[interval]+":"}`}</span>);
    });
    return (
        <div className="match-activity-timer">
            {timerComponents}
        </div>
    );
}
export default CountDownTimer