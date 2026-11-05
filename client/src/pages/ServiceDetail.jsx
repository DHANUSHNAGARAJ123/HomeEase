import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const ServiceDetail = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchServiceAndReviews = async () => {
            try {
                const serviceRes = await api.get(`/services/${id}`);
                setService(serviceRes.data);
                
                const reviewsRes = await api.get(`/reviews/service/${id}`);
                setReviews(reviewsRes.data);
            } catch (error) {
                console.error('Error fetching service or reviews:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchServiceAndReviews();
    }, [id]);

    const averageRating = reviews.length > 0
        ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
        : 0;

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;
    if (!service) return <div className="text-center mt-5"><h3>Service not found.</h3></div>;

    const handleBook = () => {
        if (!user) {
            navigate('/login');
        } else {
            navigate(`/book/${service._id}`, { state: { service } });
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-8">
                    <div className="card shadow-sm border-0 rounded-4 overflow-hidden mb-4">
                        <div className="bg-light py-5 text-center border-bottom">
                             <h1 className="display-1 text-primary mb-0">🛠️</h1>
                        </div>
                        <div className="card-body p-5">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <span className="badge bg-primary text-white text-uppercase rounded-pill px-3 py-2" style={{ letterSpacing: '1px', fontSize: '0.8rem' }}>{service.category}</span>
                                <h3 className="fw-bold text-success mb-0">Rs. {service.price}</h3>
                            </div>
                             <h2 className="fw-bold mb-1">{service.title}</h2>
                             
                             <div className="d-flex align-items-center gap-2 mb-3">
                                 {reviews.length > 0 ? (
                                     <>
                                         <div className="text-warning">
                                             {Array.from({ length: 5 }).map((_, i) => (
                                                 <i key={i} className={`bi ${i < Math.round(averageRating) ? 'bi-star-fill' : 'bi-star'} me-1`}></i>
                                             ))}
                                         </div>
                                         <span className="fw-bold mb-0" style={{ fontSize: '0.95rem' }}>{averageRating}</span>
                                         <span className="text-muted small">({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})</span>
                                     </>
                                 ) : (
                                     <span className="text-muted small">
                                         <i className="bi bi-star-fill text-muted me-1"></i> No reviews yet
                                     </span>
                                 )}
                             </div>
                             
                             <p className="text-muted lead mb-4">{service.description}</p>
                            
                            <hr className="my-4" />
                            
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <div className="d-flex align-items-center">
                                        <div className="bg-light rounded-circle p-3 me-3 text-primary"><i className="bi bi-clock-history"></i></div>
                                        <div>
                                            <p className="text-muted mb-0 small text-uppercase fw-bold">Duration</p>
                                            <p className="fw-semibold mb-0">{service.duration}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex align-items-center">
                                        <div className="bg-light rounded-circle p-3 me-3 text-primary"><i className="bi bi-geo-alt"></i></div>
                                        <div>
                                            <p className="text-muted mb-0 small text-uppercase fw-bold">Location</p>
                                            <p className="fw-semibold mb-0">{service.location}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="card shadow-sm border-0 rounded-4 p-5 mb-4 bg-white mt-4">
                        <h4 className="fw-bold mb-4">Customer Reviews</h4>
                        
                        {reviews.length === 0 ? (
                            <div className="text-center py-4 text-muted">
                                <i className="bi bi-chat-square-text fs-2 mb-2 d-block"></i>
                                No reviews yet for this service.
                            </div>
                        ) : (
                            <div className="d-flex flex-column gap-4">
                                {reviews.map((rev) => (
                                    <div key={rev._id} className="pb-4" style={{ borderBottom: '1px solid var(--border-subtle, #f1f5f9)' }}>
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <div className="d-flex align-items-center gap-2">
                                                <div className="bg-secondary bg-opacity-10 text-secondary rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '36px', height: '36px', fontSize: '14px' }}>
                                                    {rev.userId?.name?.charAt(0).toUpperCase() || 'U'}
                                                </div>
                                                <div>
                                                    <h6 className="fw-bold mb-0" style={{ fontSize: '0.95rem' }}>{rev.userId?.name || 'Customer'}</h6>
                                                    <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                                                        {new Date(rev.createdAt).toLocaleDateString()}
                                                    </small>
                                                </div>
                                            </div>
                                            <div className="text-warning">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <i key={i} className={`bi ${i < rev.rating ? 'bi-star-fill' : 'bi-star'} me-1`} style={{ fontSize: '0.9rem' }}></i>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-muted mb-0" style={{ fontSize: '0.95rem', lineHeight: '1.6', paddingLeft: '44px' }}>
                                            {rev.comment}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card shadow-sm border-0 rounded-4 sticky-top" style={{top: '100px'}}>
                        <div className="card-body p-4">
                            <h4 className="fw-bold mb-4">Provider Information</h4>
                            <div className="d-flex align-items-center mb-4">
                                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '60px', height: '60px', fontSize: '24px'}}>
                                    {service.providerId?.name?.charAt(0).toUpperCase() || 'P'}
                                </div>
                                <div>
                                    <h5 className="fw-bold mb-1">{service.providerId?.name || 'Unknown Provider'}</h5>
                                    <p className="text-muted small mb-0">Verified Provider ✓</p>
                                </div>
                            </div>
                            <button onClick={handleBook} className="btn btn-primary w-100 btn-lg rounded-pill fw-bold shadow-sm">
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;
