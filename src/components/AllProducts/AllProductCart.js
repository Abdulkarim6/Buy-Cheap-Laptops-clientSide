import React from 'react';
import { Link } from 'react-router-dom';

const AllProductCart = ({product, setBookingProduct}) => {

    const { image, title, originalPrice,
        recelPrice, sellerName, usedTime, _id } = product;

    return (
        <div data-aos="fade-down"
                    data-aos-easing="linear"
                    data-aos-duration="1000">
                    <div className="card bg-base-100 shadow-xl" >
                        <figure><img src={image} className='h-56' alt="" /></figure>
                        <div className="card-body p-3 !pt-0">
                            <h2 className="card-title text-base md:text-lg font-semibold">
                                {title}
                            </h2>
                            <strong className='text-lg'><p>Sell Price : {recelPrice}</p></strong>
                            <div className='flex justify-between items-center'> 
                               <Link to={`/ProductDetails/${_id}`}><button className="btn btn-sm md:btn-md btn-outline btn-primary">Details</button></Link>
                               <label onClick={() => setBookingProduct(product)} htmlFor="booking-modal" className="btn btn-sm md:btn-md btn-primary">Book Now</label>
                            </div>
                        </div>
                    </div>
                </div>
    );
};

export default AllProductCart;