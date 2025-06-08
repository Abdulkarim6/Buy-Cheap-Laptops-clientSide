import { useQuery } from '@tanstack/react-query';
import Category from './Category';

const Categories = () => {

    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/categories');
            const data = await res.json();
            console.log(data);
            
            return data;

        }
    })

    return (
        <section className=''>
            <h2 className="mt-5 mb-2 rounded-md text-xl md:text-4xl text-center font-serif font-semibold">Used Laptops</h2>
            {/* <h1 className="bg-cyan-300 rounded-md text-3xl text-center font-serif py-2 font-semibold">
                Laptop Categories
            </h1> */}
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3'>
                {
                    categories?.map(category => <Category
                        key={category._id}
                        category={category}
                    ></Category>)
                }
            </div>

        </section>
    );
};

export default Categories;