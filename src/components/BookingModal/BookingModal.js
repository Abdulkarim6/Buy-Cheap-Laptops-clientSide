import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Contexts/AuthProvider';

const BookingModal = ({ bookingProduct, setBookingProduct }) => {
    const { id, title, recelPrice, email, image } = bookingProduct;
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    const { user } = useContext(AuthContext);
    // console.log(user, bookingProduct);

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

        // console.log(buyerBookingProduct);

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
                    setBookingProduct(null)
                }
                else {
                    toast.error(data.message)
                }
                console.log(data);
            })

    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
                        <input name='name' type="text" placeholder="Your Name" className="input w-full borderd" />
                        <input name='email' type="text" defaultValue={user?.email} placeholder="Email Address" className="input w-full borderd" disabled />
                        <input name='date' type="text" disabled value={date} className="input w-full  borderd " />
                        <input name='productName' type="text" disabled value={title} className="input w-full  borderd " />
                        <input name='sellPrice' type="text" disabled value={recelPrice} className="input w-full  borderd " />
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