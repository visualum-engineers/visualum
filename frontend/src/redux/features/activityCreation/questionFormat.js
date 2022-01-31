const questionFormat = (type) =>{
    switch(type){
        case "sort":
            return{
                type: "sort",
                categories:[],
                answerChoices: []
            }
        case "matching":
            return {
                type: "matching",
                keyPairs: [],
                answerChoices: []
            }
        case "radio":
            return{
                type: "radio",
                question: "",
                imgDescription: null,
                imageURL: null,
                answerChoices: [],
            }
        case "checkbox":
            return{
                type: "checkbox",
                question: "",
                imageURL: null, 
                imgDescription: null,
                answerChoices: [],
            }   
        case "labelPictures":
            return{
                type: "labelPictures",
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