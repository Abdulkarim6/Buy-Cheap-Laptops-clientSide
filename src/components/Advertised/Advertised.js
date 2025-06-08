import { useQuery } from '@tanstack/react-query';
import AdvertisedCard from './AdvertisedCard';

const Advertised = () => {

    const { data: advertiseProducts = [] } = useQuery({
        queryKey: ['advertiseProducts'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/advertiseProducts`);
            const data = await res.json();
            return data;
        }
    });
    return (
        <div>
            <h2 className="mt-5 mb-2 rounded-md text-xl md:text-4xl text-center font-serif font-semibold">Suggest You</h2>
            <div className='grid gap-3 md:grid-cols-2 lg:grid-cols-3 lg:px-8'>
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