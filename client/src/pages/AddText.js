import { Link, useLocation, useParams } from 'react-router-dom';
import SideNav from '../components/SideNav';
import SlidePreview from '../components/SlidePreview'
import { Editor } from '@tinymce/tinymce-react';
import React, { useState, useEffect } from "react";
import axios from 'axios';


const EditText = () => {

    const [addText, setTextCollection] = useState();

    // UPLOADING NEW TEXT 
    const handleSubmit = async(file) => {
        try {
            const res = await axios.post('http://localhost:5000/api/image', { image: addText }, {
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
    };

    // SET THE TEXT COLLECTION
    const handleChange = (event) => {
        setTextCollection(event.target.value);
    }

    return (
        <div className="slide-web-container">
            <SideNav />
            <div className="slide-body width-100">
                <div className="container slide-inner-container">
                    <div className="slide-dragdrop-container">
                        <div className="page-heading">Add Text</div>
                        <div className="">
                            <div className="form-group">
                                {/* ADD TEXT FORM START */}
                                <form onSubmit={handleSubmit}>
                                    <textarea onChange={handleChange} className="wysiwyg-inner" type="text" cols="100" rows="15"></textarea> 
                                    <input type="submit" value="Submit" className="slidegen-btn primary-color float-right content-start" />
                                </form>
                                {/* ADD TEXT FORM END */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>           
        </div>
    );
}

export default EditText;