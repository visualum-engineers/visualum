
import updateSortQuestion from './utilityFunc/updateSortQuestion';
import updateMatchQuestion from "./utilityFunc/updateMatchQuestion"
const questionUpdate = ({
    type,
    oldData,
    newData
}) =>{
    let updatedData
    //updating general props of each question type
    if(newData.actionType === "update-points"){
        updatedData = {...oldData}
        updatedData.pointValue = newData.value
        return updatedData
    }
    if(newData.actionType === "update-instructions"){
        updatedData = {...oldData}
        updatedData.instructions = newData.value
        return updatedData 
    }
    //updating custom props of each question type
    switch(type){
        case "sort":
            return updateSortQuestion({
                oldData: oldData,
                newData: newData
            })
        case "matching":
            return updateMatchQuestion({
                oldData: oldData,
                newData: newData
            })
        case "radio":
            return
        case "checkbox":
            return
        case "shortAnswer":
            return
        case "labelPictures":
            return
        default:
            console.error("question type does not exist")
            return
    }
}
export default questionUpdate