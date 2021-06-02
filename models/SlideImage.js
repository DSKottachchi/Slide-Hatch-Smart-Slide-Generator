const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// CREATE SCHEMA
const UploadImageSchema = new Schema({
    slide_image: {
        type: String,
        required: true
    },    
    sumID: {
        type: String,
        required: true
    }
});

module.exports = SlideImage = mongoose.model('slide_image', SlideImageSchema);