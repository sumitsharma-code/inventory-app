import React from 'react';
import { Link } from 'react-router-dom';
import './CareerPage.css';

const CareerPage = () => {
    return (
        <div className="career-page">
            <div className="glow-orb orb-1"></div>
            <div className="glow-orb orb-2"></div>

            <div className="career-container">
                <h1 className="career-title">Join Our Team</h1>

                <div className="career-card">
                    <div className="icon-wrapper">
                        <span className="info-icon">ℹ️</span>
                    </div>
                    <h2>Current Openings</h2>
                    <p className="career-message">
                        Thank you for your interest in joining Quantara.
                        We are currently not hiring for any new positions at this time.
                    </p>
                    <p className="career-submessage">
                        Please check back later or follow us on social media for future updates.
                    </p>

                    <Link to="/" className="back-home-btn">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CareerPage;
