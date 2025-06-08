import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../Contexts/AuthProvider';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    const imageHostKey = process.env.REACT_APP_imagebb_key;
    const { user } = useContext(AuthContext);
    // console.log('user', user?.displayName, user?.email, date);

    //for get productCategorys from database
    const { data: productCategorys = [], isLoading } = useQuery({
        queryKey: ['productCategorys'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/productCategorys');
            const data = await res.json();
            return data;
        }

    });
    // console.log(productCategorys);

    const handleAddProduct = data => {
        // console.log('data', data);

        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                // console.log(imageData.data.url);

                const addedProduct = {
                    sellerName: user?.displayName,
                    email: user?.email,
                    image: imageData.data.url,
                    date,
                    Condition: data.Condition,
                    Description: data.Description,
                    Phone: data.Phone,
                    location: data.location,
                    originalPrice: data.originalPrice,
                    id: data.productCategory,
                    purchase: data.purchase,
                    recelPrice: data.recelPrice,
                    title: data.title,
                    usedTime: data.usedTime
                }
                // console.log(addedProduct);
                //save A New Add Product to database
                fetch('http://localhost:5000/addedProduct', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        // authorization: `bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(addedProduct)
                })
                    .then(res => res.json())
                    .then(result => {
                        // console.log(result);
                        if (result.acknowledged) {
                            toast.success(`${user?.displayName} added Product successfully`);
                            navigate('/dashboard/myProducts')
                        }
                    })
            });
    };


    if (isLoading) {
        return <div className='flex justify-center mt-20'><button className="btn btn-info loading ">loading</button></div>
    }

    return (
        <div>
            <h2 className="text-4xl text-center bg-base-300 text-base-content py-2 font-semibold">You Can Add A product</h2>
            <div className=' flex justify-center items-center'>
                <div className=' borderd my-7'>
                    <form onSubmit={handleSubmit(handleAddProduct)}>

                        <div className='grid gap-6 lg:grid-cols-2 my-5'>
                            {/* First part start */}
                            <div>
                                <div className="form-control w-full">
                                    <label className="label"><span className="label-text">Your Phone Number</span></label>
                                    <input type="text" {...register("Phone", { required: 'Phone Number required' })} placeholder="Your Phone Number" className="input input-bordered input-primary w-full" />
                                    {errors.Phone && <p className='text-red-500'>{errors.Phone.message}</p>}
                                </div>
                                <div className="form-control w-full">
                                    <label className="label"><span className="label-text">Your Address</span></label>
                                    <input type="text" {...register("location", { required: 'location required' })} placeholder="Your location" className="input input-bordered input-primary w-full" />
                                    {errors.location && <p className='text-red-500'>{errors.location.message}</p>}
                                </div>
                                <div className="form-control w-full">
                                    <label className="label"><span className="label-text">Product Name</span></label>
                                    <input type="text" {...register("title", { required: 'Product Name is Required' })} placeholder="Product Name" className="input input-bordered input-primary w-full" />
                                    {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
                                </div>
                                <div className="form-control w-full">
                                    <label className="label"><span className="label-text">Specialty</span></label>
                                    <select defaultValue={'default'} {...register("productCategory", { required: 'select your product category' })} className="select select-ghost input-bordered  w-full">
                                        <option value="default" disabled>Select your product category</option>
                                        {
                                            productCategorys.map(productCategory => <option
                                                key={productCategory._id}
                                                value={productCategory.id}
                                            >{productCategory.id}</option>)
                                        }
                                    </select>
                                    {errors.productCategory && <p className='text-red-500'>{errors.productCategory.message}</p>}
                                </div>
                                <div className="form-control w-full">
                                    <label className="label"><span className="label-text">Product Photo</span></label>
                                    <input type="file" {...register("image", { required: 'file is Required' })} className="file-input file-input-bordered file-input-primary w-full " placeholder="Your Photo" />
                                    {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
                                </div>
                                <div className="form-control w-full">
                                    <label className="label"><span className="label-text">years of use</span></label>
                                    <input type="text" {...register("usedTime", { required: 'Month/Years' })} placeholder="years of use" className="input input-bordered input-primary w-full" />
                                    {errors.usedTime && <p className='text-red-500'>{errors.usedTime.message}</p>}
                                </div>
                            </div>
                            {/* First part End */}
                            {/* Second part start */}
                            <div>
                                <div className="form-control w-full">
                                    <label className="label"><span className="label-text">Product Sell Price</span></label>
                                    <input type="text" {...register("recelPrice", { required: 'Product Sell Price is Required' })} placeholder="Product Sell Price" className="input input-bordered input-primary w-full" />
                                    {errors.recelPrice && <p className='text-red-500'>{errors.recelPrice.message}</p>}
                                </div>
                                <div className="form-control w-full">
                                    <label className="label"><span className="label-text">Product Original Price</span></label>
                                    <input type="text" {...register("originalPrice", { required: 'Product Original Price is Required' })} placeholder="Product Original Price" className="input input-bordered input-primary w-full" />
                                    {errors.originalPrice && <p className='text-red-500'>{errors.originalPrice.message}</p>}
                                </div>
                                <div className="form-control w-full">
                                    <label className="label"><span className="label-text">Product Condition</span></label>
                                    <input type="text" {...register("Condition", { required: 'Product Condition' })} placeholder="Product Condition" className="input input-bordered input-primary w-full" />
                                    {errors.Condition && <p className='text-red-500'>{errors.Condition.message}</p>}
                                </div>
                                <div className="form-control w-full">
                                    <label className="label"><span className="label-text">Year of purchase</span></label>
                                    <input type="text" {...register("purchase", { required: 'Year of purchase required' })} placeholder=" dd/mm/yy " className="input input-bordered input-primary w-full" />
                                    {errors.purchase && <p className='text-red-500'>{errors.purchase.message}</p>}
                                </div>
                                <div className="form-control w-full">
                                    <label className="label"><span className="label-text">Product Description</span></label>
                                    <textarea {...register("Description", { required: 'Product Description' })} className="textarea textarea-primary" placeholder="Product Description"></textarea>
                                    {errors.Description && <p className='text-red-500'>{errors.Description.message}</p>}
                                </div>
                            </div>
                        </div>
                        {/* Second part End */}
                        <input type="submit" className='btn btn-accent w-full' value='Add Product' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;