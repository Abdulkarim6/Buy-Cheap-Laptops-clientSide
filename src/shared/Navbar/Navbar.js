import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMiniXMark, HiMiniBars3 } from "react-icons/hi2";
import { AuthContext } from '../../Contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch((err) => console.error(err));
    };

    const [toggleIcon, setToggleIcon] = useState(false);
    const [isActive, setActive] = useState(false);

    const homeMenuShow = () => {
        setToggleIcon(current => !current);
        setActive(current => !current);
    };

    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('https://cheap-laptop-server-side.vercel.app/categories');
            const data = await res.json();
            return data;
        }
    });

    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    // Dark-themed Category & Search Form
    const searchBoxContent = (
        <form className='p-0 w-full max-w-md rounded-lg flex items-center shadow-sm'>
            <select 
                className='w-full bg-slate-800 text-slate-200 border border-slate-700 rounded-l-md px-3 py-2 text-sm focus:outline-none focus:border-cyan-500' 
                required
                onChange={handleCategoryChange}
                value={selectedCategory} 
            >
                <option value="" disabled hidden>Select a category!</option>
                {
                    categories?.map(category => (
                        <option key={category?._id} value={category?.id} className="bg-slate-800 text-slate-200">
                            {category?.name}
                        </option>
                    ))
                } 
            </select>
            <Link to={`/products/${selectedCategory}`}>
                <button 
                    disabled={!selectedCategory} 
                    type="button" 
                    className='bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 disabled:text-slate-500 text-slate-950 font-bold text-sm px-4 py-2 rounded-r-md transition-all duration-200'
                >
                    Search
                </button>
            </Link>
        </form>
    );

    // Clean Navbar Links with Dark Theme & Cyan Accent
    const menuItems = (
        <React.Fragment>
            <li>
                <Link to='/' className="text-slate-300 hover:text-cyan-400 font-medium transition">Home</Link>
            </li>
            <li>
                <Link to='/blog' className="text-slate-300 hover:text-cyan-400 font-medium transition">Blog</Link>
            </li>
            {
                user?.uid ? (
                    <>
                        <li>
                            <Link to='/dashboard' className="text-slate-300 hover:text-cyan-400 font-medium transition">Dashboard</Link>
                        </li>
                        <li>
                            <button onClick={handleLogOut} className="text-slate-300 hover:text-red-400 font-medium transition">
                                SignOut
                            </button>
                        </li>
                    </>
                ) : (
                    <li>
                        <Link to='/signin' className='bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-1.5 rounded-md font-bold transition-all duration-200 shadow-md'>
                            SignIn
                        </Link>
                    </li>
                )
            }
        </React.Fragment>
    );

    return (
        <div className="navbar sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-600 px-4 lg:px-8 py-3 flex flex-col gap-3 lg:gap-0">
            <div className='flex items-center justify-between w-full'>
                
                {/* Brand Logo & Mobile Toggle */}
                <div className="flex items-center gap-2 lg:w-[30%]">
                    <div className="relative md:hidden">
                        <button onClick={homeMenuShow} className="btn btn-ghost btn-circle text-slate-200">
                            {
                                toggleIcon ?
                                    <HiMiniXMark className="h-6 w-6" />
                                :
                                    <HiMiniBars3 className="h-6 w-6" />
                            }
                        </button>
                        {/* Mobile Menu Popup */}
                        {
                            isActive && (
                                <ul className="absolute left-0 top-12 text-base p-4 w-52 shadow-xl bg-slate-800 border border-slate-700 text-slate-200 rounded-xl flex flex-col gap-2 z-50">
                                    {menuItems} 
                                </ul>
                            )
                        }
                    </div>

                    <Link to="/" className='flex items-center gap-2'>
                        <strong className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight">
                            UsedLaptops<span className="text-slate-100">Shop</span>
                        </strong>
                        {user?.displayName && (
                            <span className='hidden xl:inline-block text-xs font-normal text-slate-400 bg-slate-800 px-2 py-1 rounded-full border border-slate-700' title={user?.displayName}>
                                {user?.displayName}
                            </span>
                        )}
                    </Link>
                </div>
                
                {/* Category search box for Large Devices */}
                <div className='hidden lg:flex items-center justify-center w-[40%]'>
                    {searchBoxContent} 
                </div>

                {/* Nav Menu for Desktop */}
                <div className="hidden md:flex lg:w-[30%] justify-end"> 
                    <ul className="menu menu-horizontal items-center gap-2 p-0">
                        {menuItems}
                    </ul>
                </div>
            </div>  

            {/* Category search box for Small and Medium Devices */}
            {/* <div className='w-full flex lg:hidden items-center justify-center pt-1'>
                {searchBoxContent} 
            </div> */}
        </div>
    );
};

export default Navbar;