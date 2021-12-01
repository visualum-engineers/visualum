const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


var EnterpriseSchema = new Schema({
    Name: Sting,
    EnterpriseID: {
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

const AdminUserSchema = new Schema({
    FirstName: {type: String, required: true},
    LastName: {type: String, required: true},
    Email: {type: String, required: true},
    Password: {type: String, required: true},
   
    Avatar_ID: {type: String, required: true},
    PaymentInfo: {type: String, required: false},
    School : SchoolSchema,
   
    Enterprise: EnterpriseSchema
});
// the AdminUser model
const AdminUser = mongoose.model('adminuser',AdminUserSchema );
//const Assignment = mongoose.model('assignment',AssignmentSchema );

module.exports = AdminUser;
