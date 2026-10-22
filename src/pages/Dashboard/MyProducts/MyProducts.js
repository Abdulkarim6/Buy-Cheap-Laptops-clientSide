import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { HiOutlineTrash, HiOutlineMegaphone, HiOutlineCheckCircle } from 'react-icons/hi2';
import ConfirmationModal from '../../../shared/ConfirmationModal/ConfirmationModal';
import { Link } from 'react-router-dom';

const MyProducts = () => {
    const [deletingProduct, setDeletingProduct] = useState(null);
    const { user } = useContext(AuthContext);

    const closeModal = () => setDeletingProduct(null);

    /* Fetch My Products */
    const url = `https://cheap-laptop-server-side.vercel.app/products?email=${user?.email}`;

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    }); console.log(products);

    /* Delete My Product Operation */
    const successDeleteAction = (product) => {
        fetch(`https://cheap-laptop-server-side.vercel.app/product/${product._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.acknowledged || data.deletedCount > 0) {
                    toast.success(`${product.title} deleted successfully`);
                    refetch();
                } else {
                    toast.error("Failed to delete product");
                }
            })
            .catch(() => toast.error("Something went wrong!"));
    };

    /* Advertise My Product Operation */
    const handleAdvertiseProduct = (product) => {
        const advertisProduct = { ...product, status: "advertised" };
        
        fetch('https://cheap-laptop-server-side.vercel.app/advertiseProduct', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(advertisProduct)
        })
            .then((res) => res.json())
            .then((result) => {
                if (result) {
                    const insertTrue = result[0];
                if (insertTrue.acknowledged) {
                    toast.success(`${product.title} advertised successfully`);
                    refetch();
                }}
            })
            .catch(() => toast.error("Could not advertise product"));
    };

    return (
        <section className="w-full">
            {isLoading ? (
                /* Glassmorphic Loading Spinner */
                <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
                    <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400 text-sm font-medium">Loading your listed products...</p>
                </div>
            ) : (
                <div>
                    {/* Header Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">
                                My Products
                            </h2>
                            <p className="text-slate-400 text-xs mt-0.5">
                                Manage your laptop listings and boost visibility with ads
                            </p>
                        </div>
                        <span className="self-start sm:self-auto text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-full">
                            Total Listed: {products?.length || 0}
                        </span>
                    </div>

                    {/* Empty State */}
                    {!products?.length ? (
                        <div className="text-center py-16 px-4 border border-dashed border-slate-800 rounded-2xl bg-slate-900/40">
                            <p className="text-slate-300 text-lg font-medium">
                                You have no products listed for sale.
                            </p>
                            <p className="text-slate-500 text-xs mt-1">
                                Click 'Add A Product' from the sidebar to list your first laptop.
                            </p>
                        </div>
                    ) : (
                        /* Table Scroll Wrapper */
                        <div className="overflow-x-auto rounded-xl border border-slate-800/80 shadow-xl">
                            <table className="w-full text-left border-collapse">
                                
                                {/* Table Head */}
                                <thead className="bg-slate-800/90 text-slate-300 text-xs font-semibold uppercase tracking-wider">
                                    <tr>
                                        <th className="py-3.5 px-4 hidden md:table-cell">#</th>
                                        <th className="py-3.5 px-4">Product Info</th>
                                        <th className="py-3.5 px-4">Condition</th>
                                        <th className="py-3.5 px-4">Advertise Status</th>
                                        <th className="py-3.5 px-4 text-right">Action</th>
                                    </tr>
                                </thead>

                                {/* Table Body */}
                                <tbody className="divide-y divide-slate-800/80 text-slate-200 text-sm">
                                    {products?.map((product, i) => {
                                        const isAdvertised = product?.status === "advertised";

                                        return (
                                            <tr
                                                key={product?._id}
                                                className="hover:bg-slate-800/40 transition-colors duration-150"
                                            >
                                                {/* Index */}
                                                <td className="py-3.5 px-4 text-slate-400 font-medium hidden md:table-cell">
                                                    {i + 1}
                                                </td>

                                                {/* Product Photo & Name */}
                                                <td className="py-3.5 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-slate-800 overflow-hidden border border-slate-700/60 flex-shrink-0">
                                                            <img src={product?.image} alt={product?.title} className="w-full h-full object-cover" />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <Link to={`/ProductDetails/${product?._id}`}><span className='line-clamp-1 md:line-clamp-none underline transition-colors hover:text-cyan-400'>{product?.title}</span></Link>
                                                            {product?.resalePrice && (
                                                                <span className="text-cyan-400 font-bold text-xs mt-0.5">
                                                                    ৳ {product?.resalePrice}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Condition */}
                                                <td className="py-3.5 px-4 whitespace-nowrap">
                                                        {product?.Condition}
                                                </td>

                                                {/* Advertise Status */}
                                                <td className="py-3.5 px-4 whitespace-nowrap">
                                                    {isAdvertised ? (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                            <HiOutlineCheckCircle className="w-3.5 h-3.5" />
                                                            Advertised
                                                        </span>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleAdvertiseProduct(product)}
                                                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg text-xs font-semibold transition-all cursor-pointer active:scale-95"
                                                        >
                                                            <HiOutlineMegaphone className="w-3.5 h-3.5" />
                                                            Advertise
                                                        </button>
                                                    )}
                                                </td>

                                                {/* Actions */}
                                                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                                                    <button
                                                        onClick={() => setDeletingProduct(product)}
                                                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer" title="Delete Product"
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

            {/* Confirmation Modal */}
            {deletingProduct && (
                <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingProduct.title}, it cannot be undone.`}
                    successDeleteAction={successDeleteAction}
                    successDeleteButton="Delete"
                    modalData={deletingProduct}
                    closeModal={closeModal}
                />
            )}
        </section>
    );
};

export default MyProducts;