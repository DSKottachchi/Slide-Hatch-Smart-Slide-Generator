// NAVIGATION BAR ON HOME PAGE
import React from 'react';
import { Link } from 'react-router-dom';
import { BsReverseLayoutTextWindowReverse } from 'react-icons/bs';
import RegisterModal from '../RegisterModal';

const NavBar = () => {
    return (
        <nav className="NavBarItems">   
            <div className="navbar-logo-container">
                <BsReverseLayoutTextWindowReverse className="navbar-logo" />
                <div className="navbar-txt navbar-logo">Slide Hatch</div>
            </div>
            <ul className="nav-menu">
                {/* BUTTON START */}
                <div className="slidegen-btn-container">
                    <Link to='/image-upload'>
                        <button className="slidegen-btn home-btn">
                            Generate Slides
                        </button>
                    </Link>
                </div>
                {/* BUTTON END */}
            </ul>
        </nav>
    )
}

export default NavBar;