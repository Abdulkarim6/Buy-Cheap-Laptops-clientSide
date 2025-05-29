import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import AllProductCart from './AllProductCart';
import BookingModal from '../BookingModal/BookingModal';

const AllProducts = () => {
      const [bookingProduct, setBookingProduct] = useState(null);

    /* loaded all products start here */
        const url = (`https://cheap-laptop-server-side.vercel.app/allproducts`)
    
        const { data: allproducts = [], refetch } = useQuery({
            queryKey: ['products'],
            queryFn: async () => {
                const res = await fetch(url);
                const data = await res.json();
                console.log(data);
                return data;
            }
        })
        /* loaded all products End Here */

    return (
        <div className='mx-auto'>
                   <h2 className="mt-5 mb-2 rounded-md text-xl md:text-4xl text-center font-serif font-semibold">Used Laptops</h2>
                   <div className='grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:px-8'>
                        {
                            allproducts.map(product => <AllProductCart
                                key={product._id}
                                setBookingProduct={setBookingProduct}
                                product={product}
                            ></AllProductCart>)
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

export default AllProducts;