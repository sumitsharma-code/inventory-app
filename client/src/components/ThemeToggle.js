import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import './MainLayout.css'; // Re-use styles or add specific ones if needed

const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                fontSize: '1.25rem',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.3s ease'
            }}
        >
            {theme === 'dark' ? <FiToggleIcon icon={FiSun} /> : <FiToggleIcon icon={FiMoon} />}
        </button>
    );
};

const FiToggleIcon = ({ icon: Icon }) => {
    return <Icon />;
}

export default ThemeToggle;
