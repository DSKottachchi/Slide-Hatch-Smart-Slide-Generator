const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// CREATE SCHEMA
const ImageSchema = new Schema({
    image: {
        type: String,
        required: true
    }, 
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = Image = mongoose.model('image', ImageSchema);