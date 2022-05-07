//uses a greedly algo to get difference
const convertTimeDiff =(startTime: any, endTime: any) =>{
    let difference = new Date(endTime).getTime() - new Date(startTime).getTime()
    const hour = 60*60*1000
    const minutes = 60*1000
    const seconds = 1000
    const timerData = {
        hours: 0,
        minutes: 0,
        seconds: 0,
    }
    //hours
    while(difference - hour >= 0){
        timerData.hours += 1;
        difference -= hour
    }
    //minutes
    while(difference - minutes >= 0){
        timerData.minutes += 1;
        difference -= minutes
    }
    //seconds
    while(difference - seconds >= 0){
        timerData.seconds +=1;
        difference -= seconds;
    }
    return timerData
}
export default convertTimeDiff