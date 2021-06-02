// QUESTION GENERATE
import { Link, useLocation, useParams } from 'react-router-dom';
import SideNav from '../components/SideNav';
import { BsThreeDotsVertical } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import axios from 'axios';

const QuestionGenerate = () => {

    const [textCollection, setTextCollection] = useState();
    let location = useLocation();
    let texts = '';

    useEffect(() => {
        console.log("Recognise Data: ", location.state);
        texts = location.state;
        texts.forEach(function (text) {
            try {
                const resPost = axios.post('http://localhost:5000/api/question-text', { text: text }, {
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
        });

        const resGet = axios.get('http://localhost:5000/api/sum-text/texts')
        .then(res => {
            console.log("HIIII Response", res);
            setTextCollection(res.data);
        })
        .catch(function (error) {
            console.log(error);
        });
        
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

    return (
        <div className="slide-web-container">
            <SideNav />
            <div className="slide-body width-100">
                <div className="container edit-row">
                    <div className="slide-header">
                        Edit Slides
                    </div>
                    <div className="slide-btn float-right">    
                        <Link className="textslide-link" to='/add-text'>                         
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
                            { textCollection && textCollection.map(data => (
                                <div className="col-3">
                                    <div className="slide-preview-item">
                                        <div className="img-wrap no-margin overflow-hide option-display txt-display" key={data.id}>
                                                <div className="option-slide-icon">
                                                    <BsThreeDotsVertical onClick={() => onsdisplayDropdown()}/>
                                                    <div className={ isDisplay === true ? "option-dropdown-inner" : "option-dropdown-close"}>
                                                        <Link to={{pathname: "/edit-text", state: data._id }} className="option-dropdown-item" >Edit</Link>
                                                        <a className="option-dropdown-item" onClick={() => deleteText(data._id)}>Delete</a>
                                                    </div>
                                                </div>
                                            <div>{ data.text }</div>
                                        </div>
                                    </div>
                                </div>
                            )) }
                        </div>
                    </div>
                    <div className="">
                        <div className="row">
                            <div className="slide-btn float-right mt-5">    
                                <Link className="textslide-link" to='/add-text'>                         
                                    <button className="slidegen-btn primary-color">
                                        Save
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>       
        </div>
    );
}

export default QuestionGenerate;