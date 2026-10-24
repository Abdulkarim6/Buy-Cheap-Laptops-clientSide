import { useQuery } from '@tanstack/react-query';
import ProductCart from '../../shared/ProductCart/ProductCart';
import { useState } from 'react';
import BookingModal from '../BookingModal/BookingModal';

const Advertised = () => {
    const [bookingProduct, setBookingProduct] = useState(null);

    const { data: advertiseProducts = [] } = useQuery({
        queryKey: ['advertiseProducts'],
        queryFn: async () => {
            const res = await fetch(`https://cheap-laptop-server-side.vercel.app/advertiseProducts`);
            const data = await res.json();
            return data;
        }
    });
    return (
        <div>
            <h2 className="mt-5 mb-2 rounded-md text-xl md:text-4xl text-center font-serif font-semibold">Suggested You</h2>
            <div className='grid gap-3 md:grid-cols-2 lg:grid-cols-4 lg:px-8'>
                {
                    advertiseProducts?.map(product => <ProductCart
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

export default Advertised;