import { v4 as uuidv4 } from 'uuid';

const questionFormat = (type) =>{
    switch(type){
        case "sort":
            return{
                key: uuidv4(),
                questionType: "sort",
                slideType: "sort",
                categories:[],
                answerChoices: []
            }
        case "matching":
            return {
                key: uuidv4(),
                questionType: "matching",
                slideType: "matching",
                keyPairs: [],
                answerChoices: []
            }
        case "radio":
            return{
                key: uuidv4(),
                questionType: "radio",
                slideType: "radio",
                question: "",
                imgDescription: null,
                imageURL: null,
                answerChoices: [],
            }
        case "checkbox":
            return{
                key: uuidv4(),
                questionType: "checkbox",
                slideType: "checkbox",
                question: "",
                imageURL: null, 
                imgDescription: null,
                answerChoices: [],
            }   
        case "shortAnswer":
            return{
                key: uuidv4(),
                questionType: "shortAnswer",
                slideType: "shortAnswer",
                imgURL: null,
                question: "",
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
                answerChoices: []
            }
        default:
            return
    }
}
export default questionFormat