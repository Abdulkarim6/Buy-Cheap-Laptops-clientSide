import React from 'react';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';

const AdvertisedCard = ({ advertiseProduct }) => {

    const { image, location, title, originalPrice, postDate,
        recelPrice, sellerName, usedTime, _id, Phone, Condition, Description } = advertiseProduct;

    return (
        
            <div className="card bg-base-100 shadow-xl">
                <figure><img src={image} className='h-56' alt="" /></figure>
                <div className="card-body">
                    <h2 className="card-title text-3xl">
                        {title}
                    </h2>
                    <div>
                        <div className='flex justify-between'>
                            <div className='text-semibold'>
                            <h2 className="card-title text-xl">
                                <p>Seller name : {sellerName} </p>
                                <CheckBadgeIcon className="h-6 w-6 text-blue-500"></CheckBadgeIcon>
                            </h2>
                                <strong><p>Sell Price : {recelPrice}</p></strong>
                                <p>Location : {location}</p>
                                <p>Phone : {Phone}</p>
                            </div>
                            <div className='text-semibold'>
                                <p>Original price : {originalPrice}</p>
                                <p>Post : {postDate}</p>
                                <p>used Time : {usedTime}</p>
                                <p>Condition : {Condition}</p>
                            </div>
                        </div>
                        <p>Description : {Description}</p>
                    </div>
                    <div className="card-actions justify-end">
                        {/* <label onClick={() => setBookingProduct(product)} htmlFor="booking-modal" className="btn btn-primary">Book Now</label> */}
                    </div>
                </div>
            </div>
       
    );
};

export default AdvertisedCard;