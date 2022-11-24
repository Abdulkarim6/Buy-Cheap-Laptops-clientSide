import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Product from './Product';

const Products = () => {

    const products = useLoaderData()

    // console.log(products);
    return (
        <div className='mx-auto'>
            <h1 className="text-3xl font-bold underline">
                this is products
            </h1>
            <div className='grid lg:grid-cols-2 p-6 justify-items-center'>
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                    ></Product>)
                }
            </div>
        </div>
    );
};

export default Products;