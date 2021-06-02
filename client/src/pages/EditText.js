// EDIT TEXT
import { Link, useLocation, useParams } from 'react-router-dom';
import SideNav from '../components/SideNav';
import SlidePreview from '../components/SlidePreview'
import 'draft-js/dist/Draft.css';
import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import FileUpload from '../components/FileUpload';

const EditText = () => {

    let location = useLocation();
    const [editText, setEditText] = useState();
    let id = '';

    // REMOVING NEW LINE CHARACTERS
    const splitText = (text) => {
        let lineText = text.split('\n').map(str => <p>{str}</p>);
        return lineText;
    }

    useEffect(() => {
        id = location.state;
        // GET THE EDIT TEXT ITEM
        const res = axios.get(`http://localhost:5000/api/image/text-item/${location.state}`)
        .then(res => {
            let text = res.data.image;
            let txt = splitText(text);
            setEditText(text);
            console.log("Successfully retrieved");
        })
        .catch(function (error) {
            console.log(error);
        })
    }, []);


    // EDIT TEXT FUNCTION
    const editTextSubmit = async(event) => {
        event.preventDefault();
        const res = await axios.post(`http://localhost:5000/api/image/text-edit/${location.state}`, { image: editText })
        .then(res => {
            console.log("Successfully Edited Texts");
        })
        .catch(function (error) {
            console.log(error);
        })
        window.location.reload();
    }

    const handleSubmit = (event) => {
        alert('A name was submitted: ' + editText);
    }

    const handleChange = (event) => {
        setEditText(event.target.value);
    }

    const editorRef = useRef(null);
    const log = () => {      
      if (editorRef.current) {
        console.log(editorRef.current.getContent());
      }
    };

    return (
        <div className="slide-web-container">
            <SideNav />
            <div className="slide-body width-100">
                <div className="container slide-inner-container">
                    <div className="container edit-row">
                        <div className="slide-header">
                            Edit Slides
                        </div>
                    </div>
                    <div className="slide-dragdrop-container">
                        <div className="">
                            {/* EDIT TEXT FORM START */}
                            <div className="form-group">
                                <form onSubmit={editTextSubmit}>
                                    <textarea onChange={handleChange} className="wysiwyg-inner" defaultValue={editText} type="text" cols="100" rows="15"></textarea> 
                                    <input type="submit" value="Submit" className="slidegen-btn primary-color float-right content-start" />
                                </form>
                            </div>
                            {/* EDIT TEXT FORM END */}
                        </div>
                    </div>
                </div>
            </div>           
        </div>
    );
}

export default EditText;