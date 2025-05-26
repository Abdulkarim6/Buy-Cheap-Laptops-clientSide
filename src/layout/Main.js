import React from 'react';
import Footer from '../shared/Footer/Footer';
import { Outlet } from "react-router-dom";
import Navbar from '../shared/Navbar/Navbar';

const Main = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <div className='flex-1'>
                <Navbar></Navbar>
                <Outlet></Outlet>
            </div>
            <div>
               <Footer></Footer>
            </div>
        </div>
    );
};

export default Main;