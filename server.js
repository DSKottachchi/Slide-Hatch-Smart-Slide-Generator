const express  = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
var cors = require('cors');
const config = require('config');
const axios = require('axios')
const UploadImage = require('./models/UploadImage');


const app = express();
app.use(cors());
app.options('*', cors());
app.use(fileUpload());
app.use(express.json());
const db = config.get('mongoURI');
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/image', require('./routes/api/image'));
app.use('/api/sum-text', require('./routes/api/sumText'));
app.use('/api/question-text', require('./routes/api/questionText'));

// DB Config
// Connect to MongoDB
mongoose
    .connect(db,   { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));``

const { createWorker } = require("tesseract.js");
const worker = createWorker({
  logger: m => console.log(m),
});

// Upload Endpoint
app.post('/upload', (req, res) => {
    if(req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded'});
    }

    const file = req.files.file;
    //Take file object and move it
    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
        if(err) {
            console.error(err);
            return res.status(500).send(err);
        }

        res.json({ fileName: file.name, filePath: `/uploads/${file.name}`})
    });

    const imagedata = new UploadImage({
        url: `/uploads/${file.name}`
    });
    
    imagedata.save().then(data => res.json(data));

});

// Delete Endpoint, Pass in the ID
app.delete('/delete', (req, res) => {
    const { filename } = req;
    console.log("Filename: ", filename);
    fs.unlink(`${__dirname}/client/public/uploads/${filename}`, function (err) {
        // if (err) throw err;
        console.log('File deleted!');
    });
});

// Upload Slide Endpoint
app.post('/upload-slide-image', (req, res) => {
    if(req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded'});
    }

    const file = req.files.file;
    //Take file object and move it
    file.mv(`${__dirname}/client/public/slide-image/${file.name}`, err => {
        if(err) {
            console.error(err);
            return res.status(500).send(err);
        }

        res.json({ fileName: file.name, filePath: `/slide-image/${file.name}`})
    });

});

// Define port to use when connecting to the server
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));