import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ServicesList from './pages/ServicesList';
import ServiceDetail from './pages/ServiceDetail';
import BookingForm from './pages/BookingForm';
import CustomerDashboard from './pages/CustomerDashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
        <Router>
            <div className="d-flex flex-column min-vh-100 bg-light bg-opacity-50">
                <Navbar />
                <main className="flex-fill pb-5">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/services" element={<ServicesList />} />
                        <Route path="/services/:id" element={<ServiceDetail />} />
                        
                        <Route path="/book/:id" element={
                            <ProtectedRoute roles={['customer']}>
                                <BookingForm />
                            </ProtectedRoute>
                        } />
                        
                        <Route path="/dashboard" element={
                            <ProtectedRoute roles={['customer']}>
                                <CustomerDashboard />
                            </ProtectedRoute>
                        } />
                        
                        <Route path="/provider" element={
                            <ProtectedRoute roles={['provider', 'admin']}>
                                <ProviderDashboard />
                            </ProtectedRoute>
                        } />
                    </Routes>
                </main>
            </div>
        </Router>
    </AuthProvider>
  );
}

export default App;
