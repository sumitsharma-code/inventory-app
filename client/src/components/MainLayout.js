import React, { useContext } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { FiHome, FiBox, FiShoppingCart, FiUsers, FiLogOut, FiActivity, FiAlertCircle } from 'react-icons/fi';
import './MainLayout.css';

const MainLayout = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    React.useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (!mobile) setIsSidebarOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className={`layout-container ${isMobile ? 'mobile-view' : ''} ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            {/* Global Background Orbs */}
            <div className="glow-orb-layout orb-1"></div>
            <div className="glow-orb-layout orb-2"></div>

            {/* Mobile Header with Hamburger */}
            {isMobile && (
                <div className="mobile-header">
                    <button className="menu-btn" onClick={toggleSidebar}>
                        <div className="hamburger">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>
                    <div className="brand-mobile">Quantara</div>
                </div>
            )}

            {/* Backdrop for Mobile */}
            {isMobile && isSidebarOpen && (
                <div className="backdrop" onClick={() => setIsSidebarOpen(false)}></div>
            )}

            {/* Sidebar Navigation */}
            <aside className={`sidebar ${isMobile ? 'mobile-sidebar' : ''}`}>
                <div className="brand">Quantara</div>

                <nav className="nav-menu">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        onClick={() => isMobile && setIsSidebarOpen(false)}
                    >
                        <FiHome className="nav-icon" /> Dashboard
                    </NavLink>

                    <NavLink
                        to="/inventory"
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        onClick={() => isMobile && setIsSidebarOpen(false)}
                    >
                        <FiBox className="nav-icon" /> Inventory
                    </NavLink>

                    <NavLink
                        to="/sales/new"
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        onClick={() => isMobile && setIsSidebarOpen(false)}
                    >
                        <FiShoppingCart className="nav-icon" /> Sales
                    </NavLink>

                    <NavLink
                        to="/sales/history"
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        onClick={() => isMobile && setIsSidebarOpen(false)}
                    >
                        <FiActivity className="nav-icon" /> History
                    </NavLink>

                    <NavLink
                        to="/low-stock"
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        onClick={() => isMobile && setIsSidebarOpen(false)}
                    >
                        <FiAlertCircle className="nav-icon" /> Low Stock
                    </NavLink>

                    {user && user.role === 'admin' && (
                        <NavLink
                            to="/users"
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                            onClick={() => isMobile && setIsSidebarOpen(false)}
                        >
                            <FiUsers className="nav-icon" /> Users
                        </NavLink>
                    )}
                </nav>

                <div className="user-profile">
                    <div style={{ flex: 1 }}>
                        <div style={{ color: 'white', fontWeight: '600' }}>{user ? user.username : 'User'}</div>
                        <div style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>{user ? user.role : 'Member'}</div>
                    </div>
                    <button onClick={handleLogout} className="logout-btn" title="Logout">
                        <FiLogOut />
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
