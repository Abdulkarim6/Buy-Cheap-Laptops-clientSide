import React from 'react';

const ConfirmationModal = ({ title, message, successDeleteButton, closeModal, successDeleteAction, modalData }) => {
    return (
        /* modal-open ক্লাস যোগ করায় রিয়্যাক্ট স্টেট ট্রু হলেই এটি সরাসরি ভিজিবল হবে */
        <div className="modal modal-open bg-slate-950/80 backdrop-blur-sm">
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
        </div>
    );
};

export default ConfirmationModal;