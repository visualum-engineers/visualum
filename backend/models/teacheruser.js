const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var AssignmentSchema = new Schema({
    TimeStarted: Date,
    TimeEnded: Date,
    AssignmentID: {
      type: mongoose.Schema.Types.ObjectId
    }
  });
  var CreatedAssignmentSchema = new Schema({
    Name: String,
    AssignmentID: {
      type: mongoose.Schema.Types.ObjectId
    }
  });

  var ClassSchema = new Schema({
    Name: String,
    ClassID: {
      type: mongoose.Schema.Types.ObjectId
    }
  });
  var SchoolSchema = new Schema({
    Name: {type: String, required: true},
    Address : {Street: String, Apartment: String, 
        State: String, Country: String, 
        ZIP: Number},
        SchoolID: {
            type: mongoose.Schema.Types.ObjectId,
        }
});
var EnterpriseSchema = new Schema({
  Name: Sting,
  EnterpriseID: {
    type: mongoose.Schema.Types.ObjectId
}
});
const TeacherUserSchema = new Schema({
    FirstName: {type: String, required: true},
    LastName: {type: String, required: true},
    Email: {type: String, required: true},
    Password: {type: String, required: true},
    
    Avatar_ID: {type: String, required: true},
    PaymentInfo: {type: String, required: false},
    School : SchoolSchema,
    AssignmentCreated: [CreatedAssignmentSchema],
    Classes: [ClassSchema],
    Enterprise: EnterpriseSchema
});
// the USer class and User mdodel 
const TeacherUser = mongoose.model('teacheruser',TeacherUserSchema );
//const Assignment = mongoose.model('assignment',AssignmentSchema );

module.exports = TeacherUser;
//module.exports = Assignment;

//const testUser = new User({FirstName: 'Arky', LastName: 'Asmal', AccountType: 'free', Avatar_ID: 'red'});

//testuser.save();