import React from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const AllSellers = () => {
    const role = 'Seller';
    const url = (`https://cheap-laptop-server-side.vercel.app/allSellers?role=${role}`)

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
        fetch(`https://cheap-laptop-server-side.vercel.app/seller/${Seller._id}`, {
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
        fetch(`https://cheap-laptop-server-side.vercel.app/seller/${id}`, {
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
            <h2 className="text-lg lg:text-3xl font-medium bg-cyan-300 font-serif p-2">Total Sellers : {allSellers?.length}</h2>
            {
                !allSellers.length ? <p className='text-lg lg:text-3xl font-medium text-center text-info mt-5'>Can't found any Sellers</p>

                    :

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
                                    allSellers?.map((Seller, i) =>
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
                                                    <label  className="btn btn-sm btn-primary btn-disabled">Verifyed</label>
                                                }
                                            </td>

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

export default AllSellers;