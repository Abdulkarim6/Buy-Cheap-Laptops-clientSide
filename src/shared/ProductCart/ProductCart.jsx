import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AuthContext } from '../../Contexts/AuthProvider';
AOS.init();

const ProductCart = ({ product, setBookingProduct }) => {
    const { image, title, recelPrice: resalePrice, _id } = product;
    const { user } = useContext(AuthContext);
    console.log(product);

    return (
        <div data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1000">
            <div className="card bg-slate-800 shadow-xl p-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 border border-slate-700/80 hover:border-cyan-500/50" >
                <figure className='bg-slate-300'><img src={image} className='h-36 md:h-64' alt="" /></figure>
                <div className="card-body p-2">
                    <h2 className="card-title text-lg md:text-xl font-semibold line-clamp-1">
                        {title}
                    </h2>
                    <div className='text-base md:text-lg'> 
                        <p>Sell Price : <span className='text-cyan-400 font-bold'>৳ {resalePrice}</span></p>
                    </div>
                    <div className='flex justify-between items-center text-sm md:text-base'> 
                      <Link to={`/ProductDetails/${_id}`}><button type='button' className="p-2 bg-cyan-500 rounded-lg border border-slate-600 text-black hover:text-white hover:bg-cyan-800 font-semibold transition-all ease-linear">Details</button></Link>
                     {
                      !user?.adminEmail &&
                      <label onClick={() => setBookingProduct(product)} htmlFor="booking-modal" type="button" className="p-2 bg-cyan-500 rounded-lg border border-slate-600 text-black hover:text-white hover:bg-cyan-800 font-semibold transition-all ease-linear">Book Now</label>
                     }
                   </div>
                </div>
            </div>
        </div>

    );
};

export default ProductCart;