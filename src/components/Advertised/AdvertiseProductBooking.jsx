import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';

const AdvertiseProductBooking = () => {
    const advertiseProductDetails = useLoaderData();
    console.log(advertiseProductDetails,'9');
    const { email, image, location, title, originalPrice, postDate,
        recelPrice, sellerName, usedTime, _id, Phone, Condition, Description } = advertiseProductDetails;

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    const { user } = useContext(AuthContext);

    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const userName = form.name.value;
        const buyerEmail = form.email.value;
        const date = form.date.value;
        const productName = form.productName.value;
        const sellPrice = form.sellPrice.value;
        const phone = form.phone.value;
        const location = form.location.value;

        const buyerBookingProduct = {
            productName,
            productImage: image,
            price: sellPrice,
            sellerEmail: email,

            name: userName,
            buyerEmail,
            phone,
            bookingDate: date,
            location
        }


        fetch('https://cheap-laptop-server-side.vercel.app/buyerBookingProducts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(buyerBookingProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Your Booking Confirmed');
                }
                else {
                    toast.error(data.message)
                }
            })

    }

    return (
        <section className='flex flex-col lg:flex-row md:flex-row bg-base-200'>
            <div className="card w-full lg:w-1/2 bg-base-100 shadow-xl mb-2 p-3">
                <figure><img src={image} className='h-56' alt="" /></figure>
                <h2 className="card-title text-lg lg:text-3xl">
                    {title}
                </h2>
                <div className="flex justify-between items-center">
                    <div className='text-lg font-semibold'>
                        <div className="flex justify-start text-base lg:text-xl">
                            <div><p>Seller name : {sellerName}</p></div>
                            <div><CheckBadgeIcon className="h-6 w-6 text-blue-500"></CheckBadgeIcon></div>
                        </div>
                        <strong><p>Sell Price : {recelPrice}</p></strong>
                        <p>Original price : {originalPrice}</p>
                        <p>used Time : {usedTime}</p>
                    </div>
                    {/* <label onClick={() => productDetails(advertiseProduct)} className="btn btn-primary">Book Now</label> */}
                    <div className='text-lg font-semibold'>
                        <p>Location : {location}</p>
                        <p>Phone : {Phone}</p>
                        <p>Post : {postDate}</p>
                        <p>Condition : {Condition}</p>
                    </div>
                </div>
                <p className='text-base lg:text-xl'>Description : {Description}</p>
            </div>


            <div className="w-full lg:w-1/2 p-5">
                <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
                    <input name='name' type="text" placeholder="Your Name" className="input w-full borderd" />
                    <input name='email' type="text" defaultValue={user?.email} placeholder="Email Address" className="input w-full borderd" disabled />
                    <input name='date' type="text" disabled value={date} className="input w-full  borderd " />
                    <input name='productName' type="text" disabled value={title} className="input w-full  borderd " />
                    <input name='sellPrice' type="text" disabled value={recelPrice} className="input w-full  borderd " />
                    <input name='phone' type="text" placeholder="Phone Number" className="input w-full borderd" />
                    <input name='location' type="text" placeholder="Your Location" className="input w-full borderd" />
                    <br />
                    <input type="submit" value="Book Now" className='btn btn-accent ' />
                </form>
            </div>
        </section>
    );
};

export default AdvertiseProductBooking;