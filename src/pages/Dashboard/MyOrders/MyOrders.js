import React, { useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { HiOutlineCheckCircle, HiOutlineClock, HiOutlineTrash } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    
    const url = `https://cheap-laptop-server-side.vercel.app/myOrderProducts?email=${user?.email}`;

    const { data: myOrderProducts = [], isLoading } = useQuery({
        queryKey: ['myOrderProducts', user?.email],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            return data;
        }
    });

    return (
        <section className="w-full">
            {isLoading ? (
                /* Glassmorphic Loading Spinner */
                <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
                    <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400 text-sm font-medium">Loading your orders...</p>
                </div>
            ) : (
                <div>
                    {/* Header Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">
                                My Orders
                            </h2>
                            <p className="text-slate-400 text-xs mt-0.5">
                                Manage and track your recent laptop bookings
                            </p>
                        </div>
                        <span className="self-start sm:self-auto text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-full">
                            Total Items: {myOrderProducts?.length || 0}
                        </span>
                    </div>

                    {/* Empty State Check */}
                    {!myOrderProducts?.length ? (
                        <div className="text-center py-16 px-4 border border-dashed border-slate-800 rounded-2xl bg-slate-900/40">
                            <p className="text-slate-300 text-lg font-medium">
                                You haven't booked any products yet.
                            </p>
                            <p className="text-slate-500 text-xs mt-1">
                                Explore our laptop collection to place your first order.
                            </p>
                        </div>
                    ) : (
                        /* Table Scroll Wrapper (Mobile-friendly) */
                        <div className="overflow-x-auto rounded-xl border border-slate-800/80 shadow-xl">
                            
                            <table className="w-full text-left border-collapse">
                                
                                {/* Table Head */}
                                <thead className="bg-slate-800/90 text-slate-300 text-xs font-semibold uppercase tracking-wider">
                                    <tr>
                                        <th className="py-3.5 px-4 hidden md:table-cell">#</th>
                                        <th className="py-3.5 px-4">Product</th>
                                        <th className="py-3.5 px-4 hidden md:table-cell">Price</th>
                                        <th className="py-3.5 px-4 hidden md:table-cell">Date</th>
                                        <th className="py-3.5 px-4">Status</th>
                                        <th className="py-3.5 px-4 text-right">Action</th>
                                    </tr>
                                </thead>

                                {/* Table Body */}
                                <tbody className="divide-y divide-slate-800/80 text-slate-200 text-sm">
                                    {myOrderProducts?.map((item, index) => {
                                        const isPaid = item?.status?.toLowerCase() === "paid";

                                        return (
                                            <tr
                                                key={item._id}
                                                className="hover:bg-slate-800/40 transition-colors duration-150"
                                            >
                                                {/* Index */}
                                                <td className="py-3.5 px-4 text-slate-400 font-medium hidden md:table-cell">
                                                    {index + 1}
                                                </td>

                                                {/* Product Info */}
                                                <td className="py-3.5 px-4">
                                                    <div className="flex items-center gap-2 md:gap-3">
                                                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-slate-800 overflow-hidden border border-slate-700/60 flex-shrink-0">
                                                            <img
                                                                src={item.productImage}
                                                                alt={item.productName}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <p className="font-semibold text-white">
                                                            <Link to={`/ProductDetails/${item?.productId}`}><span className='line-clamp-1 md:line-clamp-none underline transition-colors hover:text-cyan-400'>{item.productName}</span></Link>
                                                            <span className='md:hidden text-cyan-400 whitespace-nowrap text-xs'>৳ {item.price}</span>
                                                        </p>
                                                    </div>
                                                </td>

                                                {/* Price */}
                                                <td className="py-3.5 px-4 text-cyan-400 font-bold whitespace-nowrap hidden md:table-cell">
                                                    ৳ {item.price}
                                                </td>

                                                {/* Date */}
                                                <td className="py-3.5 px-4 text-slate-400 text-xs whitespace-nowrap hidden md:table-cell">
                                                    {item.bookingDate}
                                                </td>

                                                {/* Status Badge */}
                                                <td className="py-3.5 px-4 whitespace-nowrap">
                                                    {isPaid ? (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                            <HiOutlineCheckCircle className="w-3.5 h-3.5" />
                                                            Paid
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                                            <HiOutlineClock className="w-3.5 h-3.5" /> Unpaid
                                                        </span>
                                                    )}
                                                </td>

                                                {/* Actions */}
                                                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                                                    <div className="flex items-center justify-end gap-2">
                                                        {!isPaid && (
                                                            <button className="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition-all active:scale-95 cursor-pointer">
                                                                Pay Now
                                                            </button>
                                                        )}
                                                        <button
                                                            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer"
                                                            title="Delete Order"
                                                        >
                                                            <HiOutlineTrash className="w-4 h-4" />
                                                        </button>
                                                    </div>
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
        </section>
    );
};

export default MyOrders;