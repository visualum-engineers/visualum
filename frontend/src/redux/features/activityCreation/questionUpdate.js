import { newSortCategory, newSortAnswer } from './dataFormats';
import removeWhiteSpace from "../../../app/helpers/removeWhiteSpace"
const questionUpdate = ({
    type,
    oldData,
    newData
}) =>{
    let updatedData
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
    switch(type){
        case "sort":
            let categoryIndex, category, answerIndex, answers, newAnswers, categories, newCategory
            switch(newData.updateType){
                case "add-answer":
                    categoryIndex = parseInt(newData.categoryIndex)
                    category = {...oldData.categories[categoryIndex]}
                    answers = [...category.answers] 
                    answers.push(newSortAnswer())
                    //build a new copy of question data
                    category.answers = answers
                    updatedData = {
                        ...oldData,
                        categories: [...oldData.categories]
                    }
                    updatedData.categories[categoryIndex] = category
                    break;
                case "update-answer":
                    categoryIndex = parseInt(newData.categoryIndex)
                    answerIndex = parseInt(newData.answerIndex)
                    category = {...oldData.categories[categoryIndex]}
                    answers = [...category.answers] 
                    if(answers[answerIndex].id !== newData.newData.id) return
                    //clone objects
                    newAnswers = {...answers[answerIndex]}
                    const newContent = removeWhiteSpace(newData.newData.content)
                    newAnswers.content = newContent.length > 0 ? newContent : "Empty"
                    answers[answerIndex] = newAnswers
                    category.answers = answers
                    //build a new copy of question data
                    updatedData = {
                        ...oldData,
                        categories: [...oldData.categories]
                    }
                    updatedData.categories[categoryIndex] = category
                    break
                case "delete-answer":
                    categoryIndex = parseInt(newData.categoryIndex)
                    answerIndex = parseInt(newData.answerIndex)
                    category = {...oldData.categories[categoryIndex]}
                    answers = [...category.answers] 
                    answers.splice(answerIndex, 1)
                    //build a new copy of question data
                    category.answers = answers
                    updatedData = {
                        ...oldData,
                        categories: [...oldData.categories]
                    }
                    updatedData.categories[categoryIndex] = category
                    break
                case "add-category":
                    categories = [...oldData.categories]
                    categories.push(newSortCategory())
                    updatedData = {
                        ...oldData, 
                        categories: categories
                    }
                    break
                case "update-category":
                    categoryIndex = parseInt(newData.categoryIndex)
                    categories = [...oldData.categories]
                    if(categories[categoryIndex].id !== newData.newData.id) return
                    //clone objects
                    newCategory = {...categories[categoryIndex]}
                    const newTitle = removeWhiteSpace(newData.newData.title)
                    newCategory.title = newTitle.length > 0 ? newTitle : "Untitled"
                    //build a new copy of question data
                    updatedData = {
                        ...oldData,
                        categories: categories
                    }
                    updatedData.categories[categoryIndex] = newCategory
                    break
                case "delete-category":
                    categories = [...oldData.categories]
                    categories.splice(newData.categoryIndex, 1)
                    updatedData = {
                        ...oldData, 
                        categories: categories
                    }
                    break
                default:
                    console.error("action type does not match")
                    break
            }
            return updatedData
        case "matching":
            return 
        case "radio":
            return
        case "checkbox":
            return
        case "shortAnswer":
            return
        case "labelPictures":
            return
        default:
            return
    }
}
export default questionUpdate