import _ from "lodash"
const matchActivityValidation = (data) =>{
    let unfinished = {}
    const categoriesArr = Object.keys(data.keyPairs)
    for (let i in categoriesArr){
        //evaluate
        const category = data.keyPairs[categoriesArr[i]]
        if(category.length === 0) unfinished[categoriesArr[i]] = true
    }

    //holds all unfinished categories, so we can look them up
    return _.isEmpty(unfinished) ? null : unfinished
}
export default matchActivityValidation