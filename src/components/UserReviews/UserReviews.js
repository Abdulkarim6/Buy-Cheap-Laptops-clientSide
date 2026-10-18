import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { EnvelopeIcon } from '@heroicons/react/24/solid';
import { HiUserCircle } from "react-icons/hi";

const UserReviews = () => {

    const { data: messages = []} = useQuery({
        queryKey: ['messages'],
        queryFn: async () => {
            const res = await fetch('https://cheap-laptop-server-side.vercel.app/messages');
            const data = await res.json();
            return data;
        }
    })
    return (
        <section className='my-8 p-3 rounded-r-full rounded-s-md'>
            <div className='flex justify-between'>
                <div>
                    <h2 className="text-xl font-semibold">Our Customer Reviews</h2>
                </div>
            </div>
            <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3 p-2 md:p-4'>
                {
                    messages.map(message =>
                        <div key={message._id} className="card bg-slate-800 shadow-2xl">
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