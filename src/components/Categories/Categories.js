import { useQuery } from '@tanstack/react-query';
import Category from './Category';

const Categories = () => {

    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/categories');
            const data = await res.json();
            // console.log(data);
            return data;

        }
    })

    return (
        <div>
            <h1 className="text-3xl font-bold underline">
                this is Categories
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