const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// CREATE SCHEMA
const QuestionSchema = new Schema({
    question: {
        type: String
    },  
    sumID: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = QuestionText = mongoose.model('questtext', QuestionSchema);