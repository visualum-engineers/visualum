const assignmentData = {
    activityID: "unique",
    //matching
    1: {
        type: "matching",
        timer: {hours: 1, minutes: 1, seconds: 1},
        matchPair:{
            "Pair1Pair1Pair1Pair1Pair1Pair1Pair1Pair1Pair1Pair1":"Pair1-Pair1-Pair1-Pair1-Pair1-", 
            "Pair1-Pair1-Pair1-Pair1-Pair1-":"Pair1Pair1Pair1Pair1Pair1Pair1Pair1Pair1Pair1Pair1",
            "Pair2":"Pair2-", 
            "Pair2-":"Pair2", 
            "Pair3":"Pair3-", 
            "Pair3-":"Pair3",
            "Pair4-":"Pair4",
            "Pair4":"Pair4-", 
            "Pair5":"Pair5-",
            "Pair5-":"Pair5",
            "Pair6":"Pair6-", 
            "Pair6-":"Pair6",
            "Pair7-":"Pair7",
            "Pair7":"Pair7-", 
            "Pair8":"Pair8-",
            "Pair8-":"Pair8",
            "Pair9":"Pair9-", 
            "Pair9-":"Pair9",
            "Pair10-":"Pair10",
            "Pair10":"Pair10-", 
            "Pair11":"Pair11-",
            "Pair11-":"Pair11",
            "Pair12":"Pair12-", 
            "Pair12-":"Pair12",
            "Pair13-":"Pair13",
            "Pair13":"Pair13-", 
            "Pair14":"Pair14-",
            "Pair14-":"Pair14",
        },
    },
    //multiple choice
    2:{
        type: "multipleChoice",
        timer: false,
        question: "What faces this world?",
        imageURL : "images/homePage/mountain-home-bg.jpg",
        imgDescription: "",
        answerChoices: ["Good What faces this world", "Bad", "No"]
    },
    //sorting
    3: {
        type: "sort",
        timer: false,
        categories: [
            {categoryId: 1, name: "Good"},
            {categoryId: 2, name: "Medium"},
            {categoryId: 3, name: "Bad"},
            {categoryId: 4, name: "Nice"},
            {categoryId: 5, name: "Bye"}

        ],

        answers: [
            {categoryId: "1", id:"1", content:"Okay"}, 
            {categoryId: "1", id:"2", content:"Good"},
            {categoryId: "1", id:"3", content:"Nice" },
            {categoryId: "2", id:"4", content:"Duh" },
            {categoryId: "2", id:"5",content:"Bruh"},
            {categoryId: "2", id:"6",content:"Yuh" },
            {categoryId: "3", id:"7",content:"Fuh" },
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