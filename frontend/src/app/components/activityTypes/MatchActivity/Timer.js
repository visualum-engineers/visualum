import React, {useEffect,useState} from "react"
const CountDownTimer = ({timer={hours:0, minutes:0, seconds:0}, autoStart=true, pauseBtn=false, resetBtn=false}) =>{
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
    const [timerStarted, setTimerStarted] = useState(autoStart)

    const startTimer = () =>{
        setEndTime(+new Date() + (1000 * timeLeft.seconds) + (1000*60*timeLeft.minutes) + (1000*60*60*timeLeft.hours))
        setTimerStarted(true)
    }
    const stopTimer = () =>{
        setTimerStarted(false)
    }
    const resetTimer = () =>{
        setEndTime(+new Date() + (1000 * timer.seconds) + (1000*60*timer.minutes) + (1000*60*60*timer.hours))
    }
    //updates timer every second, once timer is started
    useEffect(() => {
        const setTime = setTimeout(() => {
            if(timerStarted) setTimeLeft(calculateTimeLeft(endTime));
        }, 1000);

        return () => clearTimeout(setTime);
    });

    //generate timer format (H:M:S)
    let timerComponents = []
    Object.keys(timeLeft).forEach((interval) => {
        if (timeLeft[interval]>=10) timerComponents.push(<span key={interval}>{interval==="seconds"? timeLeft[interval]:timeLeft[interval]+":"}</span>);
        else if(timeLeft[interval] === 0) timerComponents.push(<span key={interval}>{interval==="seconds"?"00":"00:"}</span>);
        else timerComponents.push(<span key={interval}>{`0${interval==="seconds"? timeLeft[interval]:timeLeft[interval]+":"}`}</span>);
    });
    
    return (
        <>
            <div className="timer-counter">
                {timerComponents}
            </div>
            { timerStarted ? null
            : <button onClick={startTimer} aria-label="start-timer">
                <span aria-label="start-timer">
                    <i className="fa fa-play" aria-hidden="true"></i>
                </span>
            </button>}
            {pauseBtn ?
                timerStarted ?
                    <button onClick={stopTimer} aria-label="pause-timer">
                        <span aria-label="pause-timer">
                            <i className="fa fa-pause" aria-hidden="true"></i>
                        </span>
                    </button>
                : null
            : null}
            {resetBtn ?
                !timerStarted ?
                    <button onClick={resetTimer} aria-label="reset-timer">
                            <span aria-label="reset-timer">
                                <i className="fa fa-repeat" aria-hidden="true"></i>
                            </span>
                    </button>
                :null
            :null}
        </>
    );
}

export default CountDownTimer