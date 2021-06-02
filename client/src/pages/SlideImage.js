import { Link, useLocation } from 'react-router-dom';
import SideNav from '../components/SideNav';
import SlidePreview from '../components/SlidePreview';
import { useState } from 'react';
import axios from 'axios';
import FileUpload from '../components/FileUpload';

const SlideUpload = () => {

    const [imageURL, setImageURL] = useState();
    let location = useLocation();
    var sumID = location.state;

    const masterSubmit = () => {
        try {
            const resPost = axios.post(`http://localhost:5000/api/sum-text/media-url/${location.state}`, { imageURL: imageURL }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(res => {
                console.log(res.data);
                // console.log(resPost);
                console.log("Successfully Edited Texts");
                
            })
            .catch(function (error) {
                console.log(error);
            });

        } catch(err) {
            if(err === 500) {
                console.log("There was a problem with the server");
            } else {
                console.log("Error: ", err.response);
            }
        }
    }

    const handleChange = (event) => {
        setImageURL(event.target.value);
    }

    return (
        <div className="slide-web-container">
            <SideNav />
            <div className="slide-body width-100">
                <div className="container edit-row">
                    <div className="slide-header">
                        Add Media URL
                    </div>
                </div>
                <div className="slide-inner-container">
                    <div className="text-slide-container">
                        <div className="form-container">
                            <form onSubmit={masterSubmit}>
                                <label>Add Image URL</label>
                                <input onChange={handleChange} type="text" className="form-control" id="exampleInputEmail1" />
                                <label className="mt-4">Add Video URL</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" />
                                <div className="slide-btn float-right mt-5">    
                                    {/* <Link to={{pathname: "/slide-generate", state: heading}} className="textslide-link">                          */}
                                        <button className="slidegen-btn primary-color">
                                            Save
                                        </button>
                                    {/* </Link> */}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>       
        </div>
    );
}

export default SlideUpload;