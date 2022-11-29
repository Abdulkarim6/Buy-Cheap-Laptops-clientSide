import React from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const AllSellers = () => {
    const role = 'Seller';
    const url = (`http://localhost:5000/allSellers?role=${role}`)

    const { data: allSellers = [], refetch } = useQuery({
        queryKey: ['allSellers', role],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            // console.log(data);
            return data;
        }
    })
    console.log(allSellers);

    const handleDeleteSeller = Seller => {
        fetch(`http://localhost:5000/seller/${Seller._id}`, {
            method: 'DELETE',
            // headers: {
            //     authorization: `bearer ${localStorage.getItem('accessToken')}`
            // }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success(`${Seller.name} deleted successfully`)
                    refetch()
                }
            })
    }
    return (
        <div>
            <h2 className="text-3xl">this is all Sellers page</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Delete</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allSellers?.length && allSellers.map((Seller, i) =>
                                <tr key={Seller._id}>
                                    <th>{i + 1}</th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="w-20 rounded">
                                                    <img src={Seller.image} alt="sellerImg" />
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <div className="font-bold">{Seller.name}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <label>{Seller.email}</label>
                                    </td>
                                    {/* <td><label onClick={() => handleAdvertiseProduct(product)} className="btn btn-sm btn-primary">advertise</label></td> */}

                                    <th>

                                        <label onClick={() => handleDeleteSeller(Seller)} className="btn btn-sm btn-error">Delete</label>
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

export default AllSellers;