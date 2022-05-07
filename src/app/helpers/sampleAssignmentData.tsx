const sortActivityChoices = (numChoices: any) =>{
    let choices = []
    for(let i=0; i<numChoices; i++) choices.push({id: i+1, content:"choice" + (i + 1)})
    return choices
}
const assignmentData = {
    activityID: "unique",
    activityName: "7C Week 2 HW Assignment  uyifsdh sdf odfpofkofeifeee",
    activityTimer: {hours: 1, minutes: 1, seconds: 1},
    questions: [
        //matching
        {
            type: "matching",
            keyPairs: [
                {categoryID: 1, name: "Arky"},
                {categoryID: 2, name: "Luis"},
                {categoryID: 3, name: "Derek"},
                {categoryID: 4, name: "Emilio"},
                {categoryID: 5, name: "lol"},
                {categoryID: 6, name: "hi"},
                {categoryID: 7, name: "no"},
                {categoryID: 8, name: "bye"},
            ],
            answerChoices : [
                {id:"1", content:"NY"}, 
                {id:"2", content:"The world know no bounds except that is cannot be at piece right now"},
                {id:"3", content:"Long Island"},
                {id:"4", content:"Nebraska"},
                {id:"5", content:"NY"}, 
                {id:"6", content:"Who Knows"},
                {id:"7", content:"Long Island"},
                {id:"8", content:"Nebraska"},
            ],
        },
        //multiple choice
        {
            type: "radio",
            question: "What faces this world?",
    
            imgDescription: "",
            answerChoices: [  
                {id: 1, content:"The world know no bounds except that is cannot be at piece right now-4"}, 
                {id: 2, content: "Bad-4"}, 
                {id: 3, content: "No-4"},
                {id: 4, content: "The world know no bounds except that is cannot be at piece right now-3"}, 
                {id: 5, content: "Bad-3"}, 
                {id: 6, content: "No-3"}, 
                {id: 7, content: "The world know no bounds except that is cannot be at piece right now-2"}, 
                {id: 8, content: "Bad-2"}, 
                {id: 9, content: "No-2"},
                {id: 10, content: "The world know no bounds except that is cannot be at piece right now-1"}, 
                {id: 11, content: "Bad-1"}, 
                {id: 12, content:"No-1"}
            ],
            imageURL : "images/homePage/mountain-home-bg.jpg",
    
        },
        //sorting
        {
            type: "sort",
            categories: [
                {categoryId: 1, name: "Good"},
                {categoryId: 2, name: "Medium"},
                {categoryId: 3, name: "Bad"},
                {categoryId: 4, name: "Nice"},
                {categoryId: 5, name: "Bye"},
                {categoryId: 6, name: "Hello"},
                {categoryId: 7, name: "Nah"}
            ],
            answerChoices: sortActivityChoices(100)
        },
        //short answer
        {
            type: "shortAnswer",
            question: "What faces this world?",
            imageURL: "images/homePage/mountain-home-bg.jpg",
            clientAnswer: "",
        },
        //label pictures
        {
            type: "labelPictures",
            questions: [
                {id: 1, content: "What faces this world? What faces this world? What faces this world? What faces this world?What faces this world? What faces this world? What faces this world? What faces this world? What faces this world? What faces this world? What faces this world? What faces this world? What faces this world? What faces this world? What faces this world? What faces this world? What faces this world?What faces this world? What faces this world? What faces this world? What faces this world? What faces this world? What faces this world? What faces this world? What faces this world? What faces this world? What faces this world? What faces this world? What faces this world? What faces this world?What faces this world? What faces this world? What faces this world? What faces this world? What faces this world? What faces this world? What faces this world? What faces this world? What faces this world? What faces this world? What faces this world? What faces this world? What faces this world?What faces this world? What faces this world? What faces this world?"}, 
                {id: 2, content:"What's your name?"},
                {id: 3, content:"What's your cool?"},
            ],
            imageURL: "images/homePage/mountain-home-bg.jpg",
            imgSize:{width:1169.3, height: 826.7},
            imgLabels:[
                {
                    id:1, 
                    x:200, 
                    y:200, 
                    width:10, 
                    height: 5,
                },
                {
                    id:2, 
                    x:400, 
                    y:400, 
                    width:10, 
                    height: 5,
                },
            ],
            answerChoices: [
                {id:"1", content:"The world know no bounds except that is cannot be at piece right now. The world will never know peace"}, 
                {id:"2", content:"Good"},
                {id:"3", content:"Nice" },
                {id:"4", content:"Duh" },
                {id:"5", content:"Bruh"},
                {id:"6", content:"Yuh" },
                {id:"7", content:"Fuh" }
            ],
        },
        //checkbox
        {
            type: "checkbox",
            question: "What faces this world?",
            imageURL : "images/homePage/mountain-home-bg.jpg",
            imgDescription: "",
            answerChoices: [  
                {id: 1, content:"The world know no bounds except that is cannot be at piece right now-4"}, 
                {id: 2, content: "Bad-4"}, 
                {id: 3, content: "No-4"},
                {id: 4, content: "The world know no bounds except that is cannot be at piece right now-3"}, 
                {id: 5, content: "Bad-3"}, 
                {id: 6, content: "No-3"}, 
                {id: 7, content: "The world know no bounds except that is cannot be at piece right now-2"}, 
                {id: 8, content: "Bad-2"}, 
                {id: 9, content: "No-2"},
                {id: 10, content: "The world know no bounds except that is cannot be at piece right now-1"}, 
                {id: 11, content: "Bad-1"}, 
                {id: 12, content:"No-1"}
            ]
        }
    ],
}
export default assignmentData
