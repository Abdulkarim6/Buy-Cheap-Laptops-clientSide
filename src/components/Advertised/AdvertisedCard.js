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
                <div className="card-body">
                    <h2 className="card-title text-lg lg:text-3xl">
                        {title}
                    </h2>
                    <div className='text-lg font-semibold'>
                        <div className="flex justify-start text-base lg:text-xl">
                            <div><p>Seller name : {sellerName}</p></div>
                            <div><CheckBadgeIcon className="h-6 w-6 text-blue-500"></CheckBadgeIcon></div>
                        </div>
                        <strong><p>Sell Price : {recelPrice}</p></strong>
                        <p>Original price : {originalPrice}</p>
                        <p>used Time : {usedTime}</p>
                    </div>
                    <Link to={`/advertiseProductDetails/${_id}`}><button className="btn btn-primary">Product Details</button></Link>
                </div>
            </div>
        </div>

    );
};

export default AdvertisedCard;