import React from 'react';

const ProductCart = ({product, setBookingProduct}) => {
    console.log(product);

    const { id, image, location, title, originalPrice, postDate,
        recelPrice, role, sellerName, usedTime, _id, Phone, Condition, Description } = product;

    return (
         <div className="card bg-base-100 shadow-xl">
            <figure><img src={image} className='h-56' alt="" /></figure>
            <div className="card-body">
                <h2 className="card-title text-3xl">
                    {title}
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <div>
                    <div className='flex justify-between'>
                        <div className='text-semibold'>
                            <strong><p>Sell Price : {product?.recelPrice}</p></strong>
                            <strong><p>Seller name : {sellerName}</p></strong>
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
                    <label onClick={() => setBookingProduct(product)} htmlFor="booking-modal" className="btn btn-primary">Book Now</label>
                </div>
            </div>
        </div>
    );
};

export default ProductCart;