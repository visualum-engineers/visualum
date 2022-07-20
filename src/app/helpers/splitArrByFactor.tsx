function splitArrByFactor<T>(arr: T[], factor: number){
    let newArr: (T[])[]=[]
    let subArr = []
    for(let idx in arr) {
        subArr.push(arr[idx])
        if(subArr.length%factor === 0) {
            newArr.push(subArr)
            subArr = []
        }
    }
    if(subArr.length>0) newArr.push(subArr)
    return newArr
}
export default splitArrByFactor