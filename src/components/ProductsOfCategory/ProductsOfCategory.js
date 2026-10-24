import { useContext, useEffect, useState } from 'react';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import BookingModal from '../BookingModal/BookingModal';
import { AuthContext } from '../../Contexts/AuthProvider';
import ProductCart from '../../shared/ProductCart/ProductCart';

const ProductsOfCategory = () => {
    const products = useLoaderData();
     const [bookingProduct, setBookingProduct] = useState(null);
     const { user } = useContext(AuthContext);
     const srclocation = useLocation();
     const navigate = useNavigate();

     useEffect(() => {
       if (bookingProduct) {
         if (!user) {
           navigate("/signIn", { state: { from: srclocation } });
         }
       }
     }, [bookingProduct, srclocation, user, navigate]);

    return (
        <div className='mx-auto py-5'>
            <h1 className="mt-5 mb-2 rounded-md text-xl md:text-4xl text-center font-serif font-semibold">Search results</h1>
            <div className='grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-2 md:px-6'>
                {
                    products?.map(product => <ProductCart
                        key={product._id}
                        setBookingProduct={setBookingProduct}
                        product={product}
                    />)
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