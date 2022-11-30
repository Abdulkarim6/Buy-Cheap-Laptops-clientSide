import { useQuery } from '@tanstack/react-query';
import Category from './Category';

const Categories = () => {

    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('https://cheap-laptop-server-side.vercel.app/categories');
            const data = await res.json();
            // console.log(data);
            return data;

        }
    })

    return (
        <div className=' bg-base-200 text-base-content'>
            <h1 className="text-3xl font-bold underline text-center">
                Our Products Brands
            </h1>
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-6'>
                {
                    categories?.map(category => <Category
                        key={category._id}
                        category={category}
                    ></Category>)
                }
            </div>

        </div>
    );
};

export default Categories;