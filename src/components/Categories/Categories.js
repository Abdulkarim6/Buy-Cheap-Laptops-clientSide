import React, { useState } from 'react';
import Category from './Category';

const Categories = () => {
    const [categories, setCategories] = useState([])
    fetch('http://localhost:5000/categories')
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            setCategories(data)
        })

    return (
        <div>
            <h1 className="text-3xl font-bold underline">
                this is Categories
            </h1>
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-6'>
                {
                    categories.map(category => <Category
                        key={category._id}
                        category={category}
                    ></Category>)
                }
            </div>

        </div>
    );
};

export default Categories;