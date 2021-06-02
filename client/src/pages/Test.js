import { Link } from 'react-router-dom';
import SideNav from '../components/SideNav';
import { BsThreeDotsVertical } from "react-icons/bs";
import Tesseract from 'tesseract.js';
import React, { useState, useEffect } from "react";

const { createWorker } = Tesseract;


const TextSlide = () => {
    
    const worker = createWorker({
        logger: m => console.log(m),
    });


    const [ocr, setOcr] = useState('Recognizing...');
        useEffect(() => {
        slideConverison();
    });

    var listOfImages =[];
    const [loading, setLoading] = useState(false);

    // UPLOAD IMAGE START
    function importAll(r) {
        return r.keys().map(r);
    }

    componentWillMount();
    function componentWillMount() {
        listOfImages = importAll(require.context('../../../client/public/uploads/', false, /\.(png|jpe?g|svg)$/));
    }
    // UPLOAD IMAGE END

    // function slideConverison() {
    //     var i;
    //     for (i = 0; i < listOfImages.length; i++) {
    //         Tesseract
    //             .recognize(listOfImages[i].default)
    //             .then((result) => {
    //                 console.log(result.text);
    //                 setOcr(result.text);

    //             })
    //             .catch((err) => {
    //                 throw err;
    //             });
    //     }
    // }

    const slideConverison = async() => {
        var i;
        for (i = 0; i < listOfImages.length; i++) {
            await worker.load();
            await worker.loadLanguage('eng');
            await worker.initialize('eng');
            worker._currentJob = null;
            const { data: { text } } = await worker.recognize(listOfImages[i].default);
            // setOcr(text);
        }
        await worker.terminate();
    };


    // DISPLAY DROPDOWN START
    const [isDisplay, setIsDisplay] = React.useState(false)
    const onsdisplayDropdown = () => setIsDisplay(!isDisplay)
    // DISPLAY DROPDOWN END


    return (
        <div className="slide-web-container">
            <SideNav />
            <div className="slide-body width-100">
                <div className="container edit-row">
                    <div className="slide-header">
                        Edit Slides
                    </div>
                    <div className="slide-btn float-right">    
                        <Link to='/add-text'>                         
                            <button className="slidegen-btn primary-color">
                                <i className="txt-icon">
                                    <svg viewBox="0 0 426.66667 426.66667"><path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0"/></svg>
                                </i>
                                Add New Slides
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="slide-inner-container">
                    <div className="text-slide-container">
                        <div className="row">
                            { listOfImages && listOfImages.map(image => (
                                <div className="col-3">
                                    <div className="slide-preview-item">
                                        <div className="img-wrap no-margin overflow-hide option-display txt-display" key={image.id}>
                                                <div className="option-slide-icon">
                                                    <BsThreeDotsVertical onClick={onsdisplayDropdown}/>
                                                    <div className={ isDisplay === true ? "option-dropdown-inner" : "option-dropdown-close"}>
                                                        <a href="./add-text">Edit</a>
                                                        <a href="#">Delete</a>
                                                    </div>
                                                </div>
                                            <div>{ ocr }</div>
                                        </div>
                                    </div>
                                </div>
                            )) }
                        </div>
                    </div>
                </div>
            </div>       
        </div>
    );
}

export default TextSlide;