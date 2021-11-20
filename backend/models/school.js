const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const SchoolSchema = new Schema({
    Name: {type: String, required: true},
    Address : {Street: String, Apartment: String, State: String, Country: String, ZIP: Number},
    
   
    
});
// the USer class and User mdodel 

const School = mongoose.model('school',SchoolSchema );

module.exports = School;