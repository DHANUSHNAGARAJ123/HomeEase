import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const { user } = useContext(AuthContext);

    const dummySlides = [
        {
            title: 'Expert Plumbing Solutions',
            desc: 'Book verified local plumbers for instant repairs and full maintenance.',
            tag: 'PLUMBING',
            btn: 'Explore Plumbers',
            img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1600&auto=format&fit=crop',
            accent: 'rgba(6,182,212,0.6)',
        },
        {
            title: 'Licensed Electricians',
            desc: 'Safe, reliable electrical services with certified, background-checked pros.',
            tag: 'ELECTRICAL',
            btn: 'Find Electricians',
            img: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1600&auto=format&fit=crop',
            accent: 'rgba(245,158,11,0.6)',
        },
        {
            title: 'Deep Cleaning Experts',
            desc: 'Come home to a spotless space — rated 5 stars by thousands of homeowners.',
            tag: 'CLEANING',
            btn: 'Book Cleaners',
            img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop',
            accent: 'rgba(16,185,129,0.6)',
        },
        {
            title: 'Professional Tutoring',
            desc: 'Accelerate learning with certified private tutors at your convenience.',
            tag: 'EDUCATION',
            btn: 'Find Tutors',
            img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1600&auto=format&fit=crop',
            accent: 'rgba(99,102,241,0.6)',
        },
    ];

    return (
        <div className="container-fluid p-0">

            {/* ── HERO CAROUSEL ── */}
            <div
                    id="heroCarousel"
                    className="carousel slide hero-section"
                    data-bs-ride="carousel"
                    data-bs-interval="4000"
                    data-bs-pause="false"
                    style={{ height: '72vh', minHeight: '600px' }}
                >
                    <div className="carousel-indicators">
                        {dummySlides.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                data-bs-target="#heroCarousel"
                                data-bs-slide-to={i}
                                className={i === 0 ? 'active' : ''}
                                style={{ width: '32px', height: '4px', borderRadius: '2px', opacity: i === 0 ? 1 : 0.4 }}
                            />
                        ))}
                    </div>

                    <div className="carousel-inner h-100">
                        {dummySlides.map((slide, i) => (
                            <div key={i} className={`carousel-item h-100 ${i === 0 ? 'active' : ''}`}>
                                <div
                                    className="w-100 h-100 position-relative"
                                    style={{
                                        backgroundImage: `url('${slide.img}')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                >
                                    {/* Dark overlay + coloured accent */}
                                    <div className="position-absolute w-100 h-100"
                                        style={{ background: `linear-gradient(120deg, rgba(2,6,23,0.93) 0%, rgba(2,6,23,0.6) 60%, ${slide.accent} 100%)` }}
                                    />
                                    {/* Left glow blob */}
                                    <div className="position-absolute" style={{ inset: 0, background: 'radial-gradient(ellipse 50% 80% at 0% 50%, rgba(99,102,241,0.3) 0%, transparent 70%)', pointerEvents: 'none' }} />

                                    <div className="container h-100 position-relative" style={{ zIndex: 3 }}>
                                        <div className="row h-100 align-items-center">
                                            <div className="col-lg-7 text-white fade-up">
                                                <span className="badge px-3 py-2 mb-3 text-uppercase"
                                                    style={{ background: 'rgba(99,102,241,0.35)', border: '1px solid rgba(165,180,252,0.5)', letterSpacing: '3px', fontSize: '0.7rem' }}>
                                                    {slide.tag}
                                                </span>
                                                <h1 className="fw-bold text-white mb-3" style={{ textShadow: '0 4px 32px rgba(0,0,0,0.4)' }}>
                                                    {slide.title}
                                                </h1>
                                                <p className="fs-5 mb-4" style={{ opacity: 0.8, maxWidth: '520px', lineHeight: 1.7 }}>
                                                    {slide.desc}
                                                </p>
                                                <div className="d-flex gap-3 flex-wrap">
                                                    {user ? (
                                                        <Link to={user.role === 'provider' ? '/provider' : '/dashboard'}
                                                            className="btn btn-primary btn-lg rounded-pill px-5 fw-bold">
                                                            My Dashboard
                                                        </Link>
                                                    ) : (
                                                        <Link to="/register"
                                                            className="btn btn-primary btn-lg rounded-pill px-5 fw-bold">
                                                            Get Started Free
                                                        </Link>
                                                    )}
                                                    <Link to="/services"
                                                        className="btn btn-outline-light btn-lg rounded-pill px-5 fw-bold backdrop-blur">
                                                        {slide.btn}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev" style={{ width: '6%' }}>
                        <span className="carousel-control-prev-icon" />
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next" style={{ width: '6%' }}>
                        <span className="carousel-control-next-icon" />
                    </button>
                </div>
        </div>

    );
};

export default Home;
