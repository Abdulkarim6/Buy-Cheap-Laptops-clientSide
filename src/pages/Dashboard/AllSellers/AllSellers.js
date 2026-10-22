import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { HiOutlineTrash, HiOutlineCheckBadge } from 'react-icons/hi2';
import ConfirmationModal from '../../../shared/ConfirmationModal/ConfirmationModal';

const AllSellers = () => {
    const [deletingSeller, setDeletingSeller] = useState(null);
    const closeModal = () => setDeletingSeller(null);

    const role = 'seller';
    const url = `https://cheap-laptop-server-side.vercel.app/allSellers?role=${role}`;

    // Fetch all sellers with JWT token
    const { data: allSellers = [], isLoading, refetch } = useQuery({
        queryKey: ['allSellers', role],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            return await res.json();
        }
    });

    // Delete seller with modal confirmation
    const successDeleteAction = (seller) => {
        fetch(`https://cheap-laptop-server-side.vercel.app/seller/${seller._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.acknowledged || data.deletedCount > 0) {
                    toast.success(`${seller.name} deleted successfully`);
                    refetch();
                } else {
                    toast.error("Failed to delete seller");
                }
            })
            .catch(() => toast.error("Something went wrong!"));
    };

    // Verify seller action
    const handleMakeVerify = (id) => {
        fetch(`https://cheap-laptop-server-side.vercel.app/seller/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    toast.success('Seller verified successfully');
                    refetch();
                }
            })
            .catch(() => toast.error("Failed to verify seller"));
    };

    return (
        <section className="w-full">
            {isLoading ? (
                /* Glassmorphic Loading Spinner */
                <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
                    <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400 text-sm font-medium">Loading sellers list...</p>
                </div>
            ) : (
                <div>
                    {/* Header Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">
                                All Sellers
                            </h2>
                            <p className="text-slate-400 text-xs mt-0.5">
                                Manage registered sellers and verify account authenticity
                            </p>
                        </div>
                        <span className="self-start sm:self-auto text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-full">
                            Total Sellers: {allSellers?.length || 0}
                        </span>
                    </div>

                    {/* Empty State */}
                    {!allSellers?.length ? (
                        <div className="text-center py-16 px-4 border border-dashed border-slate-800 rounded-2xl bg-slate-900/40">
                            <p className="text-slate-300 text-lg font-medium">Seller list is empty.</p>
                            <p className="text-slate-500 text-xs mt-1">No seller accounts found in the database.</p>
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
                                        <th className="py-3.5 px-4">Verification</th>
                                        <th className="py-3.5 px-4 text-right">Action</th>
                                    </tr>
                                </thead>

                                {/* Table Body */}
                                <tbody className="divide-y divide-slate-800/80 text-slate-200 text-sm">
                                    {allSellers?.map((seller, i) => {
                                        const isVerified = seller?.status === 'verify';

                                        return (
                                            <tr key={seller._id} className="hover:bg-slate-800/40 transition-colors duration-150">
                                                
                                                {/* Index */}
                                                <td className="py-3.5 px-4 text-slate-400 font-medium hidden md:table-cell">
                                                    {i + 1}
                                                </td>

                                                {/* Seller Name */}
                                                <td className="py-3.5 px-4 font-semibold text-white whitespace-nowrap">
                                                    {seller.name}
                                                </td>

                                                {/* Seller Email */}
                                                <td className="py-3.5 px-4 text-slate-400 text-xs whitespace-nowrap">
                                                    {seller.email}
                                                </td>

                                                {/* Verification Badge / Button */}
                                                <td className="py-3.5 px-4 whitespace-nowrap">
                                                    {isVerified ? (
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                                            <HiOutlineCheckBadge className="w-4 h-4 text-blue-400" />
                                                            Verified
                                                        </span>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleMakeVerify(seller._id)}
                                                            className="px-3 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg text-xs font-semibold transition-all cursor-pointer active:scale-95"
                                                        >
                                                            Verify Seller
                                                        </button>
                                                    )}
                                                </td>

                                                {/* Actions */}
                                                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                                                    <button
                                                        onClick={() => setDeletingSeller(seller)}
                                                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer"
                                                        title="Delete Seller"
                                                    >
                                                        <HiOutlineTrash className="w-4 h-4" />
                                                    </button>
                                                </td>

                                            </tr>
                                        );
                                    })}
                                </tbody>

                            </table>
                        </div>
                    )}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deletingSeller && (
                <ConfirmationModal
                    title={`Are you sure you want to delete ${deletingSeller.name}?`}
                    message={`If you delete ${deletingSeller.name}, their account will be permanently removed.`}
                    successDeleteAction={successDeleteAction}
                    successDeleteButton="Delete"
                    modalData={deletingSeller}
                    closeModal={closeModal}
                />
            )}
        </section>
    );
};

export default AllSellers;