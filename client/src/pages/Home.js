// HOME PAGE 
import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import illustration from '../assets/project.png';
import upload from '../assets/Message.png';
import reorder from '../assets/Empty-Files.png';
import generate from '../assets/Success.png';

// HOME PAGE OF SLIDE GENERATOR 
// INITIAL PAGE USER IS REDIRECTED TO
const Home = () => {
    return (
        <React.Fragment>
            <NavBar />
            <div className="slidegen-inner-container">
                <h1>Home Page</h1>
                {/* TOP-CONTAINER-START */}
                <div className="row hometop-container">
                    <div className="col-4">
                        <div className="home-txt-container">
                            <h4>Just 3 Steps</h4>
                            <h1 className="home-txt">Create Slides in Seconds</h1>
                            <h6>Just upload your images and convert into slides</h6>
                        </div>
                    </div>
                    <div className="col-8">
                        <img class="home-illustration" src={illustration} alt="Logo" />
                    </div>
                </div>
                {/* TOP-CONTAINER-END */}

                {/* CONTAINER-ONE-START */}
                <div className="pricing-container">
                    <div className="desc-container-inner">
                        <h3>Enhance your slides in seconds</h3>
                        <div>Within a few simple steps, you will be able to create your slide deck in on time.</div>
                    </div>
                </div>
                {/* CONTAINER-ONE-END */}

                {/* CONTAINER-TWO-START */}
                <div className="step-container">
                    <div className="row step-container-inner"> 
                         <div className="col-md-4">
                            <div className="step-card">
                                <div className="step-icon">
                                    <img class="" src={upload} alt="Logo" />    
                                </div>
                                <div className="step-title">
                                    Upload Images
                                </div>
                                <div className="step-desc">
                                    Upload your images here.
                                </div>
                            </div>
                         </div>
                         <div className="col-md-4">
                            <div className="step-card">
                                <div className="step-icon">
                                    <img class="" src={reorder} alt="Logo" />
                                </div>
                                <div className="step-title">
                                    Reorder Slides
                                </div>
                                <div className="step-desc">
                                    Drag and Drop to reorder your slides.
                                </div>
                            </div>
                         </div>
                         <div className="col-md-4">
                            <div className="step-card">
                                <div className="step-icon">
                                    <img class="" src={generate} alt="Logo" />
                                </div>
                                <div className="step-title">
                                    Slide Generated
                                </div>
                                <div className="step-desc">
                                    Select you slide template.
                                </div>
                            </div>  
                         </div>
                    </div>
                </div>
                {/* CONTAINER-TWO-END */}

                {/* CONTAINER-THREE-START */}
                <div className="pricing-container">
                    <div className="row pricing-container-inner">
                        <div className="col-md-4">
                            <div className="pricing-card">
                                <div className="pricing-icon">
                                </div>
                                <div className="pricing-txt-container">
                                    <div className="pricing-header">
                                        Basic   
                                    </div>
                                    <div className="pricing-subheader">
                                        A simple start for everyone
                                    </div>
                                    <div className="pricing-value">
                                        $0
                                    </div>
                                    <div className="pricing-list">
                                    </div>
                                    <div className="pricing-btn">
                                        <button className="slidegen-btn home-btn">
                                            Select
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="pricing-card">
                                <div className="pricing-icon">
                                </div>
                                <div className="pricing-txt-container">
                                    <div className="pricing-header">
                                        Standard  
                                    </div>
                                    <div className="pricing-subheader">
                                        For small and medium businesses
                                    </div>
                                    <div className="pricing-value">
                                        $10
                                    </div>
                                    <div className="pricing-list">
                                    </div>
                                    <div className="pricing-btn">
                                        <button className="slidegen-btn home-btn">
                                            Select
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="pricing-card">
                                <div className="pricing-icon">
                                </div>
                                <div className="pricing-txt-container">
                                    <div className="pricing-header">
                                        Enterprise   
                                    </div>
                                    <div className="pricing-subheader">
                                        A solution for big orgarnisations
                                    </div>
                                    <div className="pricing-value">
                                        $18
                                    </div>
                                    <div className="pricing-list">
                                    </div>
                                    <div className="pricing-btn">
                                        <button className="slidegen-btn home-btn">
                                            Select
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* CONTAINER-THREE-END */}
            </div>
        </React.Fragment>
    )
}

export default Home;