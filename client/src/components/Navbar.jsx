import { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
            <div className="container">
                {/* Brand */}
                <Link className="navbar-brand" to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    {/* Custom SVG Logo: Location pin + wrench = Local Services */}
                    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                        <defs>
                            <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#6366F1"/>
                                <stop offset="100%" stopColor="#06B6D4"/>
                            </linearGradient>
                            <linearGradient id="shieldGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#FFFFFF"/>
                                <stop offset="100%" stopColor="#E0E7FF"/>
                            </linearGradient>
                            <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#6366F1" floodOpacity="0.45"/>
                            </filter>
                        </defs>
                        {/* Rounded background */}
                        <rect width="38" height="38" rx="11" fill="url(#logoGrad)" filter="url(#logoShadow)"/>
                        {/* Outer Trust Shield */}
                        <path d="M19 9L27 12.5V18.5C27 23.5 23.5 27.5 19 29.5C14.5 27.5 11 23.5 11 18.5V12.5L19 9Z" fill="url(#shieldGrad)" />
                        {/* Inner Checkmark */}
                        <path d="M15 18.5L18 21.5L23 15" stroke="#4F46E5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{
                        background: 'linear-gradient(90deg, #A5B4FC, #67E8F9)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        fontWeight: 900,
                        fontSize: '1.5rem',
                        letterSpacing: '-0.04em',
                        fontFamily: 'var(--font-heading)',
                    }}>
                        HomeEase
                    </span>
                </Link>

                <button className="navbar-toggler border-0" type="button"
                    data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    style={{ outline: 'none', boxShadow: 'none' }}>
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    {/* Left links */}
                    <ul className="navbar-nav me-auto ms-4 gap-1">
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/') ? 'active' : ''}`} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/services') ? 'active' : ''}`} to="/services">All Services</Link>
                        </li>
                    </ul>

                    {/* Right links */}
                    <ul className="navbar-nav ms-auto align-items-center gap-2">
                        {user ? (
                            <>
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${isActive('/dashboard') || isActive('/provider') ? 'active' : ''}`}
                                        to={user.role === 'provider' ? '/provider' : '/dashboard'}>
                                        <i className="bi bi-grid-fill me-1" />Dashboard
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <div className="d-flex align-items-center gap-2 px-3 py-1 rounded-pill"
                                        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)' }}>
                                        <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
                                            style={{ width: '28px', height: '28px', background: 'linear-gradient(135deg,#6366F1,#06B6D4)', fontSize: '0.8rem', color: '#fff' }}>
                                            {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                        </div>
                                        <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem', fontWeight: 500 }}>
                                            {user.name?.split(' ')[0]}
                                        </span>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-sm rounded-pill px-3 fw-semibold"
                                        onClick={handleLogout}
                                        style={{ background: 'rgba(239,68,68,0.2)', color: '#FCA5A5', border: '1px solid rgba(239,68,68,0.3)', fontSize: '0.85rem' }}>
                                        <i className="bi bi-box-arrow-right me-1" />Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn btn-primary rounded-pill px-4 fw-bold" to="/register"
                                        style={{ fontSize: '0.9rem' }}>
                                        Get Started
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
