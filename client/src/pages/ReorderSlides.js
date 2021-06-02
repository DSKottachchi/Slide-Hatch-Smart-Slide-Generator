// ADD MEDIA PAGE
import { Link, useLocation, useParams } from 'react-router-dom';
import SideNav from '../components/SideNav';
import { BsThreeDotsVertical } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import axios from 'axios';

const ReorderSlides = () => {

    const [textCollection, setTextCollection] = useState();
    const [loading, setLoading] = useState(false);

    let location = useLocation();
    let texts = '';

    useEffect(() => {
        texts = location.state;
        
        sendGetRequest();
        // const resGet = axios.get('http://localhost:5000/api/sum-text/texts')
        // .then(res => {
        //     console.log("HIIII Response", res);
        //     setTextCollection(res.data);
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });
        
    }, []);
    
    const sendGetRequest = async () => {
        setLoading(true)
        try {
            const resGet = await axios.get('http://localhost:5000/api/sum-text/texts')
            .then(res => {
                setTextCollection(res.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
        setLoading(false);
    };

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

    // LOADER START
    if(loading) return (
        <div class="text-center page-spinner">
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <div className="mt-3">
                Loading Texts
            </div>
        </div> 
    );
    // LOADER END

    return (
        <div className="slide-web-container">
            <SideNav />
            <div className="slide-body width-100">
                <div className="container edit-row">
                    <div className="slide-header">
                        Add Media
                    </div>
                </div>
                <div className="slide-inner-container">
                    <div className="text-slide-container">
                        <div className="row">
                            { textCollection && textCollection.map(data => (
                                <div className="col-3">
                                    <Link to={{pathname: "/slide-image", state: data._id }} className="upload-link">
                                        <div className="slide-preview-item upload-link-inner">
                                            <div className="img-wrap no-margin overflow-hide option-display txt-display" key={data.id}>
                                                <div>{ data.text }</div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )) }
                        </div>
                    </div>
                    <div className="">
                        <div className="row">
                            <div className="slide-btn float-right mt-5">    
                                <Link className="textslide-link" to='/master-slide'>                         
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

export default ReorderSlides;