import React from 'react';
import ReactDOM from "react-dom";

const ConfirmationModal = ({ title, message, successDeleteButton, closeModal, successDeleteAction, modalData }) => {
    return ReactDOM.createPortal(
       <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
            <div className="modal-box bg-slate-900 border border-slate-800 text-slate-100 rounded-2xl p-6">
                <h3 className="font-bold text-xl text-white">{title}</h3>
                <p className="py-4 text-slate-300 text-sm leading-relaxed">{message}</p>
                <div className="modal-action gap-2">
                    <button 
                        onClick={closeModal} 
                        className="btn btn-sm bg-slate-800 hover:bg-slate-700 text-slate-300 border-none"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => {
                            successDeleteAction(modalData);
                            closeModal();
                        }} 
                        className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none"
                    >
                        {successDeleteButton || "Delete"}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ConfirmationModal;