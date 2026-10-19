import { Link } from 'react-router-dom';

const ProductCartOfACategory = ({ product, setBookingProduct }) => {

    const { image, title, recelPrice, _id } = product;

    return (
        <div className="card bg-slate-800 shadow-xl" >
            <figure className='bg-slate-300'><img src={image} className='h-64' alt="" /></figure>
            <div className="card-body p-3">
                <h2 className="card-title text-base md:text-lg font-semibold">
                    {title}
                </h2>
                <strong className='text-lg'><p>Sell Price : <span className='text-cyan-400 font-bold'>৳ {recelPrice}</span></p></strong>
                <div className='flex justify-between items-center'> 
                   <Link to={`/ProductDetails/${_id}`}><button type='button' className="p-2 bg-cyan-500 rounded-lg border border-slate-600 text-black hover:text-white hover:bg-cyan-800 font-semibold transition-all ease-linear">Details</button></Link>
                   <label onClick={() => setBookingProduct(product)} htmlFor="booking-modal" type="button" className="p-2 bg-cyan-500 rounded-lg border border-slate-600 text-black hover:text-white hover:bg-cyan-800 font-semibold transition-all ease-linear">Book Now</label>
                </div>
            </div>
        </div>
    );
};

export default ProductCartOfACategory;