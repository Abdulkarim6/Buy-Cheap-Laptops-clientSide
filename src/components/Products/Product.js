import React from 'react';

const Product = ({ product, setBookingProduct }) => {
    // console.log(product);

    const { id, image, location, name, originalPrice, postDate, recelPrice, role, sellerName, usedTime, _id } = product;

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} className='h-56' alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title text-3xl">
                    {name}
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <div className='text-semibold'>
                    <p>Sell Price : {recelPrice}</p>
                    <p>Original price : {originalPrice}</p>
                    <p>Seller name : {sellerName}</p>
                    <p>Post : {postDate}</p>
                    <p>Location : {location}</p>
                    <p>used Time : {usedTime}</p>
                </div>
                <div className="card-actions justify-end">
                    <label onClick={() => setBookingProduct(product)} htmlFor="booking-modal" className="btn btn-primary">Book Now</label>
                </div>
            </div>
        </div>
    );
};

export default Product;