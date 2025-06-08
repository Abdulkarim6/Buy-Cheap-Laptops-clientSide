import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Contexts/AuthProvider';

const BookingModal = ({ bookingProduct, setBookingProduct }) => {
    const { id, title, recelPrice, email, image } = bookingProduct;
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
                    setBookingProduct(null)
                }
                else {
                    toast.error(data.message)
                }
            })

    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal ">
                <div className="modal-box relative border-2 border-solid border-primary !rounded-none">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
                        <input name='name' type="text" placeholder="Your Name" className="input w-full border-2 border-solid" />
                        <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full" />
                        <input name='email' type="text" defaultValue={user?.email} placeholder="Email Address" className="input w-full borderd" disabled />
                        <input name='date' type="text" value={date} className="input w-full  borderd " disabled/>
                        <input name='productName' type="text" value={title} className="input w-full  borderd " disabled/>
                        <input name='sellPrice' type="text" value={recelPrice} className="input w-full  borderd " disabled/>
                        <input name='phone' type="text" placeholder="Phone Number" className="input w-full borderd" />
                        <input name='location' type="text" placeholder="Phone Location" className="input w-full borderd" />
                        <br />
                        <input type="submit" value="Submit" className='btn btn-accent ' />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;
