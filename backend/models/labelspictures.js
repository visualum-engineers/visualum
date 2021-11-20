const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const LabelsPicturesSchema = new Schema({
    imgURL: {type: String, required: true},
    imgDimensions: {width: Number,height:Number},
    Labels :[ {x: Number, Y: Number,
     width: Number, height: Number, 
     text: String}]
    
});
// the USer class and User mdodel 

const LabelPicture = mongoose.model('labelpicture',LabelsPicturesSchema );

module.exports = LabelPicture;