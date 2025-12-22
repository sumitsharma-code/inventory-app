import React from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';

const AboutPage = () => {
    return (
        <div className="about-page">
            <div className="glow-orb orb-1"></div>
            <div className="glow-orb orb-2"></div>

            <div className="about-container">
                <h1 className="about-title">Empowering <br /> Business Efficiency</h1>

                <div className="about-content">
                    <div className="mission-section">
                        <span className="section-label">Our Mission</span>
                        <p>
                            Quantara was born from a simple belief: superior inventory management shouldn't be complicated.
                            We strive to streamline operations for businesses of all sizes, using smart algorithms and
                            intuitive design to turn chaos into clarity.
                        </p>
                    </div>

                    <div className="values-grid">
                        <div className="value-card">
                            <h3>Innovation</h3>
                            <p>Constantly pushing boundaries to bring enterprise-grade tools to everyone.</p>
                        </div>
                        <div className="value-card">
                            <h3>Simplicity</h3>
                            <p>Complex problems don't need complex solutions. Design comes first.</p>
                        </div>
                        <div className="value-card">
                            <h3>Trust</h3>
                            <p>Your data is the backbone of your business. We protect it like our own.</p>
                        </div>
                    </div>

                    <div className="about-actions">
                        <Link to="/" className="back-home-btn">Back to Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
