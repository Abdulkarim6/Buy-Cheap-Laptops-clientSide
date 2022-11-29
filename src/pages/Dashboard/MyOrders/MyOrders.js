import React, { useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    /* loaded all My products start here */
    const url = (`http://localhost:5000/myOrderProducts?email=${user?.email}`)

    const { data: myOrderProducts = [], refetch } = useQuery({
        queryKey: ['myOrderProducts', user?.email],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            // console.log(data);
            return data;
        }
    })
    console.log(myOrderProducts);
    return (
        <div>
            <h2 className="text-4xl text-center bg-base-300 text-base-content py-2 font-semibold">You Book this products</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Photo and Name</th>
                            <th>product Price</th>
                            <th>Booking Date</th>
                            <th>Delete</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myOrderProducts.map((myOrderProduct, i) =>
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
                                        <label htmlFor="confirmation-madal" className="btn btn-sm btn-error">Delete</label>
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;