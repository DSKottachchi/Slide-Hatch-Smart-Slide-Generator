// SIDE NAV COMPONENT 
import React from 'react';
import { BsFileEarmarkPlus, BsFileDiff, BsGridFill, BsLayoutTextSidebarReverse, BsPlusSquare, BsFillQuestionSquareFill, BsFillForwardFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useState } from "react";
import { NavLink } from "react-router-dom";  
import { Nav } from 'react-bootstrap';

const SideNav = () => {
    const [bgColor, setbgColor] = useState('');

    return (
        // SIDE NAV COMPONENT START
        <div className="sidenav-container fixed-left">
            <div className="sidenav-inner">
                <ul className="sidenav-list">
                    {/* SIDE NAV LIST ITEM */}
                    <li className="sidenav-list-item">
                        <NavLink activeClassName="current-link" to='/image-upload'>
                            <BsFileEarmarkPlus className="nav-icon" />
                            <div>Upload Image</div>
                        </NavLink>
                    </li>
                    {/* SIDE NAV LIST ITEM */}

                    {/* SIDE NAV LIST ITEM */}
                    <li className="sidenav-list-item">
                        <NavLink activeClassName="current-link" to='/text-slide'>
                            <BsFileDiff className="nav-icon" />
                            <div>Edit Texts</div>
                        </NavLink>
                    </li>
                    {/* SIDE NAV LIST ITEM */}

                    {/* SIDE NAV LIST ITEM */}
                    <li className="sidenav-list-item">
                        <NavLink activeClassName="current-link" to='/reorder-slides'>
                            <BsGridFill className="nav-icon" />
                            <div>Add Media</div>
                        </NavLink>
                    </li>
                    {/* SIDE NAV LIST ITEM */}

                    {/* SIDE NAV LIST ITEM */}
                    <li className="sidenav-list-item">
                        <NavLink activeClassName="current-link" to='/master-slide'>
                            <BsLayoutTextSidebarReverse className="nav-icon" />
                            <div>Add Master Slide</div>
                        </NavLink>
                    </li>
                    {/* SIDE NAV LIST ITEM */}

                    {/* SIDE NAV LIST ITEM */}
                    <li className="sidenav-list-item">
                        <NavLink activeClassName="current-link" to='/slide-generate'>
                            <BsPlusSquare className="nav-icon" />
                            <div>Generate Slide</div>
                        </NavLink>
                    </li>
                    {/* SIDE NAV LIST ITEM */}

                    {/* SIDE NAV LIST ITEM */}
                    <div className="guideline-container">
                        <div className="guideline-text">
                            Want to learn more about slide designs? 
                        </div>
                        {/* <div className="guideline-text mt-3">
                            Checkout the link below
                        </div> */}
                        <li className="sidenav-list-item guideline-btn">
                            <a href='https://venngage.com/blog/presentation-design/'>
                                <div className="guideline-btn-text">Learn More</div>
                                <BsFillForwardFill className="guideline-icon" />
                            </a>
                        </li>
                    </div>
                    
                    {/* SIDE NAV LIST ITEM */}
                </ul>
            </div>
        </div>
        // SIDE NAV COMPONENT END
    )
}

export default SideNav;