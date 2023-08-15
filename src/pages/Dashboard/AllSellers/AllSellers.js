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
    // console.log(allSellers);

    const handleDeleteSeller = Seller => {
        fetch(`http://localhost:5000/seller/${Seller._id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.acknowledged) {
                    toast.success(`${Seller.name} deleted successfully`)
                    refetch()
                }
            })
    }

    const handleMakeVerify = id => {
        fetch(`http://localhost:5000/seller/${id}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success('Make Verify Successfully')
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
                            <th>Name</th>
                            <th>Email</th>
                            <th>Delete</th>
                            <th>Make Verify</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allSellers?.length && allSellers.map((Seller, i) =>
                                <tr key={Seller._id}>
                                    <th>{i + 1}</th>
                                    <td>
                                        <div>
                                            <div className="font-bold">{Seller.name}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <label>{Seller.email}</label>
                                    </td>
                                    <th>
                                        <label onClick={() => handleDeleteSeller(Seller)} className="btn btn-sm btn-error">Delete</label>
                                    </th>


                                    <td>
                                        {
                                            Seller?.status !== 'verify' &&
                                            <label onClick={() => handleMakeVerify(Seller._id)} className="btn btn-sm btn-primary">Verify</label>
                                        }
                                        {
                                            Seller?.status === 'verify' &&
                                            <label onClick={() => handleMakeVerify(Seller._id)} className="btn btn-sm btn-primary">Verifyed</label>
                                        }
                                    </td>

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