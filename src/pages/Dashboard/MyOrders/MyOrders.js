import React, { useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    /* loaded all My products start here */
    const url = (`https://cheap-laptop-server-side.vercel.app/myOrderProducts?email=${user?.email}`)

    const { data: myOrderProducts = [] } = useQuery({
        queryKey: ['myOrderProducts', user?.email],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            // console.log(data);
            return data;
        }
    })
    return (
        <div>
            <h2 className="text-lg lg:text-3xl text-center bg-cyan-300 font-serif  py-2 font-semibold">You have Booked this products</h2>
            {
                !myOrderProducts.length ? <p className='text-lg lg:text-3xl font-medium text-center text-info mt-5'>You have no booked any Products</p>

                    :
                    <div className="overflow-x-auto w-full">
                        <table className="table w-full font-medium">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Product photo and Name</th>
                                    <th>product Price</th>
                                    <th>Booking Date</th>
                                    <th>Payment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    myOrderProducts?.map((myOrderProduct, i) =>
                                        <tr key={myOrderProduct._id}>
                                            <th>{i + 1}</th>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="w-20 rounded">
                                                            <img src={myOrderProduct.productImage} alt="Tailwind-CSS-Avatar-component" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{myOrderProduct.productName}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span>{myOrderProduct.price}</span>
                                            </td>
                                            <td><span>{myOrderProduct.bookingDate}</span></td>
                                            <th>
                                                <button className="btn btn-sm btn-error btn-disabled" >Pay</button>
                                            </th>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
            }
        </div>
    );
};

export default MyOrders;