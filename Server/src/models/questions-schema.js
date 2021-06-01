const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    ans:{type:String,required:true}
})

const questionSchema = new mongoose.Schema({
    courseType:{
        type:String,
        required:true,
        trim:true
    },
    question : {
        type:String,
        required:true
    },

    correctAnswer: {
        type:String,
        required:true
    },
    answers: [answerSchema],




})

const Questions = mongoose.model('Questions',questionSchema)

module.exports = Questions