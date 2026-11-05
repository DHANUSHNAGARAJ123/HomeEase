import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import SuccessModal from '../components/SuccessModal';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', role: 'customer'
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [successModal, setSuccessModal] = useState({ isOpen: false, role: null });
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
        if (!passwordRegex.test(formData.password)) {
            setError('Password must be at least 6 characters long and contain at least 1 uppercase letter and 1 special character.');
            return;
        }

        try {
            const userData = await register(formData);
            setSuccessModal({ isOpen: true, role: userData.role });
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    const handleModalClose = () => {
        setSuccessModal({ isOpen: false, role: null });
        if (successModal.role === 'provider') {
            navigate('/provider');
        } else {
            navigate('/dashboard');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-6">
                    <div className="card shadow-sm border-0 rounded-4">
                        <div className="card-body p-5">
                            <h2 className="text-center mb-4 fw-bold">Create an Account</h2>
                            {error && <div className="alert alert-danger rounded-3">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label text-muted fw-semibold">Full Name</label>
                                    <input type="text" name="name" className="form-control form-control-lg bg-light border-0" onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-muted fw-semibold">Email address</label>
                                    <input type="email" name="email" className="form-control form-control-lg bg-light border-0" onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-muted fw-semibold">Password</label>
                                    <div className="input-group">
                                        <input type={showPassword ? "text" : "password"} name="password" className="form-control form-control-lg bg-light border-0" onChange={handleChange} required />
                                        <button className="btn btn-light bg-light border-0 px-3" type="button" onClick={() => setShowPassword(!showPassword)}>
                                            <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} text-muted`}></i>
                                        </button>
                                    </div>
                                    <div className="form-text mt-2"><i className="bi bi-info-circle me-1"></i>Must be at least 6 characters with 1 uppercase letter and 1 special character.</div>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label text-muted fw-semibold">Account Type</label>
                                    <select name="role" className="form-select form-select-lg bg-light border-0" onChange={handleChange} value={formData.role}>
                                        <option value="customer">Customer (Book Services)</option>
                                        <option value="provider">Provider (Offer Services)</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary w-100 btn-lg rounded-pill fw-bold">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <SuccessModal
                isOpen={successModal.isOpen}
                onClose={handleModalClose}
                title="Registration Successful!"
                message="Welcome to HomeEase. Your account has been created."
                buttonText="Go to Dashboard"
            />
        </div>
    );
};

export default Register;
