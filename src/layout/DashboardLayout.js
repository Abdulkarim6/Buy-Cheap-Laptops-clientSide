import React, { useContext, useState } from 'react';
import { HiMiniXMark, HiMiniBars3 } from "react-icons/hi2";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from '../Contexts/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import useSeller from '../hooks/useSeller';
import Footer from '../shared/Footer/Footer';
import Navbar from '../shared/Navbar/Navbar';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email)
    const [isSeller] = useSeller(user?.email)
    const [deshboardToggleIcon, setdeshboardToggleIcon] = useState(false);
    const linkClass ='btn btn-ghost w-[80%] justify-start'
    
     const dashboardMenuShow =() => {
         setdeshboardToggleIcon(current => !current);
     }
    //The sideNav is default only for large devices; for small and medium devices, it will be controlled by the dashboardMenuShow function.
    const sideNav = deshboardToggleIcon ? "left-0 transition-all ease duration-500" : "lg:left-0 -left-[100%]";

    return (
            <div className="flex flex-col min-h-screen bg-purple-400">
               {/* dashboard navbar */}
               <Navbar></Navbar>


                <div className="w-full flex flex-row flex-1 justify-between">

                    {/* dashboard sidebar */}
                             {/* <ul className={`${sideNav} lg:block absolute lg:w-[25%] md:w-[45%] w-[60%] p-4 bg-purple-300 border-e-2 border-b-2 border-white font-medium`}> */}
                    <ul className={`bg-purple-300 ${sideNav} lg:w-[25%] w-[50%] lg:static absolute top-16 md:top-[70px] bottom-0 border-r-2 border-b-2 border-white`}>
                       
                                <li><Link className={linkClass} to='/dashboard'>My Orders</Link></li>
                            {
                            isSeller && <>
                                <li><Link className={linkClass} to="/dashboard/myProducts">My Products</Link></li>
                                <li><Link className={linkClass} to="/dashboard/addProduct">Add A Product</Link></li>
                            </>
                        }
                        {
                            isAdmin && <>
                                <li><Link className={linkClass} to="/dashboard/allSellers">All Selers</Link></li>
                                <li><Link className={linkClass} to='/dashboard/allBuyers'>All Buyers</Link></li>
                            </>
                        }
                    </ul>
                    
                    {/* dashboard content */}
                    <div className='w-full lg:w-[75%] flex-1'>

                        {/* dashboard icon */}
                        {/* <div className='fixed lg:hidden top-16 right-0 bg-purple-400' onClick={() => dashboardMenuShow()}> */}
                        <div className='fixed lg:hidden top-16 right-0 bg-purple-400' onClick={() => dashboardMenuShow()}>
                            {
                               <label htmlFor="" className="btn btn-ghost">
                                        {
                                        deshboardToggleIcon ?
                                            <HiMiniXMark className="h-6 w-6 md:h-7 md:w-7" />
                                        :
                                            <HiMiniBars3 className="h-6 w-6 md:h-7 md:w-7" />
                                        }
                               </label>
                            }
                        </div>
                    
                        <Outlet></Outlet>
                    </div>

                </div>


                {/* dashboard footer */}
                {/* <div className='sticky top-[100vh]'> */}
                <div className='z-10'>
                   <Footer></Footer>
                </div>
            </div>
            
    );
};

export default DashboardLayout;