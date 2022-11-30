import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from '../BookingModal/BookingModal';
import ProductCart from '../ProductCart/ProductCart';

const Products = () => {
    const products = useLoaderData();
    const [bookingProduct, setBookingProduct] = useState(null);

    return (
        <div className='mx-auto'>
            <h1 className="text-3xl font-bold underline text-center">Our Products</h1>
            <div className='grid lg:grid-cols-2 gap-6 p-6 '>
                {
                    products.map(product => <ProductCart
                        key={product._id}
                        setBookingProduct={setBookingProduct}
                        product={product}
                    ></ProductCart>)
                }
            </div>
            {
                bookingProduct &&
                <BookingModal
                    bookingProduct={bookingProduct}
                    setBookingProduct={setBookingProduct}
                >
                </BookingModal>
            }
        </div>
    );
};

export default Products;