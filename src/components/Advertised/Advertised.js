import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Contexts/AuthProvider';
import AdvertisedCard from './AdvertisedCard';

const Advertised = () => {
    const { user } = useContext(AuthContext);

    const { data: advertiseProducts = [] } = useQuery({
        queryKey: ['advertiseProducts'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/advertiseProducts`);
            const data = await res.json();
            console.log(data);
            return data;
        }
    });
    console.log(advertiseProducts);

    return (
        <div>
            <h2 className="text-4xl text-center bg-base-300 text-base-content py-2 font-semibold">Suggest You for This Products</h2>
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-6'>
                {
                    advertiseProducts?.map(advertiseProduct => <AdvertisedCard
                        key={advertiseProduct._id}
                        advertiseProduct={advertiseProduct}
                    ></AdvertisedCard>)
                }
            </div>
        </div>
    );
};

export default Advertised;