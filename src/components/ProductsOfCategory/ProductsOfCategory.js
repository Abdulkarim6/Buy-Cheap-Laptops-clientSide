import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from '../BookingModal/BookingModal';
import ProductCartOFCategory from '../ProductCartOFCategory/ProductCartOFCategory';

const ProductsOfCategory = () => {
    const products = useLoaderData();
    const [bookingProduct, setBookingProduct] = useState(null);

    return (
        <div className='mx-auto'>
            <h1 className="mt-5 mb-2 rounded-md text-xl md:text-4xl text-center font-serif font-semibold">Search results</h1>
            <div className='grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-2 md:px-6'>
                {
                    products?.map(product => <ProductCartOFCategory
                        key={product._id}
                        setBookingProduct={setBookingProduct}
                        product={product}
                    ></ProductCartOFCategory>)
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

export default ProductsOfCategory;