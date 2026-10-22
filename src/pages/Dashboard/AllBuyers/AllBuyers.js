import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { HiOutlineTrash } from 'react-icons/hi2';
import ConfirmationModal from '../../../shared/ConfirmationModal/ConfirmationModal';

const AllBuyers = () => {
    const [deletingBuyer, setDeletingBuyer] = useState(null);
    const closeModal = () => setDeletingBuyer(null);

    const role = 'buyer';
    const url = `https://cheap-laptop-server-side.vercel.app/allBuyers?role=${role}`;

    // Fetch all buyers with JWT authorization
    const { data: allBuyers = [], isLoading, refetch } = useQuery({
        queryKey: ['allBuyers', role],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            return await res.json();
        }
    });

    // Delete buyer with confirmation modal
    const successDeleteAction = (buyer) => {
        fetch(`https://cheap-laptop-server-side.vercel.app/buyer/${buyer._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.acknowledged || data.deletedCount > 0) {
                    toast.success(`${buyer.name} deleted successfully`);
                    refetch();
                } else {
                    toast.error("Failed to delete buyer");
                }
            })
            .catch(() => toast.error("Something went wrong!"));
    };

    return (
        <section className="w-full">
            {isLoading ? (
                /* Glassmorphic Loading Spinner */
                <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
                    <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400 text-sm font-medium">Loading buyers list...</p>
                </div>
            ) : (
                <div>
                    {/* Header Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">
                                All Buyers
                            </h2>
                            <p className="text-slate-400 text-xs mt-0.5">
                                Manage registered buyer accounts and user information
                            </p>
                        </div>
                        <span className="self-start sm:self-auto text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-full">
                            Total Buyers: {allBuyers?.length || 0}
                        </span>
                    </div>

                    {/* Empty State */}
                    {!allBuyers?.length ? (
                        <div className="text-center py-16 px-4 border border-dashed border-slate-800 rounded-2xl bg-slate-900/40">
                            <p className="text-slate-300 text-lg font-medium">Buyer list is empty.</p>
                            <p className="text-slate-500 text-xs mt-1">No buyer accounts found in the database.</p>
                        </div>
                    ) : (
                        /* Table Scroll Wrapper */
                        <div className="overflow-x-auto rounded-xl border border-slate-800/80 shadow-xl">
                            <table className="w-full text-left border-collapse">
                                
                                {/* Table Head */}
                                <thead className="bg-slate-800/90 text-slate-300 text-xs font-semibold uppercase tracking-wider">
                                    <tr>
                                        <th className="py-3.5 px-4 hidden md:table-cell">#</th>
                                        <th className="py-3.5 px-4">Name</th>
                                        <th className="py-3.5 px-4">Email</th>
                                        <th className="py-3.5 px-4 text-right">Action</th>
                                    </tr>
                                </thead>

                                {/* Table Body */}
                                <tbody className="divide-y divide-slate-800/80 text-slate-200 text-sm">
                                    {allBuyers?.map((buyer, i) => (
                                        <tr key={buyer._id} className="hover:bg-slate-800/40 transition-colors duration-150">
                                            
                                            {/* Index */}
                                            <td className="py-3.5 px-4 text-slate-400 font-medium hidden md:table-cell">
                                                {i + 1}
                                            </td>

                                            {/* Buyer Name */}
                                            <td className="py-3.5 px-4 font-semibold text-white whitespace-nowrap">
                                                {buyer.name}
                                            </td>

                                            {/* Buyer Email */}
                                            <td className="py-3.5 px-4 text-slate-400 text-xs whitespace-nowrap">
                                                {buyer.email}
                                            </td>

                                            {/* Actions */}
                                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                                                <button
                                                    onClick={() => setDeletingBuyer(buyer)}
                                                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer"
                                                    title="Delete Buyer"
                                                >
                                                    <HiOutlineTrash className="w-4 h-4" />
                                                </button>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    )}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deletingBuyer && (
                <ConfirmationModal
                    title={`Are you sure you want to delete ${deletingBuyer.name}?`}
                    message={`If you delete ${deletingBuyer.name}, their account will be permanently removed.`}
                    successDeleteAction={successDeleteAction}
                    successDeleteButton="Delete"
                    modalData={deletingBuyer}
                    closeModal={closeModal}
                />
            )}
        </section>
    );
};

export default AllBuyers;