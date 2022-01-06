function updateMultipleSortableLists(
    data, 
    result, 
    answerChoiceTestEl
){
    const {destination, source, draggableId} = result
    if(!destination) return
    if(destination.droppableId === source.droppableId && destination.index === source.index) return
    //start and end containers
    const start = source.droppableId;
    const startContainerType = answerChoiceTestEl(start) ? "itemBank" : "categories"
    const finish = destination.droppableId;
    const finishContainerType = answerChoiceTestEl(finish) ? "itemBank" : "categories"

    //setup
    const startAnswersList = Array.from(answerChoiceTestEl(start) ? data.itemBank[start] : data.categories[start])
    const finishAnswersList = Array.from(answerChoiceTestEl(finish) ? data.itemBank[finish] : data.categories[finish])
    const sameContainer = start===finish
    let newState

    startAnswersList.splice(source.index, 1)
    //list container are same - remove el from old idx, add to new idx
    if(sameContainer){
        startAnswersList.splice(destination.index, 0, data.answerChoices[draggableId]);
        newState = {
            ...data,
            [startContainerType]: {
                ...data[startContainerType],
                [start]: startAnswersList,
            }
        }
    } 
    //list containers are different - move elements into the new container, and remove them from old one
    else {
        finishAnswersList.splice(destination.index, 0, data.answerChoices[draggableId]);
        newState = startContainerType===finishContainerType ? {
            ...data,
            [startContainerType]:{
                ...data[startContainerType],
                [start] : startAnswersList,
                [finish] : finishAnswersList,
            },
        }
        : {
            ...data,
            [startContainerType]:{
                ...data[startContainerType],
                [start] : startAnswersList,
            },
            [finishContainerType] : {
                ...data[finishContainerType],
                [finish] : finishAnswersList,
            }
        }
    } 
    //maintain itemBank across resize, so we update allItems
    if(startContainerType==="itemBank") delete newState.allItems[draggableId]
    if(finishContainerType==="itemBank") newState.allItems[draggableId] = data.answerChoices[draggableId]
    return newState
}
export default updateMultipleSortableLists