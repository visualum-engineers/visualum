const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


var SchoolSchema = new Schema({
    Name: {type: String, required: true},
    Address : {Street: String, Apartment: String, 
        State: String, Country: String, 
        ZIP: Number},
        SchoolID: {
            type: mongoose.Schema.Types.ObjectId,
        }
});

var CreatorSchema = new Schema({
    FirstName: {type: String, required: true},
    LastName: {type: String, required: true},
        TeacherID: {
            type: mongoose.Schema.Types.ObjectId,
        }
});
var QuestionSchema = new Schema({
    QuestionType: {type: String, required: true},
    MaxPoints : number,
    Data: {
            type: mongoose.Schema.Types.Mixed,
        }
});



const AssignmentSchema = new Schema({
    Name: String,
    Creator : CreatorSchema,
    DueDate: Date,
    TimeLimit: Number ,
    questions: [QuestionSchema]
   
});


const Assignment = mongoose.model('assignment',AssignmentSchema );

module.exports = Assignment;