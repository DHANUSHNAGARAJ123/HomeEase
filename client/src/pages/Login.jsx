import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import SuccessModal from '../components/SuccessModal';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [successModal, setSuccessModal] = useState({ isOpen: false, role: null });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await login(email, password);
            setSuccessModal({ isOpen: true, role: userData.role });
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
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
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-sm border-0 rounded-4">
                        <div className="card-body p-5">
                            <h2 className="text-center mb-4 fw-bold">Welcome Back</h2>
                            {error && <div className="alert alert-danger rounded-3">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label text-muted fw-semibold">Email address</label>
                                    <input 
                                        type="email" 
                                        className="form-control form-control-lg bg-light border-0" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)}
                                        required 
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label text-muted fw-semibold">Password</label>
                                    <div className="input-group">
                                        <input 
                                            type={showPassword ? "text" : "password"} 
                                            className="form-control form-control-lg bg-light border-0" 
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)}
                                            required 
                                        />
                                        <button className="btn btn-light bg-light border-0 px-3" type="button" onClick={() => setShowPassword(!showPassword)}>
                                            <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} text-muted`}></i>
                                        </button>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary w-100 btn-lg rounded-pill fw-bold">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <SuccessModal
                isOpen={successModal.isOpen}
                onClose={handleModalClose}
                title="Login Successful!"
                message="Welcome back to HomeEase."
                buttonText="Continue to Dashboard"
            />
        </div>
    );
};

export default Login;
