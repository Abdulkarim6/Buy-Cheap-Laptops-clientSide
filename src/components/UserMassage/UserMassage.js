import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { EnvelopeIcon } from '@heroicons/react/24/solid'

const UserMassage = () => {

    const { data: messages = [], refetch } = useQuery({
        queryKey: ['messages'],
        queryFn: async () => {
            const res = await fetch('https://cheap-laptop-server-side.vercel.app/messages');
            const data = await res.json();
            refetch()
            return data;
        }
    })
    return (
        <section className='my-8 bg-base-200 p-3'>
            <div className='flex justify-between'>
                <div>
                    <h2 className="text-xl font-semibold">Our Coustomers Reviews</h2>
                </div>
            </div>
            <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3 p-6'>
                {
                    messages.map(message =>
                        <div key={message._id} className="card w-96 bg-base-100 shadow-xl">
                            <div className="card-body">
                                <p>{message.message}</p>
                                <div className="card-actions justify-end">
                                    <p>{message.name}</p>
                                    <EnvelopeIcon className="h-8 w-8 text-blue-500" />
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </section>
    );
};

export default UserMassage;