import { Link } from 'react-router-dom';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="footer-premium pt-5 pb-4">
            <div className="container">
                <div className="row g-4 mb-5">
                    {/* Brand */}
                    <div className="col-lg-4">
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <svg width="36" height="36" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="footerLogoGrad" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor="#6366F1"/>
                                        <stop offset="100%" stopColor="#06B6D4"/>
                                    </linearGradient>
                                    <linearGradient id="footerShieldGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#FFFFFF"/>
                                        <stop offset="100%" stopColor="#E0E7FF"/>
                                    </linearGradient>
                                </defs>
                                <rect width="38" height="38" rx="11" fill="url(#footerLogoGrad)"/>
                                <path d="M19 9L27 12.5V18.5C27 23.5 23.5 27.5 19 29.5C14.5 27.5 11 23.5 11 18.5V12.5L19 9Z" fill="url(#footerShieldGrad)" />
                                <path d="M15 18.5L18 21.5L23 15" stroke="#4F46E5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className="footer-brand-text">HomeEase</span>
                        </div>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.8, maxWidth: '300px' }}>
                            Connecting you with trusted local professionals — plumbers, electricians, cleaners, tutors &amp; more.
                        </p>
                        <div className="d-flex gap-2 mt-3">
                            {['bi-twitter-x', 'bi-instagram', 'bi-facebook', 'bi-linkedin'].map((ic, i) => (
                                <a key={i} href="#" className="d-flex align-items-center justify-content-center rounded-circle"
                                    style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', transition: 'all 0.2s ease' }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.4)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}>
                                    <i className={`bi ${ic}`} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="col-6 col-lg-2 offset-lg-1">
                        <h6 className="fw-bold mb-3" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Platform</h6>
                        <ul className="list-unstyled mb-0" style={{ fontSize: '0.88rem' }}>
                            {[['Home', '/'], ['All Services', '/services'], ['Login', '/login'], ['Register', '/register']].map(([label, path], i) => (
                                <li key={i} className="mb-2">
                                    <Link to={path}>{label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-6 col-lg-2">
                        <h6 className="fw-bold mb-3" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Services</h6>
                        <ul className="list-unstyled mb-0" style={{ fontSize: '0.88rem' }}>
                            {['Plumbing', 'Electrical', 'Cleaning', 'Tutoring', 'Salon', 'AC Repair'].map((s, i) => (
                                <li key={i} className="mb-2">
                                    <Link to={`/services?category=${s}`}>{s}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-lg-3">
                        <h6 className="fw-bold mb-3" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Contact</h6>
                        <ul className="list-unstyled mb-0" style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.5)' }}>
                            <li className="mb-2 d-flex gap-2 align-items-start"><i className="bi bi-person-fill mt-1" style={{ color: '#A5B4FC' }} />Ved Savani</li>
                            <li className="mb-2 d-flex gap-2 align-items-start"><i className="bi bi-envelope-fill mt-1" style={{ color: '#A5B4FC' }} />support@homeease.in</li>
                            <li className="mb-2 d-flex gap-2 align-items-start"><i className="bi bi-telephone-fill mt-1" style={{ color: '#67E8F9' }} />+91 63510 14256</li>
                            <li className="d-flex gap-2 align-items-start"><i className="bi bi-geo-alt-fill mt-1" style={{ color: '#34D399' }} />Ankleshwar, Gujarat, India</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <p className="mb-2 mb-sm-0" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.82rem' }}>
                        © {year} HomeEase. All rights reserved.
                    </p>
                    <div className="d-flex gap-3" style={{ fontSize: '0.82rem' }}>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
