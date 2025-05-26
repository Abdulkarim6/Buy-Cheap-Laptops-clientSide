import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMiniXMark, HiMiniBars3 } from "react-icons/hi2";
import { AuthContext } from '../../Contexts/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch()
    }

   const [toggleIcon, setToggleIcon] = useState(false);
   const [isActive, setActive] = useState(false);
    const homeMenuShow =() => {
        setToggleIcon(current => !current);
        setActive(current => !current);
    }
    const buttonClass = isActive ? 'visible' : 'hidden';

    const menuItems = <React.Fragment>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/blog'>Blog</Link></li>
        {
            user?.uid ?
                <>
                    <li><Link to='/dashboard'>Dashboard</Link></li>
                    <li><button onClick={handleLogOut} to='/signout'>SignOut</button></li>
                </>
                :
                <li><Link to='/signin'>SignIn</Link></li>
        }
    </React.Fragment>

    return (
            <div className="navbar sticky top-0 z-30 bg-black text-white flex justify-between">
                <div className="navbar-start w-full">
                    <div className="relative">
                        <label onClick={() => homeMenuShow()} className="btn btn-ghost md:hidden">
                            {
                            toggleIcon ?
                                <HiMiniXMark className="h-6 w-6 md:h-7 md:w-7" />
                            :
                                <HiMiniBars3 className="h-6 w-6 md:h-7 md:w-7" />
                            }
                        </label>
                        <ul className={`${buttonClass} absolute top-14 text-lg px-3 py-5 w-48 shadow bg-black rounded `}>
                            {menuItems}
                        </ul>
                    </div>
                    <div className='flex'>
                        <strong className="text-xl md:text-2xl lg:text-3xl font-semibold px-0 lg:px-2">Old Laptops Shop</strong>
                        <p className='hidden lg:flex' title=''>{user?.displayName}</p>
                    </div>
                </div>

                <div className="navbar-center hidden md:flex">
                    <ul className="menu menu-horizontal text-xl p-0 ">
                        {menuItems}
                    </ul>
                </div>
                
            </div>
    );
};

export default Navbar;