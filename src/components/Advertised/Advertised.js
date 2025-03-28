import { useQuery } from '@tanstack/react-query';
import AdvertisedCard from './AdvertisedCard';

const Advertised = () => {

    const { data: advertiseProducts = [] } = useQuery({
        queryKey: ['advertiseProducts'],
        queryFn: async () => {
            const res = await fetch(`https://cheap-laptop-server-side.vercel.app/advertiseProducts`);
            const data = await res.json();
            return data;
        }
    });
    return (
        <div>
            <h2 className="mt-5 bg-cyan-300 rounded-md text-lg md:text-4xl text-center font-serif py-2 font-semibold">Suggest You for This Products</h2>
            <div className='grid gap-6 lg:grid-cols-2 bg-base-200 p-10'>
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