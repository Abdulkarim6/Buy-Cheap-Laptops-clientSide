import React from 'react';
import Footer from '../shared/Footer/Footer';
import { Outlet } from "react-router-dom";
import Navbar from '../shared/Navbar/Navbar';

const Main = () => {
    return (
        <div className='min-h-screen'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <div className=''>
              <Footer></Footer>
            </div>
        </div>
    );
};

export default Main;