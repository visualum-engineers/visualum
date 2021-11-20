/*
 const testUser1 = new User({FirstName: 'LU', LastName: 'Samaniego',Email: 'aa@cornell.edu',Password: 'password',
 AccountType: 'free', Avatar_ID: 'red', CompletedAssignments: [{TimeStarted: "2002-12-09", TimeEnded: "2002-12-11"},
 {TimeStarted: "2012-12-09", TimeEnded: "2012-12-12"} ]
});
testUser1.save();
const testUser2 = new User({FirstName: 'LU2', LastName: 'Samaniego',Email: 'aa@cornell.edu',Password: 'password',
 AccountType: 'free', Avatar_ID: 'red', CompletedAssignments: [{TimeStarted: "2002-12-09", TimeEnded: "2002-12-11"},
 {TimeStarted: "2012-12-09", TimeEnded: "2012-12-12"} ]
});
testUser2.save();

const testClass = new Class({ClassCode: 12, ClassGoal: '1000 points'});
testClass.save();

const testSchool = new School({Name: 'Cornell', Address:{Street:'Day Hall', State: 'NY', Country : 'USA', ZIP: '14450'},
});
testSchool.save();


const testRewardStore = new RewardStore({ Name: 'Cornell Store', Rewards:{
Name: 'Amazon Card', Price: 25, RedeemedBy: 'Arky Asmal', NumAvailable: 5, 

}

});
testRewardStore.save();


const testLabelPicture = new LabelPicture({imgURL: 'sdsff',
imgDimensions:{width: 120, height: 120},
Labels:[{x:0,y:100,width:100,height:200,text:'dog'}
,{x:10,y:200,width:200,height:200,text:'cat'}]
})
testLabelPicture.save();



const testMultipleChoice = new MultipleChoice({
Question: 'What is the capital of France?',
imgURL: 'fwrfrgg',
Answers: [{text: 'Berlin', isAnswer: false}
        ,{text:'Paris', isAnswer: true},
        ,{text:'Spain', isAnswer:false} 
]

});
testMultipleChoice.save();



const testShortAnswer = new ShortAnswer({
Question: 'Describe the three branches of the US government.',
imgURL: '324fnj3i4'


})
testShortAnswer.save();


const testMatching = new Matching({Pairs:{
Pair1: 'Pair2',
Pair2 : 'Pair3',
Pair3: 'Pair4'
}


})
testMatching.save();


const testSchool = new School({Name: 'Cornell', Address:{Street:'Day Hall', State: 'NY', Country : 'USA', ZIP: '14450'},
});

const testSchool2 = new School({Name: 'NYU', Address:{Street:'Day Hall', State: 'NY', Country : 'USA', ZIP: '14450'},
});
testSchool.save();
testSchool2.save();


const testSchoolRewardStore = new SchoolRewardStore(
    {Name: 'Arkys store', 
    School:{Name: 'Cornell UNiversity', 
        Address:{Street:'Day Hall', State: 'NY', Country : 'USA', ZIP: '14450'} 
        ,
        SchoolID : '61933415c74d745480465843'
     },

    Rewards: [{Name:'Xbox One', Price: 400, RedeemedBy: 'Emilio',NumAvailable: 2,IMGURL:'213ed'}]


});
testSchoolRewardStore.save();

const testStudentUser1 = new StudentUser({FirstName: 'Arky', LastName: 'Asmal',Email: 'aa@cornell.edu',Password: 'password',
AccountType: 'free', Avatar_ID: 'red',
School:{Name: 'Cornell UNiversity', 
        Address:{Street:'Day Hall', State: 'NY', Country : 'USA', ZIP: '14450'} 
        ,
        SchoolID : '61933415c74d745480465843'
     },
CompletedAssignments: [{TimeStarted: "2002-12-09", TimeEnded: "2002-12-11",AssignmentID : '61933415c74d745480465841'},
{TimeStarted: "2012-12-09", TimeEnded: "2012-12-12",AssignmentID : '61933415c74d745480465841'} ]
});
testStudentUser1.save();



const testTeacherUser1 = new TeacherUser({FirstName: 'Arky', LastName: 'Asmal',Email: 'aa@cornell.edu',Password: 'password',
 Avatar_ID: 'red', PaymentInfo: 'dfdrg',
School:{Name: 'Cornell UNiversity', 
        Address:{Street:'Day Hall', State: 'NY', Country : 'USA', ZIP: '14450'} 
        ,
        SchoolID : '61933415c74d745480465843'
     },
AssignmentCreated: [{ Name: "Bio 101 Hmwk 1",AssignmentID : '61933415c74d745480465841'},
{ Name: "Bio 101 Hmwk 2",AssignmentID : '61933415c74d745480465842'} ],
Classes : [{Name:'Biology 101',ClassID:'61933415c74d745480465848'}]

});
testTeacherUser1.save();

const testClassRewardStore = new ClassRewardStore(
    {Name: 'Arkys class store', 
    Class:{Name: 'Biology 101', 
       
        ClassID : '61933415c74d745480465848'
     },

    Rewards: [{Name:'Xbox One', 
                Price: 400, 
                RedeemedBy: [{FirstName: 'Emilio',LastName:'Samaniego', StudentID: '61945a04d5cb61cc30900c21' }],
                NumAvailable: 2,
                IMGURL:'213ed'}]


});
testClassRewardStore.save();

const testSchoolRewardStore = new SchoolRewardStore(
    {Name: 'Arkys store', 
    School:{Name: 'Cornell UNiversity', 
        Address:{Street:'Day Hall', State: 'NY', Country : 'USA', ZIP: '14450'} 
        ,
        SchoolID : '61933415c74d745480465843'
     },

    Rewards: [{Name:'Xbox One', Price: 400, RedeemedBy: [{FirstName: 'Emilio',LastName:'Samaniego', StudentID: '61945a04d5cb61cc30900c21' }],NumAvailable: 2,IMGURL:'213ed'}]


});
testSchoolRewardStore.save();

const testClass = new Class({
    Name: 'Biology 101',
    ClassCode: 234,
    Teacher: {FirstName: 'Arky', LastName: 'Asmal', TeacherID: '6194626b9660bcae23a5a68f'},
    School: {Name: 'Cornell UNiversity', 
        Address:{Street:'Day Hall', State: 'NY', Country : 'USA', ZIP: '14450'}, 
        SchoolID : '61933415c74d745480465843'},
    Students: [{FirstName: 'Arky', LastName: 'Asmal',StudentID: '61945a04d5cb61cc30900c21'}],
    ActiveAssignments: [{Name: 'Bio 101 Hmwk 101',AssignmentID: '61933415c74d745480465841'}],
    ClassGoal: 'Have a 100% Participation rate'


})
testClass.save();

const testAssignment = new Assignment({
Name: 'Bio 101 Hmwk 1',
Creator: {FirstName: 'Arky', LastName: 'Asmal', TeacherID: '6194626b9660bcae23a5a68f' },
DueDate: "2021-12-09", 
TimeLimit: 3600,
questions: [{QuestionType:'multiple choice', 
             Data: {question:'What is 5-2',
             imgURL:'2rdwef2',
             Answers: [{text: 'Berlin', isAnswer: false}
                ,{text:'Paris', isAnswer: true}
                ,{text:'Spain', isAnswer:false} 
                ]
            }     
             },
             {QuestionType: 'Short Answer',
             Data:  {Question: 'Describe the three branches of the US government.',
                    imgURL: '324fnj3i4'}
            }
            
            ]


})

testAssignment.save();
*/