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
            <div className="drawer drawer-mobile">
                <input id="Dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side bg-base-200 text-base-content">
                    <label htmlFor="Dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">

                        <li><Link to="/dashboard/allusers">My Products</Link></li>
                        <li><Link to="/dashboard/addDoctor">Add A Product</Link></li>
                        <li><Link to="/dashboard/manageDoctors">My Buyers</Link></li>


                    </ul>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;