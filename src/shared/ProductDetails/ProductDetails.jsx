import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { 
    HiCheckBadge, 
    HiOutlineMapPin, 
    HiOutlinePhone, 
    HiOutlineCalendar, 
    HiOutlineClock, 
    HiOutlineSparkles 
} from 'react-icons/hi2';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import BookingForm from '../../components/BookingModal/BookingForm';

const ProductDetails = () => {
    const product = useLoaderData();
    const {
        _id, email: sellerEmail, image, location: sellerLocation, title: productTitle, originalPrice, postDate, recelPrice, resalePrice,
        sellerName, usedTime, Phone, Condition, Description
    } = product || {};

    console.log(product);

    const price = recelPrice || resalePrice;
    const date = new Date().toLocaleDateString('en-GB');
    const { user } = useContext(AuthContext);

    const srcLocation = useLocation();
    const navigate = useNavigate();

    const handleBooking = (event) => {
        event.preventDefault();

        // ১. লগইন চেক
        if (!user) {
            navigate("/signIn", { state: { from: srcLocation } });
            return;
        }

        if (user?.email === sellerEmail) {
            toast.error("You cannot book your own listed product!");
            return;
        }

        const form = event.target;
        const buyerName = form.name.value;
        const buyerEmail = form.email.value;
        const bookingDate = form.date.value;
        const buyerPhone = form.phone.value;
        const buyerLocation = form.location.value;

        const buyerBookingProduct = {
            productId: _id,
            productName: productTitle,
            productImage: image,
            price,
            sellerEmail,
            buyerName,
            buyerEmail,
            buyerPhone,
            bookingDate,
            buyerLocation
        };

        // ৩. JWT Authorization হেডারসহ এপিআই রিকোয়েস্ট
        fetch('https://cheap-laptop-server-side.vercel.app/buyerBookingProducts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(buyerBookingProduct)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.acknowledged) {
                    toast.success('Your booking was confirmed successfully!');
                    form.reset();
                } else {
                    toast.error(data.message || 'Failed to place booking');
                }
            })
            .catch(() => toast.error('Something went wrong. Please try again.'));
    };

    return (
        <section className="w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Product Showcase & Details */}
                <div className="lg:col-span-7 bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 shadow-2xl space-y-6">
                    
                    {/* Image Preview Container */}
                    <div className="relative w-full h-64 sm:h-80 md:h-96 bg-slate-950/60 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center group">
                        <img
                            src={image}
                            alt={productTitle}
                            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-3 left-3 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-semibold text-xs px-3 py-1 rounded-full backdrop-blur-md">
                            {Condition || "Used"}
                        </span>
                    </div>

                    {/* Title & Seller Info */}
                    <div className="space-y-3 pb-5 border-b border-slate-800/80">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide leading-tight">
                            {productTitle}
                        </h1>

                        <div className="flex flex-wrap items-center gap-3 text-sm">
                            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700/60">
                                <span className="text-slate-400">Seller:</span>
                                <span className="font-semibold text-white">{sellerName || "Verified Seller"}</span>
                                <HiCheckBadge className="w-4 h-4 text-blue-400" title="Verified Seller" />
                            </div>

                            <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                                <HiOutlineCalendar className="w-4 h-4 text-slate-500" />
                                <span>Posted: {postDate || "Recently"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-950/40 p-4 rounded-xl border border-slate-800/60">
                        <div>
                            <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Selling Price</p>
                            <p className="text-xl sm:text-2xl font-extrabold text-cyan-400 mt-0.5">৳ {price}</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Original Price</p>
                            <p className="text-lg font-semibold text-red-400 line-through mt-1">৳ {originalPrice}</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Used Duration</p>
                            <p className="text-sm font-semibold text-slate-200 mt-1 flex items-center gap-1">
                                <HiOutlineClock className="w-4 h-4 text-cyan-400" />
                                {usedTime}
                            </p>
                        </div>
                    </div>

                    {/* Specs / Meta Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-slate-300 bg-slate-800/40 p-3 rounded-lg border border-slate-800">
                            <HiOutlineMapPin className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                            <span><strong className="text-white">Location:</strong> {sellerLocation}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300 bg-slate-800/40 p-3 rounded-lg border border-slate-800">
                            <HiOutlinePhone className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                            <span><strong className="text-white">Contact:</strong> {Phone}</span>
                        </div>
                    </div>

                    {/* Description */}
                    {Description && (
                        <div className="pt-2">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                                <HiOutlineSparkles className="w-4 h-4 text-cyan-400" />
                                Description & Details
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed bg-slate-950/30 p-4 rounded-xl border border-slate-800/50 whitespace-pre-line">
                                {Description}
                            </p>
                        </div>
                    )}
                </div>

                {/* Right Column: Sticky Booking Form */}
                <div className="lg:col-span-5 bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 shadow-2xl sticky top-24">
                    <h2 className="text-xl font-bold text-white mb-1">
                        Book This Laptop
                    </h2>
                    <p className="text-slate-400 text-xs mb-6 pb-4 border-b border-slate-800">
                        Fill out your details below to confirm your purchase booking.
                    </p>

                    <BookingForm
                        bookingProduct={product}
                        handleBooking={handleBooking}
                        user={user}
                        date={date}
                    />
                </div>

            </div>
        </section>
    );
};

export default ProductDetails;