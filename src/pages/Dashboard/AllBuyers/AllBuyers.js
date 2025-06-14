import React from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const AllBuyers = () => {
    const role = 'buyer';
    const url = (`http://localhost:5000/allBuyers?role=${role}`)

    const { data: allBuyers = [], refetch } = useQuery({
        queryKey: ['allBuyers', role],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            return data;
        }
    })

    const handleDeleteBuyer = Buyer => {
        fetch(`http://localhost:5000/buyer/${Buyer._id}`, {
            method: 'DELETE',
         })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success(`${Buyer.name} deleted successfully`)
                    refetch()
                }
            })
    };


    return (
        <section>
            <h2 className="text-lg lg:text-3xl p-2 font-semibold">Total buyers :{allBuyers?.length}</h2>
            {
                !allBuyers.length ? <p className='text-lg lg:text-3xl font-medium text-center text-info mt-5'>Buyer list is empty</p>

                    :

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
                                    allBuyers?.map((Buyer, i) =>
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
                                            <td>
                                                <label onClick={() => handleDeleteBuyer(Buyer)} className="btn btn-sm btn-error">Delete</label>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
            }
        </section>
    );
};

export default AllBuyers;