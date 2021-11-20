const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const RewardStoreSchema = new Schema({
    Name: {type: String, required: true},
    School_ID: ObjectId,
    Class_ID : ObjectId,
    
    Rewards : {Name: String, Price: Number, RedeemedBy: String, NumAvailable: Number, IMGURL: String}
    
});
// the USer class and User mdodel 

const RewardStore = mongoose.model('rewardstore',RewardStoreSchema );

module.exports = RewardStore;