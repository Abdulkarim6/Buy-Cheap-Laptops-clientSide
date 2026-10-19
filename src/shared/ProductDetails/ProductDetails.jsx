import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import BookingForm from '../../components/BookingModal/BookingForm';

const ProductDetails = () => {
    const ProductDetails = useLoaderData();
    const { email, image, location, title, originalPrice, postDate,
        recelPrice, sellerName, usedTime, Phone, Condition, Description } = ProductDetails;
 
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    const { user } = useContext(AuthContext);

    const srcLocation = useLocation();
    const navigate = useNavigate();

    const handleBooking = event => {
        event.preventDefault();

        if (!user) {
            navigate("/signIn", { state: { from: srcLocation } });
            return;
        }

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
        <section className='flex flex-col gap-3 px-5 lg:flex-row md:flex-row p-2'>
            <div className="card w-full md:w-3/5 lg:w-1/2 bg-slate-800 shadow-xl mb-2 p-3">
                <figure className='bg-slate-300 mb-2'><img src={image} className='h-56' alt="" /></figure>
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
                <BookingForm
                 bookingProduct={ProductDetails}
                 handleBooking={handleBooking}
                 user={user}
                 date={date}
                />
            </div>
        </section>
    );
};

export default ProductDetails;