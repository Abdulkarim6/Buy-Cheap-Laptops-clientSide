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
            .catch()
    }

   const [toggleIcon, setToggleIcon] = useState(false);
   const [isActive, setActive] = useState(false);
    const homeMenuShow =() => {
        setToggleIcon(current => !current);
        setActive(current => !current);
    }
    const buttonClass = isActive ? 'visible' : 'hidden';

    const { data: categories = [] } = useQuery({
            queryKey: ['categories'],
            queryFn: async () => {
                const res = await fetch('http://localhost:5000/categories');
                const data = await res.json();
                return data;
    
            }
    });

    const [selectedCategory, setSelectedCategory] = useState('');
    console.log(selectedCategory);
    
    const handleCategoryChange = (event) => {
      setSelectedCategory(event.target.value);
    };

    let searchBoxContent = 
                <form className='p-0 w-[86%] rounded-md flex'>
                  <select className='w-full text-black rounded-none !rounded-l-md' required
                  onChange={handleCategoryChange}
                  value={selectedCategory} 
                  >
                    <option value="" disabled hidden>Select a category!</option>
                    {
                    categories?.map(category => <option key={category?._id} value={category?.id}>{category?.name}</option>)
                    } 
                 </select>
                 <Link to={`/products/${selectedCategory}`}>
                    <button disabled={!selectedCategory} type="button" className='btn btn-sm md:btn-md btn-primary normal-case rounded-none !rounded-r-md'>
                      Search
                    </button>
                 </Link>
                </form>


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
            <div className="navbar sticky top-0 z-30 bg-sky-500 font-medium flex flex-col">
               <div className='flex w-full'>
                {/*list show only for small device*/}
                <div className="navbar-start flex items-center w-full lg:w-[30%]">
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
                        <strong className="text-xl md:text-2xl lg:text-3xl font-semibold px-0 lg:px-2">Used Laptops Shop</strong>
                        <p className='hidden lg:flex' title=''>{user?.displayName}</p>
                    </div>
                </div>
                
                {/*Category search box div for large device*/}
                <div className='w-[30%] hidden lg:flex items-center justify-center'>
                    {searchBoxContent} 
                </div>

                {/*list show for medium and large devices*/}
                <div className="navbar-end hidden w-full md:flex lg:w-[40%]"> 
                    <ul className="menu menu-horizontal text-xl p-0 ">
                        {menuItems}
                    </ul>
                </div>
               </div>  
                 {/*Category search box div for small and medium device*/}
                <div className='w-full flex lg:hidden items-center justify-center'>
                    {searchBoxContent} 
                </div>
            </div>
    );
};

export default Navbar;