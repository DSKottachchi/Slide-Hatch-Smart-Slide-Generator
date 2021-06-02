import { Link, useLocation, useParams } from 'react-router-dom';
import SideNav from '../components/SideNav';
import { BsThreeDotsVertical } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import { ChromePicker } from 'react-color';
import pptxgen from "pptxgenjs";
import axios from 'axios';

const MasterSlide = () => {

    const [textCollection, setTextCollection] = useState();
    const [heading, setHeading] = useState();
    const [backgroundColor, setBackground] = useState();
    let location = useLocation();
    let texts = '';    

    // DISPLAY DROPDOWN START
    const [isDisplay, setIsDisplay] = useState(false);
    const onsdisplayDropdown = () => setIsDisplay(!isDisplay);
    // DISPLAY DROPDOWN END

    const handleColorChange = (color) => { 
        setBackground(color);
    }
    
    // ADDING A MAIN SLIDE 
    const masterSubmit = () => {
        let pptx = new pptxgen();
        pptx.layout = "LAYOUT_WIDE";
        pptx.background = { fill: "36CF36" };
        pptx.defineSlideMaster({
            title: "MASTER_SLIDE",
            background: { fill: "36CF36" },
            objects: [
                { rect: { x: 0.0, y: 5.3, w: "100%", h: 0.75, fill: { color: "F1F1F1" } } },
                { text: { text: heading, options: { x: 3.0, y: 5.3, w: 5.5, h: 0.75 } } },
            ],
            slideNumber: { x: 0.3, y: "90%" },
        });
        
       
        pptx.writeFile();
    }

    const handleChange = (event) => {
        setHeading(event.target.value);
    }

    return (
        <div className="slide-web-container">
            <SideNav />
            <div className="slide-body width-100">
                <div className="container edit-row">
                    <div className="slide-header">
                        Add Master Slide
                    </div>
                </div>
                <div className="slide-inner-container">
                    <div className="text-slide-container">
                        <div className="form-container">
                            {/* MASTER SLIDE CONTAINER START */}
                            <form onSubmit={masterSubmit}>
                                <label>Title</label>
                                <input onChange={handleChange} type="text" className="form-control" id="exampleInputEmail1" />
                                <label className="mt-4">Set Template Color</label>
                                <ChromePicker className="mt-3" color={ backgroundColor } onChangeComplete={ handleColorChange } />
                                <div className="slide-btn float-right mt-5">    
                                    <Link to={{pathname: "/slide-generate", state: heading}} className="textslide-link">                         
                                        <button className="slidegen-btn primary-color">
                                            Save
                                        </button>
                                    </Link>
                                </div>
                            </form>
                            {/* MASTER SLIDE CONTAINER END */}
                        </div>
                    </div>
                </div>
            </div>       
        </div>
    );
}

export default MasterSlide;