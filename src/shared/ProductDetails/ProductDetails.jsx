import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';

const ProductDetails = () => {
    const ProductDetails = useLoaderData();
    console.log(ProductDetails,'9');
    const { email, image, location, title, originalPrice, postDate,
        recelPrice, sellerName, usedTime, _id, Phone, Condition, Description } = ProductDetails;

    //console.log(_id);
    

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


        fetch('http://localhost:5000/buyerBookingProducts', {
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
        <section className='flex flex-col lg:flex-row md:flex-row p-2'>
            <div className="card w-full md:w-3/5 lg:w-1/2 bg-base-100 shadow-xl mb-2 p-3">
                <figure><img src={image} className='h-56' alt="" /></figure>
                <h2 className="card-title text-xl lg:text-3xl">
                    {title}
                </h2>
                <div className="flex justify-between items-center">
                    <div className='md:font-semibold'>
                        <div className="flex justify-start text-base lg:text-xl">
                            <div><p>Seller : {sellerName}</p></div>
                            <div><CheckBadgeIcon className="h-6 w-6 text-blue-500"></CheckBadgeIcon></div>
                        </div>
                        <strong><p>Sell Price : {recelPrice}</p></strong>
                        <p>Original price : {originalPrice}</p>
                        <p>used Time : {usedTime}</p>
                    </div>
                    <div className='text-base md:text-lg md:font-semibold'>
                        <p>Location : {location}</p>
                        <p>Phone : {Phone}</p>
                        <p>Post : {postDate}</p>
                        <p>Condition : {Condition}</p>
                    </div>
                </div>
                <p className='text-base lg:text-xl mt-1'><strong>Note : </strong>{Description}</p>
            </div>


            <div className="w-full md:w-2/5 lg:w-1/2 px-2 pt-0 md:p-2">
                <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
                    <input name='name' type="text" placeholder="Your Name" className="input w-full borderd" />
                    <input name='email' type="text" defaultValue={user?.email} placeholder="Email Address" className="input w-full borderd" disabled />
                    <input name='date' type="text" disabled value={date} className="input w-full  borderd " />
                    <input name='productName' type="text" disabled value={title} className="input w-full  borderd " />
                    <input name='sellPrice' type="text" disabled value={recelPrice} className="input w-full  borderd " />
                    <input name='phone' type="text" placeholder="Phone Number" className="input w-full borderd" />
                    <input name='location' type="text" placeholder="Your Location" className="input w-full borderd" />
                    <input type="submit" value="Book Now" className="btn btn-primary mt-3" />
                </form>
            </div>
        </section>
    );
};

export default ProductDetails;