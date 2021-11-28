const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var LicenseSchema = new Schema({
    LicenseType: Sting,
    LicenseID: {
      type: mongoose.Schema.Types.ObjectId
  }
  });


const EnterpriseSchema = new Schema({
    Name: {type: String, required: true},
    Address : {Street: String, Apartment: String, State: String, Country: String, ZIP: Number},
    ContactInfo : {PhoneNumber: String, Email: String},
    Licenses: [LicenseSchema]
    
});
// the USer class and User mdodel 

const Enterprise = mongoose.model('enterprise',EnterpriseSchema );

module.exports = Enterprise;