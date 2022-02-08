const updateSortableLists = ({
    oldData,
    newData
})=>{
    let updatedData
    const {destination, draggableId, source} = newData.newData
    const startCategory = oldData.categories[source.startCategoryIndex]
    const endCategory = oldData.categories[destination.endCategoryIndex]
    const startIndex = source.index
    const endIndex = destination.index
    //we have to change pos
    let newStartCategory = {...startCategory}
    let startArr = [...newStartCategory.answers]

    let addedAnswer
    if(startArr[startIndex].id === draggableId){
        addedAnswer = startArr.splice(startIndex, 1)[0]
    } else return
    
    //same index and container
    if(startCategory.id === endCategory.id){
        //if they are the same
        if(startIndex === endIndex) return
        startArr.splice(endIndex, 0, addedAnswer)
        newStartCategory.answers = startArr
        updatedData = {
            ...oldData,
            categories: [...oldData.categories]
        }
        updatedData.categories[source.startCategoryIndex] = newStartCategory
        return updatedData
    }
    //if they are different categories
    else{
        let newEndCategory = {...endCategory}
        let endArr = [...newEndCategory.answers]
        
        endArr.splice(endIndex, 0, addedAnswer)

        newStartCategory.answers = startArr
        newEndCategory.answers = endArr
        updatedData = {
            ...oldData,
            categories: [...oldData.categories]
        }
        updatedData.categories[source.startCategoryIndex] = newStartCategory
        updatedData.categories[destination.endCategoryIndex] = newEndCategory
    }
    return updatedData
}
export default updateSortableLists