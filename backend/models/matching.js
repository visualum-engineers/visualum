const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const MatchingSchema = new Schema({
    Pairs: {
        type: Map,
        of: String
      }
   
    
});
// the USer class and User mdodel 

const Matching = mongoose.model('matching',MatchingSchema );

module.exports = Matching;