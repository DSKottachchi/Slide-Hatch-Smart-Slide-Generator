const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// CREATE SCHEMA
const UploadImageSchema = new Schema({  
    url: {
        type: String,
        required: true
    },   
    upload_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = UploadImage = mongoose.model('upload_image', UploadImageSchema);