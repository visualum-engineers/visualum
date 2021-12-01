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

var TeacherSchema = new Schema({
    FirstName: {type: String, required: true},
    LastName: {type: String, required: true},
        TeacherID: {
            type: mongoose.Schema.Types.ObjectId,
        }
});
var StudentSchema = new Schema({
    FirstName: {type: String, required: true},
    LastName: {type: String, required: true},
        StudentID: {
            type: mongoose.Schema.Types.ObjectId,
        }
});
var ActiveAssignmentSchema = new Schema({
    Name: {type: String, required: true},
    AssignmentID: {
            type: mongoose.Schema.Types.ObjectId,
        }
});
var ClassCodeSchema = new Schema({
    expdate: Date,
    code: Number
});

const ClassSchema = new Schema({
    Name: String,
    ClassCode: ClassCodeSchema,
    Teacher : TeacherSchema,
    School : SchoolSchema,
    Students : [StudentSchema],
    ActiveAssignments : [ActiveAssignmentSchema],
    ClassGoal:  String
    
});


const Class = mongoose.model('class',ClassSchema );

module.exports = Class;