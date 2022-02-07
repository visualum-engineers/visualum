import { v4 as uuidv4 } from 'uuid';
import { newSortCategory } from './dataFormats';
const questionFormat = (type) =>{
    switch(type){
        case "sort":
            return{
                key: uuidv4(),
                questionType: "sort",
                slideType: "sort",
                categories:[newSortCategory()],
                pointValue: "",
                instructions: "",
            }
        case "matching":
            return {
                key: uuidv4(),
                questionType: "matching",
                slideType: "matching",
                keyPairs: [
                    {
                        id: uuidv4(), 
                        key: "", 
                        answer: ""
                    }
                ],
                pointValue: "",
                instructions: "",
            }
        case "radio":
            return{
                key: uuidv4(),
                questionType: "radio",
                slideType: "radio",
                question: "",
                imgDescription: "",
                imageURL: "",
                answerChoices: [
                    {id: uuidv4(), content: ""}
                ],
                pointValue: "",
                instructions: "",
            }
        case "checkbox":
            return{
                key: uuidv4(),
                questionType: "checkbox",
                slideType: "checkbox",
                question: "",
                imageURL: "", 
                imgDescription: "",
                answerChoices: [],
                correctAnswer: "",
                pointValue: "",
                instructions: "",
            }   
        case "shortAnswer":
            return{
                key: uuidv4(),
                questionType: "shortAnswer",
                slideType: "shortAnswer",
                imgURL: "",
                question: "",
                pointValue: "",
                instructions: "",
            }
        case "labelPictures":
            return{
                key: uuidv4(),
                questionType: "labelPictures",
                slideType: "labelPictures",
                questions: [],
                imageURL: "",
                imgSize: {},
                imgLabels:[],
                answerChoices: [],
                pointValue: "",
                instructions: "",
            }
        default:
            return
    }
}
export default questionFormat