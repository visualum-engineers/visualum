
const calculatePercentage = (currValue: number, total: number) =>{
    return Number(currValue/total*100).toFixed(2)
}
export default calculatePercentage

export const roundPercentToInt = (currValue: any, total: any) =>{
    const fixedToTwo = calculatePercentage(currValue, total)
    return Math.round(parseFloat(fixedToTwo))
}