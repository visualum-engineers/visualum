const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const ActivitySchema = new Schema({
    
    Name: {
		Type: string,
		Required: true
    },

    Creator_ID : ObjectId,
    
    ActivityData : [{
        Activity_ID: ObjectId, 
        grade: number ,
        submissionData: {
            type: Map,
            of: String
          }
    
    
    
    }],
    
    
});
// the USer class and User mdodel 

const Activity = mongoose.model('activity',ActivitySchema );

module.exports = Activity;