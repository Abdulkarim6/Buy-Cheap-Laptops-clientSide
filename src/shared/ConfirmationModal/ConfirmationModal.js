import React from 'react';

const ConfirmationModal = ({ title, message, successDeleteButton, closeModal, successDeleteAction, modalData }) => {
    return (
        <div>
            <input type="checkbox" id="confirmation-madal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <label onClick={() => successDeleteAction(modalData)} htmlFor="confirmation-madal" className="btn btn-primary">{successDeleteButton}</label>
                        <label onClick={closeModal} className="btn btn-outline">cencel</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;