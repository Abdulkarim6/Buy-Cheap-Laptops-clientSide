import React from 'react';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

const AdvertisedCard = ({ advertiseProduct }) => {

    const { image, title, originalPrice,
        recelPrice, sellerName, usedTime, _id } = advertiseProduct;

    return (
        <div data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1000">
            <div className="card bg-slate-800 shadow-xl p-1" >
                <figure className='bg-slate-300'><img src={image} className='h-36 md:h-64' alt="" /></figure>
                <div className="card-body p-2">
                    <h2 className="card-title text-lg md:text-xl font-semibold">
                        {title}
                    </h2>
                    <div className='text-base md:text-lg'> 
                        <p>Sell Price : <span className='text-cyan-400 font-bold'>৳ {recelPrice}</span></p>
                     </div>
                    <Link to={`/ProductDetails/${_id}`}><button type='button' className="p-2 bg-cyan-500 rounded-lg border border-slate-600 text-black hover:text-white hover:bg-cyan-800 font-semibold transition-all ease-linear"> Details</button></Link>
                </div>
            </div>
        </div>

    );
};

export default AdvertisedCard;