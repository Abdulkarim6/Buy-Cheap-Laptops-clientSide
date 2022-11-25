import React, { useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom'

const MyProducts = () => {
    const { user } = useContext(AuthContext);

    const url = (`http://localhost:5000/products?email=${user?.email}`)

    const { data: products = [] } = useQuery({
        queryKey: ['products', user?.email],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            // console.log(data);
            return data;
        }
    })
    const { Condition, Description, Phone, email, id, image, location, originalPrice,
        postDate, recelPrice, role, sellerName, title, usedTime } = products;
    console.log(products);

    return (
        <div className="overflow-x-auto w-full">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Product Name</th>
                        <th>product status</th>
                        <th>Advertise</th>
                        <th>Delete</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, i) =>
                            <tr key={product._id}>
                                <th>{i + 1}</th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="w-20 rounded">
                                                <img src={product.image} alt="Tailwind-CSS-Avatar-component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{product.title}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                                </td>
                                <td>advertise</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">Delete</button>
                                </th>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyProducts;