import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../../shared/ConfirmationModal/ConfirmationModal';

const MyProducts = () => {
    const [deletingProduct, setDeletingProduct] = useState(null);

    const closeModal = () => {
        setDeletingProduct(null)
    };

    const { user } = useContext(AuthContext);
    /* loaded all My products start here */
    const url = (`https://cheap-laptop-server-side.vercel.app/products?email=${user?.email}`)

    const { data: products = [], refetch } = useQuery({
        queryKey: ['products', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: (`bearer ${localStorage.getItem('accessToken')}`)
                }
            });
            const data = await res.json();
            // console.log(data);
            return data;
        }
    })
    /* loaded all My products End Here */


    /* Delete My products operation start here  */
    const successDeleteAction = product => {
        fetch(`https://cheap-laptop-server-side.vercel.app/product/${product._id}`, {
            method: 'DELETE',
            // headers: {
            //     authorization: `bearer ${localStorage.getItem('accessToken')}`
            // }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.acknowledged) {
                    toast.success(`${product.title} product deleted successfully`)
                    refetch()
                }
            })
    };
    /* Delete My products operation End here  */

    /* Advertise My products operation start here  */
    const handleAdvertiseProduct = product => {
        // console.log(product);
        fetch('https://cheap-laptop-server-side.vercel.app/advertiseProduct', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(result => {
                // console.log(result);
                if (result.acknowledged) {
                    toast.success(`${product.title} advertised successfully`);
                }
            })
    }

    return (
        <div>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Photo and Name</th>
                            <th>product status</th>
                            <th>Advertise</th>
                            <th>Delete</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                          products?.length && products.map((product, i) =>
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
                                    <td><label onClick={() => handleAdvertiseProduct(product)} className="btn btn-sm btn-primary">advertise</label></td>
                                    <th>
                                        <label onClick={() => setDeletingProduct(product)} htmlFor="confirmation-madal" className="btn btn-sm btn-error">Delete</label>
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingProduct &&
                <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`if you delete ${deletingProduct.title}. It connot be undone`}
                    successDeleteAction={successDeleteAction}
                    successDeleteButton='delete'
                    modalData={deletingProduct}
                    closeModal={closeModal}
                ></ConfirmationModal>
            }
        </div>
    );
};

export default MyProducts;