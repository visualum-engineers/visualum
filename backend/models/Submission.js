const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var StudentSchema = new Schema({
    FirstName: {type: String, required: true},
    LastName: {type: String, required: true},
        StudentID: {
            type: mongoose.Schema.Types.ObjectId,
        }
});
var AssignmentSchema = new Schema({
    Name: String,
    AssignmentID: {
      type: mongoose.Schema.Types.ObjectId
    }
  });
  var QuestionAnswerSchema = new Schema({
    QuestionType: {type: String, required: true},
    MaxPoints: Number, 
    Data: {
            type: mongoose.Schema.Types.Mixed,
        },
    
    
    });
    var CreatorSchema = new Schema({
        FirstName: {type: String, required: true},
        LastName: {type: String, required: true},
            TeacherID: {
                type: mongoose.Schema.Types.ObjectId,
            }
    });
const SubmissionSchema = new Schema({
    Creator: CreateSchema,
    Name: String,
    Assignment : AssignmentSchema,
    Student: StudentSchema,
    Submission: QuestionAnswerSchema,
    StartTime: Date,
    EndTime: Date, 
    DueDate: Date,
    TimeLimit: Number,
    isGraded : Boolean,
    PointsEarned: Number

    
    
    
    
});
// the USer class and User mdodel 

const Submission = mongoose.model('submission',SubmissionSchema );

module.exports = Submission;