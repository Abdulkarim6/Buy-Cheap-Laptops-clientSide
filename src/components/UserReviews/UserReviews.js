import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { EnvelopeIcon } from '@heroicons/react/24/solid';
import { HiUserCircle } from "react-icons/hi";

const UserReviews = () => {

    const { data: messages = []} = useQuery({
        queryKey: ['messages'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/messages');
            const data = await res.json();
            return data;
        }
    })
    return (
        <section className='my-8 bg-white p-3 rounded-r-full rounded-s-md'>
            <div className='flex justify-between'>
                <div>
                    <h2 className="text-xl font-semibold">Our Coustomers Reviews</h2>
                </div>
            </div>
            <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3 p-2 md:p-4'>
                {
                    messages.map(message =>
                        <div key={message._id} className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <p>{message.message}</p>
                                <div className="card-actions justify-between">
                                    <div className='flex items-center font-mono'>
                                        <HiUserCircle className="h-8 w-8 text-blue-500"/>
                                        <p>{message.name}</p>
                                    </div>
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

export default UserReviews;