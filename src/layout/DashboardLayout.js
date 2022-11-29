import React, { useContext } from 'react';
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from '../Contexts/AuthProvider';
import Footer from '../shared/Footer/Footer';
import Navbar from '../shared/Navbar/Navbar';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <Navbar></Navbar>
            {/* <label htmlFor="Dashboard-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label> */}

            <div className="drawer drawer-mobile">
                <input id="Dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">

                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="Dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">

                        <li><Link to='/dashboard/addOrders'>My Orders-Buyer</Link></li>
                        <li><Link to="/dashboard">My Products-seller</Link></li>
                        <li><Link to="/dashboard/addProduct">Add A Product-seller</Link></li>
                        <li><Link to="/dashboard/allSellers">All Selers-admin</Link></li>
                        <li><Link to='/dashboard/allBuyers'>All Buyers-admin</Link></li>
                        <li><Link >Reported Items-admin</Link></li>
                        <p>check@gmail.com</p>


                    </ul>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;