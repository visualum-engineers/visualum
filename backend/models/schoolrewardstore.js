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
var RedeemedBySchema = new Schema({
    FirstName: {type: String, required: true},
    LastName: {type: String, required: true},
    StudentID: {
            type: mongoose.Schema.Types.ObjectId,
        }
});

const SchoolRewardStoreSchema = new Schema({
    Name: {type: String, required: true},
    School: SchoolSchema,
    
    Rewards : [{Name: String, Price: Number, RedeemedBy:  [RedeemedBySchema], NumAvailable: Number, IMGURL: String}]
    
});
// the USer class and User mdodel 

const SchoolRewardStore = mongoose.model('schoolrewardstore',SchoolRewardStoreSchema );

module.exports = SchoolRewardStore;