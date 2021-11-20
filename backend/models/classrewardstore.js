const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ClassSchema = new Schema({
    Name: {type: String, required: true},
    
    ClassID: {
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


const ClassRewardStoreSchema = new Schema({
    Name: {type: String, required: true},
    Class: ClassSchema,
    
    Rewards : [{Name: String, 
                Price: Number, 
                RedeemedBy: [RedeemedBySchema], 
                NumAvailable: Number, 
                IMGURL: String}]
    
});
// the USer class and User mdodel 

const ClassRewardStore = mongoose.model('classrewardstore',ClassRewardStoreSchema );

module.exports = ClassRewardStore;