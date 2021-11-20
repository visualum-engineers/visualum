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
  var SchoolSchema = new Schema({
    Name: {type: String, required: true},
    Address : {Street: String, Apartment: String, 
        State: String, Country: String, 
        ZIP: Number},
        SchoolID: {
            type: mongoose.Schema.Types.ObjectId,
        }
});

const StudentUserSchema = new Schema({
    FirstName: {type: String, required: true},
    LastName: {type: String, required: true},
    Email: {type: String, required: true},
    Password: {type: String, required: true},
    AccountType:{type: String, required: true},
    Avatar_ID: {type: String, required: true},
    PaymentInfo: {type: String, required: false},
    School : SchoolSchema,
    CompletedAssignments : [AssignmentSchema]
    
});
// the USer class and User mdodel 
const StudentUser = mongoose.model('studentuser',StudentUserSchema );
//const Assignment = mongoose.model('assignment',AssignmentSchema );

module.exports = StudentUser;
//module.exports = Assignment;

//const testUser = new User({FirstName: 'Arky', LastName: 'Asmal', AccountType: 'free', Avatar_ID: 'red'});

//testuser.save();


  
 