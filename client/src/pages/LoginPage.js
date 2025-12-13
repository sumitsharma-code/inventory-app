import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FiUser, FiLock, FiMail } from 'react-icons/fi';
import './LoginPage.css';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetStatus, setResetStatus] = useState('');

  const handleResetSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setResetStatus('sending');
    setTimeout(() => {
      setResetStatus('sent');
      setTimeout(() => {
        setShowForgotPassword(false);
        setResetStatus('');
        setResetEmail('');
      }, 2000);
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Background Orbs */}
      <div className="glow-orb orb-login-1"></div>
      <div className="glow-orb orb-login-2"></div>

      <div className="login-container">
        <div className="brand-title">Quantara</div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-wrapper">
              <FiUser className="input-icon" />
              <input
                id="username"
                type="text"
                className="form-input"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <FiLock className="input-icon" />
              <input
                id="password"
                type="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="button"
              className="forgot-password-link"
              onClick={() => setShowForgotPassword(true)}
            >
              Forgot Password?
            </button>
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Sign In'}
          </button>

          {error && <div className="error-message">{error}</div>}
        </form>

        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="modal-overlay" onClick={() => setShowForgotPassword(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Reset Password</h2>
              <p>Enter your email logic to receive reset instructions.</p>
            </div>

            {resetStatus === 'sent' ? (
              <div className="success-message">
                Reset link sent! Check your inbox.
              </div>
            ) : (
              <form onSubmit={handleResetSubmit}>
                <div className="form-group">
                  <label htmlFor="reset-email">Email Address</label>
                  <div className="input-wrapper">
                    <FiMail className="input-icon" />
                    <input
                      id="reset-email"
                      type="email"
                      className="form-input"
                      placeholder="name@company.com"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn-secondary" onClick={() => setShowForgotPassword(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary" disabled={resetStatus === 'sending'}>
                    {resetStatus === 'sending' ? 'Sending...' : 'Send Link'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
