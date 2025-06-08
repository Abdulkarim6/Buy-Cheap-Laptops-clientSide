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
    const url = (`http://localhost:5000/products?email=${user?.email}`)

    const { data: products = [], refetch } = useQuery({
        queryKey: ['products', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: (`bearer ${localStorage.getItem('accessToken')}`)
                }
            });
            const data = await res.json();
            console.log(data);
            return data;
        }
    })
    /* loaded all My products End Here */


    /* Delete My products operation start here  */
    const successDeleteAction = product => {
        fetch(`http://localhost:5000/product/${product._id}`, {
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
        const advertisProduct = { ...product, status: "advertised" }
        console.log(advertisProduct);
        if (advertisProduct) {
            fetch('http://localhost:5000/advertiseProduct', {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(advertisProduct)
            })
                .then(res => res.json())
                .then(result => {
                    if (result) {
                        const insertTrue = result[0];
                        console.log(insertTrue);
                        if (insertTrue.acknowledged) {
                            toast.success(`${product.title} advertised successfully`);
                            refetch()
                        }
                    }
                })
        }
    };

    return (
        <div>
            <h2 className="text-lg lg:text-3xl font-medium bg-cyan-300 font-serif p-2">Total products : {products?.length}</h2>
            {

                !products.length ? <p className='text-lg lg:text-3xl font-medium text-center text-info mt-5'>You have no products</p>

                    :
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
                                            <td className='font-medium'>{product?.Condition}</td>
                                            <td>
                                                {
                                                    product.status === "advertised" ?
                                                        <label className="btn btn-sm btn-primary btn-disabled">advertised</label>
                                                        :
                                                        <label onClick={() => handleAdvertiseProduct(product)} className="btn btn-sm btn-primary">advertise</label>
                                                }
                                            </td>
                                            <td>
                                                <label onClick={() => setDeletingProduct(product)} htmlFor="confirmation-madal" className="btn btn-sm btn-error">Delete</label>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
            }
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
        </div >
    );
};

export default MyProducts;