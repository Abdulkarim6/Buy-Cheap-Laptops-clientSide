import React from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const AllBuyers = () => {
    const role = 'Buyer';
    const url = (`https://cheap-laptop-server-side.vercel.app/allBuyers?role=${role}`)

    const { data: allBuyers = [], refetch } = useQuery({
        queryKey: ['allBuyers', role],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            // console.log(data);
            return data;
        }
    })
    // console.log(allBuyers);

    const handleDeleteBuyer = Buyer => {
        fetch(`https://cheap-laptop-server-side.vercel.app/buyer/${Buyer._id}`, {
            method: 'DELETE',
            // headers: {
            //     authorization: `bearer ${localStorage.getItem('accessToken')}`
            // }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.acknowledged) {
                    toast.success(`${Buyer.name} deleted successfully`)
                    refetch()
                }
            })
    };


    return (
        <div>
            <h2 className="text-3xl">this is all buyers page</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Delete</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allBuyers?.length && allBuyers.map((Buyer, i) =>
                                <tr key={Buyer._id}>
                                    <th>{i + 1}</th>
                                    
                                    <td>
                                        <div>
                                            <div className="font-bold">{Buyer.name}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <label >{Buyer.email}</label>
                                    </td>
                                    {/* <td><label onClick={() => handleAdvertiseProduct(product)} className="btn btn-sm btn-primary">advertise</label></td> */}
                                    <th>
                                        <label onClick={() => handleDeleteBuyer(Buyer)} className="btn btn-sm btn-error">Delete</label>
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

export default AllBuyers;