import React, { useContext, useState } from 'react';
import { HiMiniXMark, HiMiniBars3 } from "react-icons/hi2";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from '../Contexts/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import useSeller from '../hooks/useSeller';
import Footer from '../shared/Footer/Footer';
import Navbar from '../shared/Navbar/Navbar';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    const [isSeller] = useSeller(user?.email);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
    const closeSidebar = () => setIsSidebarOpen(false);

    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
            isActive
                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-md shadow-cyan-500/5 font-semibold"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
        }`;

    return (
        <div className="flex flex-col min-h-screen text-slate-100">
            {/* Navbar */}
            <Navbar />

            {/* Dashboard Container */}
            <div className="relative flex flex-1 w-full mx-auto px-2 md:px-3 py-6 md:py-8 gap-4">
                
                {/* Mobile Floating Toggle Button (Thumb-friendly) */}
                <button
                    onClick={toggleSidebar}
                    aria-label="Toggle Dashboard Menu"
                    className="lg:hidden fixed bottom-6 right-6 z-50 p-3.5 bg-cyan-500 text-slate-950 rounded-full shadow-xl shadow-cyan-500/30 hover:bg-cyan-400 active:scale-95 transition-all"
                >
                    {isSidebarOpen ? (
                        <HiMiniXMark className="h-6 w-6" />
                    ) : (
                        <HiMiniBars3 className="h-6 w-6" />
                    )}
                </button>

                {/* Mobile Backdrop / Overlay */}
                {isSidebarOpen && (
                    <div
                        onClick={closeSidebar}
                        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-30 lg:hidden transition-opacity"
                    />
                )}

                {/* Dashboard Sidebar */}
                <aside
                    className={`
                        fixed lg:static top-20 left-0 bottom-0 z-40 lg:z-auto w-64 sm:w-72 lg:w-64 p-5
                        bg-slate-800/40 border border-slate-800 rounded-2xl backdrop-blur-md
                        flex flex-col justify-between transition-transform duration-300 ease-in-out
                        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                    `}
                >
                    <div className="space-y-6">
                        {/* Header Info */}
                        <div className="pb-3 border-b border-slate-800">
                            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Dashboard Navigation
                            </h3>
                            {user?.displayName && (
                                <p className="text-sm font-medium text-cyan-400 mt-1 truncate">
                                    {user.displayName}
                                </p>
                            )}
                        </div>

                        {/* Navigation Links */}
                        <nav className="space-y-1.5">
                            {/* Buyer / Default Route */}
                            <div>
                                <NavLink
                                    to="/dashboard" end onClick={closeSidebar} className={navLinkClass} > My Orders
                                </NavLink>
                            </div>

                            {/* Seller Section */}
                            {isSeller && (
                                <div className="pt-3 space-y-1.5 border-t border-slate-800/60 mt-3">
                                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-4 block mb-1">
                                        Seller Panel
                                    </span>
                                    <NavLink
                                        to="/dashboard/myProducts" onClick={closeSidebar} className={navLinkClass} > My Products
                                    </NavLink>
                                    <NavLink
                                        to="/dashboard/addProduct" onClick={closeSidebar} className={navLinkClass} > Add A Product
                                    </NavLink>
                                </div>
                            )}

                            {/* Admin Section */}
                            {isAdmin && (
                                <div className="pt-3 space-y-1.5 border-t border-slate-800/60 mt-3">
                                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-4 block mb-1">
                                        Admin Panel
                                    </span>
                                    <NavLink
                                        to="/dashboard/allSellers" onClick={closeSidebar} className={navLinkClass} > All Sellers
                                    </NavLink>
                                    <NavLink
                                        to="/dashboard/allBuyers" onClick={closeSidebar} className={navLinkClass} > All Buyers
                                    </NavLink>
                                </div>
                            )}
                        </nav>
                    </div>

                    {/* Sidebar Footer */}
                    <div className="pt-4 border-t border-slate-800 text-xs text-slate-500 text-center">
                        Used Laptops Shop
                    </div>
                </aside>

                {/* Main Dashboard Content Area */}
                <main className="flex-1 w-full bg-slate-800/40 border border-slate-800 rounded-2xl p-4 md:p-8 backdrop-blur-md min-h-[70vh]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;