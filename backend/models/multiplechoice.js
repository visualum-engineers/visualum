const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const MultipleChoiceSchema = new Schema({
    Question: {type: String, required: true},
    imgURL: String, 
    
    Answers: [{text: String, isAnswer: Boolean}]
    
});
// the USer class and User mdodel 

const MultipleChoice = mongoose.model('multiplechoice',MultipleChoiceSchema );

module.exports = MultipleChoice;