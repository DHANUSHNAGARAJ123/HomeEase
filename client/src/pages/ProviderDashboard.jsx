import { useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import ConfirmModal from '../components/ConfirmModal';

const ProviderDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    const [activeTab, setActiveTab] = useState('bookings');
    
    const [editingServiceId, setEditingServiceId] = useState(null);
    const [newService, setNewService] = useState({
        title: '', category: 'plumber', description: '', price: '', duration: '', location: ''
    });
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [bookingsRes, servicesRes] = await Promise.all([
                    api.get('/bookings/provider'),
                    api.get(`/services`)
                ]);
                setBookings(bookingsRes.data);
                const myServices = servicesRes.data.filter(s => s.providerId && (s.providerId._id === user._id || s.providerId === user._id));
                setServices(myServices);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user._id]);

    const handleStatusUpdate = async (id, status) => {
        try {
            await api.patch(`/bookings/${id}/status`, { status });
            setBookings(bookings.map(b => b._id === id ? { ...b, status } : b));
        } catch (error) {
            alert('Failed to update status');
        }
    };

    const handleSubmitService = async (e) => {
        e.preventDefault();
        try {
            if (editingServiceId) {
                const { data } = await api.put(`/services/${editingServiceId}`, newService);
                setServices(services.map(s => s._id === editingServiceId ? data : s));
                alert('Service updated successfully');
                handleCancelEdit();
            } else {
                const { data } = await api.post('/services', newService);
                setServices([data, ...services]);
                setNewService({ title: '', category: 'plumber', description: '', price: '', duration: '', location: '' });
                alert('Service added successfully');
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to process service');
        }
    };

    const handleEditClick = (service) => {
        setEditingServiceId(service._id);
        setNewService({
            title: service.title, category: service.category, description: service.description,
            price: service.price, duration: service.duration, location: service.location
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setEditingServiceId(null);
        setNewService({ title: '', category: 'plumber', description: '', price: '', duration: '', location: '' });
    };

    const promptDeleteService = (id) => {
        setDeleteModal({ isOpen: true, id });
    };

    const confirmDeleteService = async () => {
        const id = deleteModal.id;
        try {
            await api.delete(`/services/${id}`);
            setServices(services.filter(s => s._id !== id));
            if (editingServiceId === id) handleCancelEdit();
        } catch (error) {
            alert('Failed to delete service');
        }
        setDeleteModal({ isOpen: false, id: null });
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'pending': return 'warning';
            case 'confirmed': return 'primary';
            case 'completed': return 'success';
            case 'cancelled': return 'danger';
            default: return 'secondary';
        }
    };

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

    return (
        <div className="container mt-5">
            <h2 className="mb-4 fw-bold">Provider Dashboard</h2>
            
            <div className="row mb-5">
                <div className="col-md-4">
                    <div className="card shadow-sm border-0 border-start border-info border-4 rounded-3 h-100 bg-white">
                        <div className="card-body py-4">
                            <h6 className="text-muted fw-bold text-uppercase mb-2">My Services</h6>
                            <h2 className="mb-0 fw-bold">{services.length}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card shadow-sm border-0 border-start border-primary border-4 rounded-3 h-100 bg-white">
                        <div className="card-body py-4">
                            <h6 className="text-muted fw-bold text-uppercase mb-2">Total Bookings</h6>
                            <h2 className="mb-0 fw-bold">{bookings.length}</h2>
                        </div>
                    </div>
                </div>
            </div>

            <ul className="nav nav-pills mb-4">
                <li className="nav-item">
                    <button className={`nav-link rounded-pill px-4 fw-semibold border-0 ${activeTab === 'bookings' ? 'active shadow-sm bg-primary text-white' : 'text-dark bg-light'}`} onClick={() => setActiveTab('bookings')}>Bookings</button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link rounded-pill px-4 fw-semibold border-0 ms-2 ${activeTab === 'services' ? 'active shadow-sm bg-primary text-white' : 'text-dark bg-light'}`} onClick={() => setActiveTab('services')}>My Services</button>
                </li>
            </ul>

            {activeTab === 'bookings' && (
                <div className="card shadow-sm border-0 rounded-4">
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table table-hover mb-0 align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th className="px-4 py-3 border-0">Customer</th>
                                        <th className="py-3 border-0">Service</th>
                                        <th className="py-3 border-0">Date / Slot</th>
                                        <th className="py-3 border-0">Address</th>
                                        <th className="py-3 border-0">Status</th>
                                        <th className="py-3 text-end px-4 border-0">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.length === 0 ? (
                                        <tr><td colSpan="6" className="text-center py-5 text-muted">No bookings found</td></tr>
                                    ) : (
                                        bookings.map((booking) => (
                                            <tr key={booking._id}>
                                                <td className="px-4 py-3">
                                                    <div className="fw-semibold">{booking.userId?.name}</div>
                                                    <div className="small text-muted">{booking.userId?.phone || booking.userId?.email}</div>
                                                </td>
                                                <td className="py-3">{booking.serviceId?.title}</td>
                                                <td className="py-3">
                                                    <div>{new Date(booking.bookingDate).toLocaleDateString()}</div>
                                                    <div className="small text-muted">{booking.slot}</div>
                                                </td>
                                                <td className="py-3 small">{booking.address}</td>
                                                <td className="py-3">
                                                    <span className={`badge ${getStatusColor(booking.status) === 'primary' ? 'bg-primary text-white' : `bg-${getStatusColor(booking.status)} bg-opacity-10 text-${getStatusColor(booking.status)}`} rounded-pill px-3 py-2 text-uppercase`} style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                                                        {booking.status}
                                                    </span>
                                                </td>
                                                <td className="py-3 text-end px-4">
                                                    {booking.status === 'pending' && (
                                                        <select className="form-select form-select-sm d-inline-block w-auto rounded-pill border-0 bg-light shadow-sm" onChange={(e) => handleStatusUpdate(booking._id, e.target.value)} value={booking.status}>
                                                            <option value="pending">Pending</option>
                                                            <option value="confirmed">Confirm</option>
                                                            <option value="cancelled">Cancel</option>
                                                        </select>
                                                    )}
                                                    {booking.status === 'confirmed' && (
                                                        <button onClick={() => handleStatusUpdate(booking._id, 'completed')} className="btn btn-sm btn-success rounded-pill px-3 shadow-sm">Mark Complete</button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'services' && (
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <div className="card shadow-sm border-0 rounded-4 sticky-top" style={{top: '100px'}}>
                            <div className="card-header bg-white p-4 border-bottom-0 pb-0">
                                <h5 className="fw-bold mb-0">{editingServiceId ? 'Edit Service' : 'Add New Service'}</h5>
                            </div>
                            <div className="card-body p-4 border-0">
                                <form onSubmit={handleSubmitService}>
                                    <div className="mb-3">
                                        <input type="text" className="form-control bg-light border-0" placeholder="Worker's Name" value={newService.title} onChange={e => setNewService({...newService, title: e.target.value})} required/>
                                    </div>
                                    <div className="mb-3">
                                        <select className="form-select bg-light border-0" value={newService.category} onChange={e => setNewService({...newService, category: e.target.value})}>
                                            <option value="plumber">Plumber</option>
                                            <option value="electrician">Electrician</option>
                                            <option value="cleaner">Cleaner</option>
                                            <option value="tutor">Tutor</option>
                                            <option value="salon">Salon</option>
                                            <option value="ac repair">AC Repair</option>
                                            <option value="carpenter">Carpenter</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <input type="number" className="form-control bg-light border-0" placeholder="Price (Rs.)" value={newService.price} onChange={e => setNewService({...newService, price: e.target.value})} required/>
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" className="form-control bg-light border-0" placeholder="Service Area/Location" value={newService.location} onChange={e => setNewService({...newService, location: e.target.value})} required/>
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" className="form-control bg-light border-0" placeholder="Duration (e.g. 1 hour)" value={newService.duration} onChange={e => setNewService({...newService, duration: e.target.value})} required/>
                                    </div>
                                    <div className="mb-4">
                                        <textarea className="form-control bg-light border-0" placeholder="Description" rows="3" value={newService.description} onChange={e => setNewService({...newService, description: e.target.value})} required></textarea>
                                    </div>
                                    <div className="d-flex gap-2">
                                        <button type="submit" className="btn btn-primary w-100 rounded-pill fw-bold shadow-sm">
                                            {editingServiceId ? 'Update Service' : 'Publish Service'}
                                        </button>
                                        {editingServiceId && (
                                            <button type="button" onClick={handleCancelEdit} className="btn btn-light border rounded-pill px-4 fw-bold">Cancel</button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="row g-3">
                            {services.length === 0 ? (
                                <div className="text-muted col-12 text-center py-5">You haven't added any services yet.</div>
                            ) : (
                                services.map(s => (
                                    <div key={s._id} className="col-md-6 mb-3">
                                        <div className="card shadow-sm border-0 rounded-4 h-100">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-start mb-2">
                                                    <span className="badge bg-primary text-white text-uppercase rounded-pill px-3 py-1" style={{ letterSpacing: '1px', fontSize: '0.7rem' }}>{s.category}</span>
                                                    <div className="d-flex gap-1 border rounded-pill px-2 py-1 bg-light">
                                                        <button onClick={() => handleEditClick(s)} className="btn btn-sm text-primary p-0" style={{width: '24px', height: '24px'}} title="Edit"><i className="bi bi-pencil-fill"></i></button>
                                                        <div className="vr mx-1"></div>
                                                        <button onClick={() => promptDeleteService(s._id)} className="btn btn-sm text-danger p-0" style={{width: '24px', height: '24px'}} title="Delete"><i className="bi bi-trash-fill"></i></button>
                                                    </div>
                                                </div>
                                                <h5 className="fw-bold">{s.title}</h5>
                                                <p className="text-muted small text-truncate">{s.description}</p>
                                                <div className="d-flex justify-content-between mt-3">
                                                    <span className="fw-bold text-success">Rs. {s.price}</span>
                                                    <span className="text-muted small fw-semibold"><i className="bi bi-clock me-1"></i>{s.duration}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
            <ConfirmModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, id: null })}
                onConfirm={confirmDeleteService}
                title="Delete Service"
                message="Are you sure you want to delete this service? All related data will be permanently removed."
                confirmText="Yes, Delete"
                confirmStyle="danger"
            />
        </div>
    );
};

export default ProviderDashboard;
