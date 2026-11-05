import React from 'react';

const SuccessModal = ({ isOpen, onClose, title, message, buttonText = 'Continue' }) => {
    if (!isOpen) return null;

    return (
        <>
            <div className="modal-backdrop fade show" style={{ zIndex: 1040, backgroundColor: 'rgba(0,0,0,0.5)' }}></div>
            <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 1050 }} onClick={onClose}>
                <div className="modal-dialog modal-dialog-centered" onClick={e => e.stopPropagation()}>
                    <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                        <div className="modal-body text-center p-5">
                            <div className="mb-4">
                                <div className="d-inline-flex align-items-center justify-content-center bg-success bg-opacity-10 rounded-circle" style={{ width: '80px', height: '80px' }}>
                                    <i className="bi bi-check-lg text-success" style={{ fontSize: '3rem' }}></i>
                                </div>
                            </div>
                            <h3 className="fw-bold mb-3">{title}</h3>
                            <p className="text-muted mb-4 fs-5">{message}</p>
                            <button 
                                type="button" 
                                className="btn btn-success btn-lg rounded-pill px-5 fw-bold shadow-sm w-100" 
                                onClick={onClose}
                            >
                                {buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SuccessModal;
