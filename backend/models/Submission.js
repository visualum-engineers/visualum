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
    Data: {
            type: mongoose.Schema.Types.Mixed,
        },
    Answer: {
            type: mongoose.Schema.Types.Mixed,
        }
    
    
    });

const SubmissionSchema = new Schema({
    
    Assignment : AssignmentSchema,
    Student: StudentSchema,
    Submission: QuestionAnswerSchema
    
    
    
    
});
// the USer class and User mdodel 

const Submission = mongoose.model('submission',SubmissionSchema );

module.exports = Submission;