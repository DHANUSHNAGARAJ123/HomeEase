import React from 'react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', confirmStyle = 'danger' }) => {
    if (!isOpen) return null;

    return (
        <>
            <div className="modal-backdrop fade show" style={{ zIndex: 1040, backgroundColor: 'rgba(0,0,0,0.5)' }}></div>
            <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 1050 }} onClick={onClose}>
                <div className="modal-dialog modal-dialog-centered" onClick={e => e.stopPropagation()}>
                    <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                        <div className={`modal-header border-0 bg-${confirmStyle} bg-opacity-10 pb-0 pt-4 px-4`}>
                            <h5 className="modal-title fw-bold text-dark w-100 text-center">
                                <i className={`bi ${confirmStyle === 'danger' ? 'bi-exclamation-circle text-danger me-2' : 'bi-info-circle text-primary me-2'} fs-4 align-middle`}></i>
                                {title}
                            </h5>
                        </div>
                        <div className="modal-body text-center p-4">
                            <p className="text-muted mb-0" style={{ fontSize: '1.1rem' }}>{message}</p>
                        </div>
                        <div className="modal-footer border-0 pt-0 pb-4 px-4 d-flex justify-content-center gap-2">
                            <button type="button" className="btn btn-light rounded-pill px-4 fw-bold shadow-sm" onClick={onClose}>
                                Cancel
                            </button>
                            <button type="button" className={`btn btn-${confirmStyle} rounded-pill px-4 fw-bold shadow-sm`} onClick={onConfirm}>
                                {confirmText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmModal;
