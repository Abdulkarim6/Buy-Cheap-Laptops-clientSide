import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Contexts/AuthProvider';
import BookingForm from './BookingForm';

const BookingModal = ({ bookingProduct, setBookingProduct }) => {
    const {email, image } = bookingProduct;
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
        <div className="modal backdrop-blur-sm bg-black/60">
            <div className="modal-box relative bg-slate-800 border border-slate-700 text-slate-100 rounded-2xl shadow-2xl p-5 max-w-lg">
                
                {/* Close Button */}
                <label 
                    htmlFor="booking-modal" 
                    className="btn btn-sm btn-circle absolute right-3 top-3 bg-slate-700 border-none text-slate-300 hover:bg-slate-600 hover:text-white"
                >
                    ✕
                </label>
        
                {/* Modal Title */}
                <h3 className="text-xl font-bold text-white border-b border-slate-700 pb-3 mb-4">
                    Book Laptop
                </h3>
        
                <BookingForm
                 bookingProduct={bookingProduct}
                 handleBooking={handleBooking}
                 user={user}
                 date={date}
                />
            </div>
        </div>
        </>
    );
};

export default BookingModal;
