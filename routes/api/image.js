const express  = require('express');
const router = express.Router();
const Image = require('../../models/Images');

// @route POST api/auth
// @desc Post recognized text
// @access Public
router.post('/', (req, res) => {
    const { image } = req.body;
    const imagedata = new Image({
        image: image,
    });
    
    imagedata.save().then(data => res.json(data));
});

// @route GET api/image/texts
// @desc Get Texts
// @access Public
router.get('/texts', (req, res) => {
    Image.find((error, data) => {
        if(error) {
            console.log("Err ", error);
        } else {
            res.json(data);
        }
    });
});

// @router GET api/image/text-item/:id
// @desc Get specific text 
// @access Public
router.get('/text-item/:id', (req, res) => {    
    Image.findById(req.params.id, function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.json(result);
        }
      });
});

// @router DELETE api/text-delete/:id
// @desc DELETE Texts
// @access Public
router.delete('/text-delete/:id', (req, res) => {    
    console.log("delete api: ", req);
    Image.findByIdAndDelete(req.params.id, function (err) {
        if(err) console.log(err);
        console.log("Successful deletion");
    });      
});

// @router POST api/image/update-tex
// @desc UPDATE Text
// @access Public
router.post('/text-edit/:id', (req, res) => {
    const textID = req.params.id;
    const text = req.body.image;
  
    Image.findByIdAndUpdate(textID, { $set: {image : text}}, {upsert: true, new: true}, function (err, docs) {
      if (err){
          console.log(err)
      }
      else{
          console.log("Updated User : ", docs);
      }
    });
});

module.exports = router;
