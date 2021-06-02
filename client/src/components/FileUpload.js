// FILE UPLOAD COMPONENT
import React, {useState} from 'react';
import axios from 'axios';
import Tesseract from 'tesseract.js';

// CREATING TESSERACT JS WORKER
const { createWorker } = Tesseract;

const FileUpload = () => {

    const worker = createWorker({
        logger: m => console.log(m),
    });

    // INITIALISING STATES
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState('Choose File');    
    const [uploadedFile, setUploadedFile] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // ARRAY OF ALLOWED TYPES
    const types = ['image/png', 'image/jpeg']

    // CHANGE HANDLER, WHEN FILE IS BEING UPLOADED
    const fileSelectedHandler = (e) => {
        let selected = e.target.files[0];
        // CHECK WHETHER FILE EXISTS && CHECK WHETHER ARRAY CONTAINS THE TYPE OF THE FILE
        if(selected && types.includes(selected.type)) {
            setFile(selected);
            setFilename(selected.name);
            setError('');
        } else {
            setFile(null);
            setError('Please select an image file (png or jpeg)');
        }
    }

    const getBase64 = (file) => {
        return new Promise((resolve,reject) => {
           const reader = new FileReader();
           reader.onload = () => resolve(reader.result);
           reader.onerror = error => reject(error);
           reader.readAsDataURL(file);
        });
    }

    // CONVERTION FROM IMAGE TO TEXT (OCR CONVERSTION)
    const slideConverison = async(file) => {
        setLoading(true)
        // TESSERACT JS IMPLMENTATION
        await worker.load();
        await worker.loadLanguage('eng+sin');
        await worker.initialize('eng+sin');
        worker._currentJob = null;
        const { data: { text } } = await worker.recognize(file);
        let newText = JSON.stringify(text);
        let replace = text.replace(/[\n\r]+/g, ' ');

        // UPLOADING THE RECOGNIZED TEXT
        try {
            const res = await axios.post('http://localhost:5000/api/image', { image: replace }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
        } catch(err) {
            if(err === 500) {
                console.log("There was a problem with the server");
            } else {
                console.log("Error: ", err.response);
            }
        }
        
        await worker.terminate();
        setLoading(false);
    };

    // ON IMAGE UPLOAD
    const onUpload = async e => {
        console.log('sdsd');
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            // POST FILE URL LOCATION TO BACKEND
            // NOTE: IMAGE FILE STORED LOCALLY
            const res = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }
            });
            console.log("as", res);
            const {fileName, filePath} = res.data;

            slideConverison(filePath);
            setUploadedFile({ fileName, filePath });
        } catch(err) {
            if(err === 500) {
                console.log("There was a problem with the server");
            } else {
                console.log("Error: ", err.response);
            }
        }
    }

    // LOADER START
    if(loading) return (
        <div class="form-container text-center">
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <div className="mt-3">
                Recognizing Texts
            </div>
        </div> 
    );
    // LOADER END

    return (
        <div className="drop-zone">
            {/* FILE UPLOAD FORM START */}
            <form method="post" encType="multipart/form-data" onSubmit={onUpload}>
                <input crossOrigin="anonymous" type="file" name="files" id="file" onChange={fileSelectedHandler}/>
                <label className="upload-container" htmlFor="file">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" id="Capa_1" enable-background="new 0 0 512 512" viewBox="0 0 512 512" width="50"><g><g><path d="m159.633 98.476v-52.072h123.163c6.259 0 11.884 3.821 14.191 9.64l16.819 42.431-79.75 28.328z" fill="#8ac9fe"/><path d="m313.808 98.48h-22.802l-16.819-42.438c-2.303-5.819-7.926-9.633-14.187-9.633h22.792c6.261 0 11.884 3.814 14.198 9.633z" fill="#60b7ff"/>
                            <path d="m424.262 98.476h-222.667c-6.259 0-11.884-3.821-14.191-9.64l-12.998-32.792c-2.306-5.819-7.931-9.64-14.191-9.64h-107.898c-8.43 0-15.265 6.834-15.265 15.265v21.542c0 8.43-6.834 15.265-15.265 15.265h-1.407c-11.256 0-20.38 9.124-20.38 20.379v312.611c0 18.849 15.28 34.129 34.129 34.129h410.512v-346.74c0-11.255-9.124-20.379-20.379-20.379z" fill="#fef0ae"/><path d="m444.639 145.278v320.313h-410.505c-3.722 0-7.31-.596-10.661-1.696 13.632-4.472 23.481-17.302 23.481-32.435v-265.806c0-11.257 9.119-20.376 20.376-20.376z" fill="#fee97d"/><path d="m201.595 98.48h-20.561c-6.261 0-11.884-3.824-14.187-9.643l-13.005-32.795c-2.303-5.819-7.926-9.633-14.187-9.633h20.561c6.261 0 11.884 3.814 14.187 9.633l13.005 32.795c2.303 5.819 7.926 9.643 14.187 9.643z" fill="#fee97d"/><path d="m88.644 145.274h379.732c11.255 0 20.38 9.124 20.38 20.38v279.562c0 11.255-9.124 20.38-20.38 20.38h-400.112-34.132c18.851 0 34.132-15.281 34.132-34.132v-265.81c0-11.255 9.125-20.38 20.38-20.38z" fill="#fee45a"/>
                            <path d="m488.753 165.654v279.561c0 11.257-9.119 20.376-20.376 20.376h-19.883c11.257 0 20.386-9.119 20.386-20.376v-279.561c0-11.257-9.129-20.376-20.386-20.376h19.883c11.257 0 20.376 9.119 20.376 20.376z" fill="#fed402"/><g><path d="m182.928 378.346h-66.674c-4.258 0-7.71-3.452-7.71-7.71s3.452-7.71 7.71-7.71h66.674c4.258 0 7.71 3.452 7.71 7.71s-3.452 7.71-7.71 7.71z" fill="#fac600"/></g><g><path d="m222.32 410.401h-106.066c-4.258 0-7.71-3.452-7.71-7.71s3.452-7.71 7.71-7.71h106.066c4.258 0 7.71 3.452 7.71 7.71.001 4.258-3.451 7.71-7.71 7.71z" fill="#fac600"/></g></g><circle cx="416.741" cy="145.274" fill="#97da7b" r="95.259"/><path d="m511.998 145.278c0 52.606-42.644 95.26-95.26 95.26-20.859 0-40.156-6.703-55.844-18.083 11.504 4.934 24.19 7.669 37.504 7.669 52.616 0 95.26-42.654 95.26-95.26 0-31.746-15.534-59.864-39.416-77.176 33.966 14.556 57.756 48.287 57.756 87.59z" fill="#80d261"/>
                            <path d="m464.544 130.937-36.282-40.78c-2.926-3.289-7.119-5.17-11.521-5.17s-8.595 1.881-11.521 5.17l-36.282 40.78c-5.661 6.363-5.092 16.111 1.271 21.772 6.364 5.662 16.111 5.092 21.772-1.271l9.34-10.498v49.2c0 8.517 6.904 15.421 15.421 15.421s15.421-6.904 15.421-15.421v-49.2l9.34 10.498c3.047 3.425 7.277 5.17 11.527 5.17 3.646 0 7.306-1.286 10.245-3.9 6.361-5.66 6.93-15.407 1.269-21.771z" fill="#eaf6ff"/><g fill="#d8ecfe">
                            <path d="m425.805 151.436c1.789 2.005 3.989 3.444 6.353 4.277v34.43c0 8.512-6.898 15.421-15.421 15.421-2.858 0-5.541-.781-7.844-2.138 4.534-2.694 7.577-7.628 7.577-13.283v-35.688c0-4.726 5.841-6.947 8.981-3.416z"/><path d="m463.278 152.711c-2.94 2.611-6.6 3.896-10.25 3.896-2.724 0-5.438-.72-7.834-2.138.833-.504 1.635-1.09 2.385-1.758 6.364-5.665 6.929-15.411 1.275-21.774l-36.28-40.783c-1.069-1.203-2.313-2.221-3.68-3.012 2.354-1.398 5.058-2.149 7.844-2.149 4.41 0 8.595 1.881 11.525 5.161l36.28 40.783c5.664 6.363 5.088 16.109-1.265 21.774z"/></g></g>
                        </svg>
                    </span> 
                    <div className="uploadTxt">Click To Upload A File</div>
                </label>
                <input type='submit' className="slidegen-btn primary-color float-right mt-5" value='Upload'/>
            </form>
            {/* FILE UPLOAD FORM END */}
            <div className="output">
                { error && <div className="error">{error}</div>}
            </div>
        </div>
    );
    
}

export default FileUpload;