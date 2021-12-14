const assignmentData = {
    activityID: "unique",
    activityName: "7C Week2 HW Assignment",
    //matching
    3: {
        type: "matching",
        timer: {hours: 1, minutes: 1, seconds: 1},
        keyPairs: [
            {categoryID: 1, name: "Arky"},
            {categoryID: 2, name: "Luis"},
            {categoryID: 3, name: "Derek"},
            {categoryID: 4, name: "Emilio"},
            {categoryID: 5, name: "lol"},
            {categoryID: 6, name: "hi"},
            // {categoryID: 7, name: "no"},
            // {categoryID: 8, name: "bye"},
        ],
        answerChoices : [
            {id:"1", content:"NY"}, 
            {id:"2", content:"The world know no bounds except that is cannot be at piece right now"},
            {id:"3", content:"Long Island"},
            {id:"4", content:"Nebraska"},
            {id:"5", content:"NY"}, 
            {id:"6", content:"Who Knows"},
            // {id:"7", content:"Long Island"},
            // {id:"8", content:"Nebraska"},
        ],
    },
    //multiple choice
    2:{
        type: "multipleChoice",
        timer: false,
        question: "What faces this world?",
        imageURL : "images/homePage/mountain-home-bg.jpg",
        imgDescription: "",
        answerChoices: ["The world know no bounds except that is cannot be at piece right now-4", "Bad-4", "No-4","The world know no bounds except that is cannot be at piece right now-3", "Bad-3", "No-3", "The world know no bounds except that is cannot be at piece right now-2", "Bad-2", "No-2","The world know no bounds except that is cannot be at piece right now-1", "Bad-1", "No-1"]
    },
    //sorting
    1: {
        type: "sort",
        timer: false,
        categories: [
            {categoryId: 1, name: "Good"},
            {categoryId: 2, name: "Medium"},
            {categoryId: 3, name: "Bad"},
            {categoryId: 4, name: "Nice"},
            {categoryId: 5, name: "Bye"},
            {categoryId: 6, name: "Hello"},
            {categoryId: 7, name: "Nah"}
        ],
        answerChoices: [
            {id:"1", content:"The world know no bounds except that is cannot be at piece right now. The world will never know peace"}, 
            {id:"2", content:"Good"},
            {id:"3", content:"Nice" },
            {id:"4", content:"Duh" },
            {id:"5", content:"Bruh"},
            {id:"6", content:"Yuh" },
            {id:"7", content:"Fuh" },
        ]
    },
    //short answer
    4: {
        timer:false,
        type: "shortAnswer",
        question: "What faces this world?",
    }
}
export default assignmentData