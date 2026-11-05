import { useState, useContext } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const BookingForm = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const service = state?.service;

    const [formData, setFormData] = useState({
        bookingDate: '',
        slot: '09:00 AM - 11:00 AM',
        address: '',
        notes: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    if (!service) return <Navigate to="/services" />;
    
    if (user?.role !== 'customer') {
        return <div className="container mt-5 text-center"><h3>Only customers can book services.</h3></div>;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/bookings', { ...formData, serviceId: service._id });
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Booking failed');
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-sm border-0 rounded-4">
                        <div className="card-header bg-white p-4 border-bottom-0 pb-0">
                            <h2 className="fw-bold mb-0">Book Service</h2>
                        </div>
                        <div className="card-body p-4 border-0">
                            <div className="alert alert-info border-0 bg-primary bg-opacity-10 text-primary rounded-3 mb-4">
                                <h5 className="alert-heading fw-bold">{service.title}</h5>
                                <p className="mb-0">Price: <span className="fw-bold">Rs. {service.price}</span> | Duration: {service.duration}</p>
                            </div>
                            {error && <div className="alert alert-danger rounded-3">{error}</div>}
                            
                            <form onSubmit={handleSubmit}>
                                <div className="row g-3 mb-4">
                                    <div className="col-md-6">
                                        <label className="form-label text-muted fw-semibold">Service Date</label>
                                        <input type="date" name="bookingDate" className="form-control form-control-lg bg-light border-0" onChange={handleChange} required min={new Date().toISOString().split('T')[0]} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label text-muted fw-semibold">Time Slot</label>
                                        <select name="slot" className="form-select form-select-lg bg-light border-0" onChange={handleChange} value={formData.slot}>
                                            <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                                            <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                                            <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                                            <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                                        </select>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label text-muted fw-semibold">Service Address</label>
                                        <textarea name="address" className="form-control form-control-lg bg-light border-0" rows="2" onChange={handleChange} required placeholder="Enter full address where service is needed"></textarea>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label text-muted fw-semibold">Additional Notes (Optional)</label>
                                        <textarea name="notes" className="form-control bg-light border-0" rows="3" onChange={handleChange} placeholder="Any specific instructions?"></textarea>
                                    </div>
                                </div>
                                <hr className="my-4" />
                                <div className="d-flex justify-content-between align-items-center">
                                    <h4 className="fw-bold mb-0">Total: <span className="text-primary">Rs. {service.price}</span></h4>
                                    <button type="submit" className="btn btn-primary btn-lg rounded-pill px-5 fw-bold shadow-sm" disabled={loading}>
                                        {loading ? 'Processing...' : 'Confirm Booking'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingForm;
