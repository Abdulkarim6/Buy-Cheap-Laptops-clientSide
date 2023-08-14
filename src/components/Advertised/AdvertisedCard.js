import React from 'react';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';

const AdvertisedCard = ({ advertiseProduct }) => {

    const { image, location, title, originalPrice, postDate,
        recelPrice, sellerName, usedTime, _id, Phone, Condition, Description } = advertiseProduct;

    return (

        <div className="card bg-base-100 shadow-xl">
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
                <label htmlFor="booking-modal" className="btn btn-primary">Book Now</label>
            </div>
        </div>

    );
};

export default AdvertisedCard;


{/* <label onClick={() => setBookingProduct(product)} htmlFor="booking-modal" className="btn btn-primary">Book Now</label> */ }


{/* <div className='text-semibold'>
    <p>Location : {location}</p>
    <p>Phone : {Phone}</p>
    <p>Post : {postDate}</p>
    <p>Condition : {Condition}</p>
    <p>Description : {Description}</p>
</div> */}