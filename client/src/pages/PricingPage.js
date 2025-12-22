import React from 'react';
import { Link } from 'react-router-dom';
import './PricingPage.css';

const PricingPage = () => {
    return (
        <div className="pricing-page">
            <div className="glow-orb orb-1"></div>
            <div className="glow-orb orb-2"></div>

            <div className="pricing-container">
                <h1 className="pricing-title">Simple, Transparent Pricing</h1>
                <p className="pricing-subtitle">
                    Choose the plan that fits your business needs. No hidden fees.
                </p>

                <div className="pricing-grid">
                    {/* Monthly Plan */}
                    <div className="pricing-card">
                        <h3 className="plan-name">Monthly</h3>
                        <div className="price-tag">
                            <span className="currency">₹</span>
                            <span className="amount">199</span>
                            <span className="period">/mo</span>
                        </div>
                        <p className="plan-desc">Perfect for small businesses just getting started.</p>

                        <ul className="feature-list">
                            <li>✅ Up to 1,000 SKUs</li>
                            <li>✅ Real-time tracking</li>
                            <li>✅ Basic reporting</li>
                            <li>✅ Email support</li>
                        </ul>

                        <Link to="/login" className="plan-btn">Get Started</Link>
                    </div>

                    {/* Annual Plan */}
                    <div className="pricing-card popular">
                        <div className="popular-badge">Best Value</div>
                        <h3 className="plan-name">Annual</h3>
                        <div className="price-tag">
                            <span className="currency">₹</span>
                            <span className="amount">1499</span>
                            <span className="period">/yr</span>
                        </div>
                        <p className="plan-desc">Save big with our annual plan. Ideal for growing teams.</p>

                        <ul className="feature-list">
                            <li>✅ Unlimited SKUs</li>
                            <li>✅ Advanced analytics</li>
                            <li>✅ Priority support</li>
                            <li>✨ Save ~37% vs Monthly</li>
                        </ul>

                        <Link to="/login" className="plan-btn btn-primary">Get Started</Link>
                    </div>
                </div>

                <div className="pricing-actions">
                    <Link to="/" className="back-home-link">← Back to Home</Link>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;
