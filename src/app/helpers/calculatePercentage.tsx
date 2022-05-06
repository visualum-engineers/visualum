
const calculatePercentage = (currValue, total) =>{
    return Number(currValue/total*100).toFixed(2)
}
export default calculatePercentage

export const roundPercentToInt = (currValue, total) =>{
    const fixedToTwo = calculatePercentage(currValue, total)
    return Math.round(fixedToTwo)
}