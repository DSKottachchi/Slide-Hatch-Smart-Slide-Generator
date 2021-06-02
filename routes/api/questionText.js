const express  = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const request = require('request');
var spawn = require('child_process').spawn;
const QuestionText = require('../../models/QuestionText');

router.post('/', (req, res) => {
    const { text } = req.body;
    console.log("Passed Data: ", text);
    const process = spawn('python', ['question_script.py', text.text]);

    var test;
    process.stdout.on(
      'data',
      (data) => { 
        console.log(data.toString('utf8')) 
        test = data 
        console.log("data: ", data);
        const questiondata = new QuestionText({
          question: test,
          sumID: text._id
        });

        questiondata.save().then(data => res.json(data));
        res.send(test)
      }
    );

    process.stderr.on('data', (data) => {
      console.log('err results: %j', data.toString('utf8'))   
    });
   
});

router.get('/text-item/:id', (req, res) => {    
    Image.findById(req.params.id, function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.json(result);
        }
      });
});

module.exports = router;
