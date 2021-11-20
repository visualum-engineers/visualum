const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const ShortAnswerSchema = new Schema({
    Question: {type: String, required: true},
    imgURL: String, 
    
});
// the USer class and User mdodel 

const ShortAnswer = mongoose.model('shortanswer',ShortAnswerSchema );

module.exports = ShortAnswer;