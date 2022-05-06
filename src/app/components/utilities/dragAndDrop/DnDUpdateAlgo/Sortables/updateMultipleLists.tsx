import {cloneDeep} from 'lodash'
//test is item comes from a word bank column
const answerChoiceTestEl = (el: string) => /answerChoices.*/.test(el) 
function updateMultipleSortableLists(
    data: any, 
    result: any
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

    //deep clone since we're using redux. Perforance is x10 slower
    //but is necessary
    const newData = cloneDeep(data)
    startAnswersList.splice(source.index, 1)
    //list container are same - remove el from old idx, add to new idx
    if(sameContainer){
        startAnswersList.splice(destination.index, 0, newData.answerChoices[draggableId]);
        newState = {
            ...newData,
            [startContainerType]: {
                ...newData[startContainerType],
                [start]: startAnswersList,
            }
        }
    } 
    //list containers are different - move elements into the new container, and remove them from old one
    else {
        finishAnswersList.splice(destination.index, 0, newData.answerChoices[draggableId]);
        newState = startContainerType===finishContainerType ? {
            ...newData,
            [startContainerType]:{
                ...newData[startContainerType],
                [start] : startAnswersList,
                [finish] : finishAnswersList,
            },
        }
        : {
            ...newData,
            [startContainerType]:{
                ...newData[startContainerType],
                [start] : startAnswersList,
            },
            [finishContainerType] : {
                ...newData[finishContainerType],
                [finish] : finishAnswersList,
            }
        }
    } 
    //maintain itemBank across resize, so we update allItems
    if(startContainerType==="itemBank") delete newState.allItems[draggableId]
    if(finishContainerType==="itemBank") newState.allItems[draggableId] = newData.answerChoices[draggableId]
    return newState
}
export default updateMultipleSortableLists