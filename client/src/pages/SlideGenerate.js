import { Link, useLocation } from 'react-router-dom';
import SideNav from '../components/SideNav';
import { BsThreeDotsVertical } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import pptxgen from "pptxgenjs";
import axios from 'axios';
import { jsPDF } from "jspdf";
import { BsFileEarmarkPlus, BsFileDiff, BsGridFill, BsLayoutTextSidebarReverse, BsPlusSquare, BsFillQuestionSquareFill } from 'react-icons/bs';


const SlideGenerate = () => {
    let location = useLocation();
    const [color, setColor] = useState('FFFFFF');
    const [textCollection, setTextCollection] = useState();
    var heading = location.state;

    useEffect(() => {
        console.log("Headting is", heading);
        axios.get('http://localhost:5000/api/sum-text/texts')
        .then(res => {
            console.log("responsesss, ", res);
            setTextCollection(res.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    }, []);
    
    // DISPLAY DROPDOWN START
    const [isDisplay, setIsDisplay] = useState(false);
    const onsdisplayDropdown = () => setIsDisplay(!isDisplay);
    // DISPLAY DROPDOWN END


    const deleteText = async(id) => {
        window.location.reload();
        const res = await axios.delete(`http://localhost:5000/api/image/text-delete/${id}`)
        .then(res => {
            console.log("Successfully Deleted Texts");
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    // GENERATE QUESTION 
    const generateQuestion = () => {
        console.log("Collection", textCollection);

        textCollection.forEach(function (text) {
            try {
                // POST REQUEST
                const resPost = axios.post('http://localhost:5000/api/question-text', { text: text }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                })
                .then(res => {
                    console.log(res.data);
                    // console.log(resPost);
                    console.log("Successfully Generated Question");
                    const doc = new jsPDF();

                    doc.setFontSize(5);
                    doc.text(5, 25, res.data);
                    doc.save("a4.pdf");
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
        });


    }

    const generateSlide = () => {

        console.log(textCollection);
        let pres = new pptxgen();

        // pres.defineSlideMaster({ title: 'GREY_MASTER', bkgd: 'FAF1F1' });
        pres.background = { fill: color };
        pres.layout = "LAYOUT_WIDE";

        pres.defineSlideMaster({
            title: "MASTER_SLIDE",
            background: { color: "FFFFFF" },
            objects: [
                { rect: { x: 0.0, y: 5.3, w: "100%", h: 0.75, fill: { color: "F1F1F1" } } },
                { text: { text: heading, options: { x: 3.0, y: 5.3, w: 5.5, h: 0.75 } } },
            ],
            slideNumber: { x: 0.3, y: "90%" },
        });
        let slidemain = pres.addSlide({ masterName: "MASTER_SLIDE" });
        slidemain.addText("How To Create PowerPoint Presentations with JavaScript", { x: 0.5, y: 0.7, fontSize: 18 });

        textCollection.forEach(function (text) {
            let slide = pres.addSlide();
            slide.background = { fill: color }; 
            // slide.background({ path: ".png" });
            slide.addImage({ path: text.imageURL, x: 9.5, y: 0, w: 4.0, h: 10.0, sizing: { type: "cover", w: 4.0, h: 10.0 }  });
            slide.addText(
                text.text,
                {
                    x: 0.3,
                    y: 3.5,
                    w: '65%',
                    fontSize:20,
                    color: '000000',
                    align: pres.AlignH.justify
                }
            );
        });
        pres.writeFile("Sample Presentation.pptx");
    }

    const handleColor = (e) => {
        console.log(e.target.value);
        setColor(e.target.value);
    }
    
    return (
        <div className="slide-web-container">
            <SideNav />
            <div className="slide-body width-100">
                <div className="container edit-row">
                    <div className="slide-header">
                        Generate Slides
                    </div>
                    <div className="slide-btn float-right-question">    
                        <button onClick={generateQuestion} className="slidegen-btn primary-color question-btn">
                            <BsFillQuestionSquareFill className="nav-icon" />
                        </button>
                    </div>
                    <div className="slide-btn float-right">    
                        <button data-toggle="modal" data-target="#myModal" className="slidegen-btn primary-color">
                            <i className="txt-icon">
                                <svg viewBox="0 0 426.66667 426.66667"><path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0"/></svg>
                            </i>
                            Generate Slides
                        </button>
                    </div>

                    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">Select Template</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div className="row">
                                    <div className="col-md-4">
                                        <label class="mt-3">
                                            <input onChange={handleColor} type="radio" value="FFFFFF" name="color" class="card-input-element d-none" />
                                            <div class="card card-body bg-light d-flex flex-row justify-content-between align-items-center white-color">
                                            </div>
                                        </label>
                                    </div>
                                    <div className="col-md-4">
                                        <label class="mt-3">
                                            <input onChange={handleColor} type="radio" value="54D7F7" name="color" class="card-input-element d-none" />
                                            <div class="card card-body bg-light d-flex flex-row justify-content-between align-items-center blue-color">
                                            </div>
                                        </label> 
                                    </div>
                                    <div className="col-md-4">
                                        <label class="mt-3">
                                            <input onChange={handleColor} type="radio" value="7FFFB9" name="color" class="card-input-element d-none" />
                                            <div class="card card-body bg-light d-flex flex-row justify-content-between align-items-center green-color">
                                            </div>
                                        </label> 
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <label class="mt-3">
                                            <input onChange={handleColor} type="radio" value="FFF163" name="color" class="card-input-element d-none" />
                                            <div class="card card-body bg-light d-flex flex-row justify-content-between align-items-center yellow-color">
                                            </div>
                                        </label> 
                                    </div>
                                    <div className="col-md-4">
                                        <label class="mt-3">
                                            <input onChange={handleColor} type="radio" value="D4A8F2" name="color" class="card-input-element d-none" />
                                            <div class="card card-body bg-light d-flex flex-row justify-content-between align-items-center purple-color">
                                            </div>
                                        </label> 
                                    </div>
                                    <div className="col-md-4">
                                        <label class="mt-3">
                                            <input onChange={handleColor} type="radio" value="D1D8D1" name="color" class="card-input-element d-none" />
                                            <div class="card card-body bg-light d-flex flex-row justify-content-between align-items-center grey-color">
                                            </div>
                                        </label> 
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" onClick={generateSlide} class="btn btn-primary">Generate</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                <div className="slide-inner-container">
                    <div className="text-slide-container">
                        <div className="row">
                            { textCollection && textCollection.map(data => (
                                <div className="col-3">
                                    <div className="slide-preview-item">
                                        <div className="img-wrap no-margin overflow-hide option-display txt-display" key={data.id}>
                                            <div>{ data.text }</div>
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

export default SlideGenerate;