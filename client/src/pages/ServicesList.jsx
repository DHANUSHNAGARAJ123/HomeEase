import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const ServicesList = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('');

    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            try {
                const url = category ? `/services?category=${category}` : '/services';
                const { data } = await api.get(url);
                setServices(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, [category]);

    const categories = ['plumber', 'electrician', 'cleaner', 'tutor', 'salon', 'ac repair', 'carpenter', 'other'];

    return (
        <div className="container mt-5">
            <h2 className="mb-4 fw-bold">Available Services</h2>
            
            <div className="card shadow-sm border-0 mb-4 rounded-3 p-3 bg-white">
                <div className="d-flex flex-wrap align-items-center">
                    <span className="fw-semibold me-3 text-muted">Filter by Category:</span>
                    <select className="form-select w-auto border-light shadow-sm bg-light" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">All Categories</option>
                        {categories.map((c) => (
                            <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                        ))}
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status"></div>
                </div>
            ) : (
                <div className="row g-4">
                    {services.length === 0 ? (
                        <div className="col-12 text-center py-5">
                            <h5 className="text-muted">No services found.</h5>
                        </div>
                    ) : (
                        services.map((service) => (
                            <div key={service._id} className="col-md-4 col-lg-3">
                                <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden product-card">
                                    <div className="bg-primary bg-opacity-10 py-5 text-center">
                                        <h1 className="display-3 text-primary mb-0 position-relative" style={{top: '10px'}}>{service.category === 'electrician' ? '⚡' : service.category === 'plumber' ? '🔧' : service.category === 'cleaner' ? '🧹' : service.category === 'tutor' ? '📚' : service.category === 'ac repair' ? '❄️' : '🛋️'}</h1>
                                    </div>
                                    <div className="card-body pt-4">
                                        <span className="badge bg-primary text-white text-uppercase mb-2 rounded-pill px-3 py-2" style={{ letterSpacing: '1px', fontSize: '0.7rem' }}>{service.category}</span>
                                        <h5 className="card-title fw-bold mt-2">{service.title}</h5>
                                        <p className="card-text text-muted small text-truncate">{service.description}</p>
                                        <div className="d-flex justify-content-between align-items-center mt-4">
                                            <span className="fs-5 fw-bold text-dark">Rs. {service.price}</span>
                                            <Link to={`/services/${service._id}`} className="btn btn-sm btn-primary rounded-pill px-4 fw-semibold shadow-sm">View</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default ServicesList;
