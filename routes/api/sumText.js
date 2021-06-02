const express  = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const request = require('request');
var spawn = require('child_process').spawn;
const SummarizeText = require('../../models/SummarizeText');

router.post('/', (req, res) => {
    const { text } = req.body;
    const process = spawn('python', ['sum_script.py', text.image]);

    var test;
    process.stdout.on(
      'data',
      (data) => { 
        console.log(data.toString('utf8')) 
        test = data 

        const sumdata = new SummarizeText({
          text: test,
          imageID: text._id
        });

        sumdata.save().then(data => res.json(data));
        res.send(test)
      }
    );

    process.stderr.on('data', (data) => {
      console.log('err results: %j', data.toString('utf8'))   
    });

});


router.post('/media-url/:id', (req, res) => {
  const imageID = req.params.id;
  const imageURL = req.body.imageURL;

  SummarizeText.findByIdAndUpdate(imageID, { $set: {imageURL: imageURL}}, {upsert: true, new: true}, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Updated User : ", docs);
    }
  });

});


// @route GET api/image/texts
// @desc Get Texts
// @access Private
router.get('/texts', (req, res) => {
  SummarizeText.find((error, data) => {
      if(error) {
          console.log("Err ", error);
      } else {
          res.json(data);
      }
  });

});

module.exports = router;
