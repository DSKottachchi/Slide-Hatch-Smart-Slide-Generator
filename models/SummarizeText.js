const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// CREATE SCHEMA
const SumTextSchema = new Schema({
    text: {
        type: String
    },  
    imageID: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        default: ''
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = SumText = mongoose.model('sumtext', SumTextSchema);