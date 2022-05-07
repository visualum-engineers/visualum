import _ from "lodash";
const labelPicValidation = (data: any) =>{
    let unfinished: any = {}
    const categoriesArr = Object.keys(data.categories)
    for (let i in categoriesArr){
        //evaluate
        const category = data.categories[categoriesArr[i]]
        if(category.length === 0) unfinished[categoriesArr[i]] = true
    }

    //holds all unfinished categories, so we can look them up
    return _.isEmpty(unfinished) ? null : unfinished
}
export default labelPicValidation