import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import './LandingPage.css';

const LandingPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeAcc, setActiveAcc] = useState(0);

  const faqData = [
    {
      question: "What is Quantara, and how does it work?",
      answer: "Quantara is an AI-powered inventory management platform designed to simplify stock tracking. It uses artificial intelligence to predict demand, automate reordering, and provide real-time analytics across all your warehouses."
    },
    {
      question: "Can I integrate Quantara with my existing store?",
      answer: "Yes! Quantara seamlessly integrates with major e-commerce platforms like Shopify, WooCommerce, and Amazon, as well as custom ERP systems via our robust API."
    },
    {
      question: "Is my data secure with Quantara?",
      answer: "Absolutely. We use bank-grade AES-256 encryption and strictly adhere to GDPR and CCPA standards to ensure your business data remains private and secure."
    },
    {
      question: "Can I collaborate with my team on Quantara?",
      answer: "Yes, our platform supports unlimited seat access with role-based permissions, allowing your entire operations team to collaborate efficiently in real-time."
    }
  ];

  const toggleAccordion = (index) => {
    setActiveAcc(activeAcc === index ? -1 : index);
  };

  const testimonials = [
    {
      id: 1,
      quote: "Our business experienced a significant transformation thanks to this platform's inventory tracking. We reduced stockouts by 40% in just two months.",
      name: "Amanda Holly",
      role: "Operations Director",
      avatar: "/avatar_1.png"
    },
    {
      id: 2,
      quote: "The real-time analytics have been a game changer. We can finally make data-driven decisions that impact our bottom line immediately.",
      name: "David Chen",
      role: "Supply Chain Manager",
      avatar: "/avatar_1.png" // Using same placeholder for now
    },
    {
      id: 3,
      quote: "Security was our main concern, and Quantara nailed it. The role-based access control gave us peace of mind from day one.",
      name: "Sarah Miller",
      role: "CTO, TechFlow",
      avatar: "/avatar_1.png"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-play for testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing-page">
      {/* Background Orbs */}
      <div className="glow-orb orb-1"></div>
      <div className="glow-orb orb-2"></div>

      {/* Header */}
      <header className="landing-header">
        <div className="brand-logo">Quantara</div>
        <nav className="nav-links">
          <Link to="/login" className="btn-login">Login</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <ScrollReveal>

          <h1 className="hero-title">
            <span>Inventory Management</span>
            <span>Reimagined.</span>
          </h1>
          <p className="hero-subtitle">
            Experience the future of stock control. Intelligent analytics, real-time tracking,
            and a beautiful interface designed for high-performance teams.
          </p>

          <div className="hero-buttons">
            <Link to="/login" className="cta-button">Get Started</Link>
            <Link to="/login" className="cta-button btn-secondary">View Demo</Link>
          </div>
        </ScrollReveal >

        {/* Mock Dashboard Visual */}
        < ScrollReveal delay="0.4s" >
          <div className="mock-dashboard-container">
            <div className="mock-header">
              <div style={{ color: 'white', fontWeight: '600' }}>Enterprise Dashboard</div>
              <div style={{ color: '#9CA3AF' }}>Live Data Stream</div>
            </div>
            <div className="mock-stat-grid">
              <div className="mock-card">
                <h3>Total Revenue</h3>
                <div className="value">$8,245,500</div>
                <div className="trend">↑ 24.5% YTD</div>
              </div>
              <div className="mock-card">
                <h3>Global Products</h3>
                <div className="value">12,432</div>
                <div className="trend" style={{ color: '#3B82F6' }}>• 98% In Stock</div>
              </div>
              <div className="mock-card">
                <h3>Active Orders</h3>
                <div className="value">1,289</div>
                <div className="trend" style={{ color: '#F59E0B' }}>Processing Now</div>
              </div>
            </div>
          </div>
        </ScrollReveal >
      </section >

      {/* Visual Demo Section */}
      < section className="demo-section" >
        <div className="demo-container">
          <ScrollReveal>
            <h2 className="section-title">See It In Action</h2>
            <p className="section-subtitle">
              A powerful interface that gives you total control over your supply chain.
            </p>
          </ScrollReveal>

          <div className="demo-grid">
            <ScrollReveal delay="0.2s">
              <div className="demo-card">
                <img src="/dashboard_ui.png" alt="Dashboard UI" className="demo-image" />
                <div className="demo-caption">
                  <h3>Centralized Command Center</h3>
                  <p>Monitor all your KPIs in one place with real-time updates.</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay="0.4s">
              <div className="demo-card">
                <img src="/analytics_ui.png" alt="Analytics UI" className="demo-image" />
                <div className="demo-caption">
                  <h3>Deep Analytics</h3>
                  <p>Visualize trends and forecast demand to optimize stock levels.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section >

      {/* Get Started Section */}
      <section className="get-started-section">
        <ScrollReveal>
          <div className="section-header">

            <h2 className="section-title">Get Started in <span style={{ color: '#3B82F6' }}>3 Simple Steps</span></h2>
            <p className="section-subtitle">
              Sign up in minutes and start automating your entire inventory workflow fast.
            </p>
          </div>

          <div className="timeline-container">
            {/* Connecting Line */}
            <div className="timeline-line"></div>

            <div className="timeline-step">
              <div className="step-number">1</div>
              <div className="step-card">
                <h3>Create Account</h3>
                <p>Create your account and instantly access your smart inventory dashboard.</p>
              </div>
            </div>

            <div className="timeline-step">
              <div className="step-number">2</div>
              <div className="step-card">
                <h3>Sync Your Inventory</h3>
                <p>Add items, sync stock, and connect your existing systems in one place.</p>
              </div>
            </div>

            <div className="timeline-step">
              <div className="step-number">3</div>
              <div className="step-card">
                <h3>Launch Operations</h3>
                <p>Track orders, manage shipments, and streamline deliveries effortlessly.</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Features Section */}
      < section className="features-section" >
        <ScrollReveal>
          <h2 className="section-title">Transform Your Workflow</h2>
        </ScrollReveal>
        <div className="features-grid">
          <ScrollReveal delay="0.2s">
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3 className="feature-title">Intelligent Design</h3>
              <p className="feature-description">
                A user interface that adapts to your workflow. Dark mode enabled by default for accurate data visualization.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay="0.4s">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">Real-time Sync</h3>
              <p className="feature-description">
                Stock levels update instantly across all devices. Never oversell or lose track of inventory again.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay="0.6s">
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3 className="feature-title">Enterprise Security</h3>
              <p className="feature-description">
                Bank-grade encryption protects your data. Role-based access control keeps sensitive information safe.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section >

      {/* Security Section */}
      < section className="security-section" >
        <ScrollReveal>
          <div className="section-header">

            <h2 className="section-title">Security You Can Rely On</h2>
            <p className="section-subtitle">
              Advanced protection for your data, payments, and business.
            </p>
          </div>
        </ScrollReveal>

        <div className="security-grid">
          <ScrollReveal delay="0.2s">
            <div className="security-card">
              <div className="card-icon-box">
                <span className="card-icon">🔐</span>
              </div>
              <h3>Access Control by Role</h3>
              <p>Restrict access and protect data with granular permission layers.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay="0.4s">
            <div className="security-card">
              <div className="card-icon-box">
                <span className="card-icon">🤖</span>
              </div>
              <h3>AI-Powered Threat Detection</h3>
              <p>Detect and block suspicious activity in real time with machine learning.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay="0.6s">
            <div className="security-card">
              <div className="card-icon-box">
                <span className="card-icon">☁️</span>
              </div>
              <h3>Cloud Security & Backups</h3>
              <p>Store data safely with full compliance, automated backups, and built-in redundancy.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay="0.8s">
            <div className="security-card">
              <div className="card-icon-box">
                <span className="card-icon">🔒</span>
              </div>
              <h3>Full End-to-End Encryption</h3>
              <p>Encrypt sensitive data from end to end, blocking leaks and unauthorized access.</p>
            </div>
          </ScrollReveal>
        </div>
      </section >

      {/* Testimonials Section */}
      < section className="testimonials-section" >
        <ScrollReveal>
          <div className="section-header">
            <h2 className="section-title">Hear From <span style={{ color: '#3B82F6' }}>Our Customers</span></h2>
            <p className="section-subtitle">
              Smarter inventory. Real impact. See how Quantara boosts efficiency and eliminates stock issues.
            </p>
          </div>

          <div className="testimonial-slider">
            <div className="testimonial-card">
              <p className="testimonial-quote">"{testimonials[currentTestimonial].quote}"</p>

              <div className="testimonial-profile">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="testimonial-avatar"
                />
                <div className="testimonial-info">
                  <h4>{testimonials[currentTestimonial].name}</h4>
                  <span>{testimonials[currentTestimonial].role}</span>
                </div>
              </div>
            </div>

            <div className="slider-controls">
              <button onClick={prevTestimonial} className="nav-arrow" aria-label="Previous">←</button>
              <button onClick={nextTestimonial} className="nav-arrow" aria-label="Next">→</button>
            </div>
          </div>
        </ScrollReveal>
      </section >

      {/* FAQ Section */}
      <section className="faq-section">
        <ScrollReveal>
          <div className="faq-container">
            {/* Left Column: Header */}
            <div className="faq-header">
              <div className="security-badge">
                <span className="shield-icon">?</span> FAQs
              </div>
              <h2 className="section-title" style={{ textAlign: 'left' }}>
                Frequently asked <br /> questions
              </h2>
              <p className="faq-subtitle">
                Some answers to common questions we get asked. Feel free to reach out if you have any inquiries.
              </p>
              <Link to="/login" className="cta-button" style={{ display: 'inline-block', marginTop: '1rem' }}>
                Get Started
              </Link>
            </div>

            {/* Right Column: Accordion */}
            <div className="faq-accordion">
              {faqData.map((item, index) => (
                <div
                  key={index}
                  className={`accordion-item ${activeAcc === index ? 'active' : ''}`}
                  onClick={() => toggleAccordion(index)}
                >
                  <div className="accordion-header">
                    <h3>{item.question}</h3>
                    <span className="accordion-icon">
                      {activeAcc === index ? '↘' : '↗'}
                    </span>
                  </div>
                  <div className="accordion-content">
                    <p>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>



      {/* CTA Section */}
      <section className="cta-section">
        <ScrollReveal>
          <div className="cta-container">
            <div className="cta-content">
              <div className="security-badge" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none' }}>
                <span className="shield-icon">📞</span> Contact
              </div>
              <h2 className="cta-title">Expand Your Reach with <br /> Quantara's Smart Platform</h2>
              <p className="cta-subtitle">
                Manage inventory, streamline operations, and scale your business anywhere in the world.
              </p>
            </div>
            <div className="cta-form-container">
              <form className="cta-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Enter your email" className="cta-input" />
                <button type="submit" className="cta-submit-btn">Contact Us</button>
              </form>
            </div>
          </div>
          {/* Background decorative shapes for CTA */}
          <div className="cta-shape shape-1"></div>
          <div className="cta-shape shape-2"></div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-grid">
          <div className="footer-brand-col">
            <div className="brand-logo" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>Quantara</div>
            <p className="footer-desc">
              We're here to help businesses evolve through tailored development, smart systems, and lasting impact.
            </p>
          </div>

          <div className="footer-link-col">
            <h4>Menu</h4>
            <Link to="/">Home</Link>
            <Link to="/features">Features</Link>
            <Link to="/usecases">UseCases</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/changelog">Changelog</Link>
          </div>

          <div className="footer-link-col">
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact Us</Link>
          </div>

          <div className="footer-link-col">
            <h4>Other Pages</h4>
            <Link to="/customer">Customer</Link>
            <Link to="/career">Career</Link>
            <Link to="/support">Support Center</Link>
          </div>

          <div className="footer-link-col">
            <h4>Social Media</h4>
            <a href="#linkedin">LinkedIn</a>
            <a href="#instagram">Instagram</a>
            <a href="#x">X</a>
            <a href="#github">Github</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Quantara. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Term of Use</Link>
          </div>
        </div>
      </footer>
    </div >
  );
};

export default LandingPage;
