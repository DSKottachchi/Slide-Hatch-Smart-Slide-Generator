// IMAGE UPLOAD PAGE
import { Link } from 'react-router-dom';
import SideNav from '../components/SideNav';
import SlidePreview from '../components/SlidePreview';
import { useState } from 'react';
import FileUpload from '../components/FileUpload';

const ImageUpload = () => {
    return (
        <div className="slide-web-container">
            <SideNav />
            <div className="slide-body width-100">
                <div className="row slide-body margin-none">
                    <div className="col-md-9">
                        <div className="slide-dragdrop-container">
                            <div className="form-container mt-5">
                                <FileUpload />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 margin-none padding-none">
                        <SlidePreview />
                    </div>
                </div>
            </div> 
        </div>
    );
}

export default ImageUpload;