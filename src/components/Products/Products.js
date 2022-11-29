import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from '../BookingModal/BookingModal';
import Product from './Product';

const Products = () => {
    const products = useLoaderData();
    const [bookingProduct, setBookingProduct] = useState(null);

    console.log(products);
    return (
        <div className='mx-auto'>
            <h1 className="text-3xl font-bold underline">
                this is products
            </h1>
            <div className='grid lg:grid-cols-2 gap-6 p-6 '>
                {
                  products?.lengh && products?.map(product => <Product
                        key={product._id}
                        product={product}
                        setBookingProduct={setBookingProduct}
                    ></Product>)
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