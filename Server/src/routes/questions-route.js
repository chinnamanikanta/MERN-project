const express = require('express');

const Questions = require('../models/questions-schema');


const router = new express.Router();

router.post('/questions',async(req,res) => {
    console.log(req.body.answers)

    const questions = new Questions({
        courseType:req.body.courseType,
        question:req.body.question,
        correctAnswer:req.body.correctAnswer,
        answers:req.body.answers
    
    })

    try {
        await questions.save();
        res.status(200).send({questions})
    }
    catch(error) {
        res.status(400).send()
    }

})

router.get('/questions/:course',async(req,res) => {
    

    

    try {
        const resCourse = await Questions.find({courseType:req.params.course}).exec();
        res.send(resCourse)
        
        
    }
    catch(error) {
        res.status(400).send("This is an error")
    }
    

    

})










module.exports = router