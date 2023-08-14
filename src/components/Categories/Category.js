import React from 'react';
import { Link } from 'react-router-dom';

const Category = ({ category }) => {
    // console.log(category);
    const { name, image, id } = category;
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure><img className='h-56' src={image} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <div className="card-actions justify-end">
                    <Link to={`/products/${id}`}>
                        <button className="btn btn-primary">View Items</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Category;