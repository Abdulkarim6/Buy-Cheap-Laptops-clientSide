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
            <div className="card bg-base-100 shadow-xl" >
                <figure><img src={image} className='h-56' alt="" /></figure>
                <div className="card-body p-3 !pt-0">
                    <h2 className="card-title text-lg lg:text-3xl font-semibold">
                        {title}
                    </h2>
                    <div className='text-lg'> 
                        <strong><p>Sell Price : {recelPrice}</p></strong>
                     </div>
                    <Link to={`/ProductDetails/${_id}`}><button className="btn btn-outline btn-primary">Product Details</button></Link>
                </div>
            </div>
        </div>

    );
};

export default AdvertisedCard;