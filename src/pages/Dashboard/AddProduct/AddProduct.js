import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../Contexts/AuthProvider';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHostKey = process.env.REACT_APP_imagebb_key;

    // Fetch product categories
    const { data: productCategorys = [], isLoading } = useQuery({
        queryKey: ['productCategorys'],
        queryFn: async () => {
            const res = await fetch("https://cheap-laptop-server-side.vercel.app/categories");
            return res.json();
        }
    });

    const handleAddProduct = data => {
        setIsSubmitting(true);
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);

        // Upload to ImgBB
        fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                if (imageData.success) {
                    const addedProduct = {
                        sellerName: user?.displayName,
                        email: user?.email,
                        image: imageData.data.url,
                        date: new Date().toLocaleDateString('en-GB'),
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
                    };

                    // Save to DB with Auth Header
                    fetch('https://cheap-laptop-server-side.vercel.app/addedProduct', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(addedProduct)
                    })
                        .then(res => res.json())
                        .then(result => {
                            setIsSubmitting(false);
                            if (result.acknowledged) {
                                toast.success('Product added successfully!');
                                navigate('/dashboard/myProducts');
                            }
                        })
                        .catch(() => {
                            setIsSubmitting(false);
                            toast.error('Failed to save product');
                        });
                }
            })
            .catch(() => {
                setIsSubmitting(false);
                toast.error('Image upload failed');
            });
    };

    // Form input styling helper
    const inputStyle = "w-full bg-slate-800/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors";
    const labelStyle = "block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider";
    const errorStyle = "text-red-400 text-xs mt-1 font-medium";

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
                <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-400 text-sm font-medium">Loading categories...</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="mb-6 pb-4 border-b border-slate-800">
                <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide"> Add A Product </h2>
                <p className="text-slate-400 text-xs mt-0.5"> Fill in details to list a new laptop </p>
            </div>

            <form onSubmit={handleSubmit(handleAddProduct)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Left Column */}
                    <div className="space-y-4">
                        <div>
                            <label className={labelStyle}>Product Title</label>
                            <input type="text" {...register("title", { required: 'Product name is required' })} placeholder="e.g. ThinkPad X1 Carbon Gen 9" className={inputStyle} />
                            {errors.title && <p className={errorStyle}>{errors.title.message}</p>}
                        </div>

                        <div>
                            <label className={labelStyle}>Category</label>
                            <select defaultValue="default" {...register("productCategory", { required: 'Select category' })} className={`${inputStyle} cursor-pointer`}>
                                <option value="default" disabled className="bg-slate-900 text-slate-400">Select category</option>
                                {productCategorys.map(cat => (
                                    <option key={cat._id} value={cat.id} className="bg-slate-900 text-slate-100">
                                        {cat?.name}
                                    </option>
                                ))}
                            </select>
                            {errors.productCategory && <p className={errorStyle}>{errors.productCategory.message}</p>}
                        </div>

                        <div>
                            <label className={labelStyle}>Phone Number</label>
                            <input type="text" {...register("Phone", { required: 'Phone number is required' })} placeholder="017xxxxxxxx" className={inputStyle} />
                            {errors.Phone && <p className={errorStyle}>{errors.Phone.message}</p>}
                        </div>

                        <div>
                            <label className={labelStyle}>Location / Address</label>
                            <input type="text" {...register("location", { required: 'Location is required' })} placeholder="e.g. Dhaka, Bangladesh" className={inputStyle} />
                            {errors.location && <p className={errorStyle}>{errors.location.message}</p>}
                        </div>

                        <div>
                            <label className={labelStyle}>Product Photo</label>
                            <input 
                                type="file" 
                                {...register("image", { required: 'Photo is required' })} 
                                className="w-full text-xs text-slate-400 file:mr-4 file:py-2 px-3 py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/10 file:text-cyan-400 border border-slate-700/80 rounded-xl bg-slate-800/80 cursor-pointer" 
                            />
                            {errors.image && <p className={errorStyle}>{errors.image.message}</p>}
                        </div>

                        <div>
                            <label className={labelStyle}>Used Time</label>
                            <input type="text" {...register("usedTime", { required: 'Usage duration required' })} placeholder="e.g. 1 Year 2 Months" className={inputStyle} />
                            {errors.usedTime && <p className={errorStyle}>{errors.usedTime.message}</p>}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                        <div>
                            <label className={labelStyle}>Selling Price (৳)</label>
                            <input type="text" {...register("recelPrice", { required: 'Selling price required' })} placeholder="e.g. 45000" className={inputStyle} />
                            {errors.recelPrice && <p className={errorStyle}>{errors.recelPrice.message}</p>}
                        </div>

                        <div>
                            <label className={labelStyle}>Original Price (৳)</label>
                            <input type="text" {...register("originalPrice", { required: 'Original price required' })} placeholder="e.g. 75000" className={inputStyle} />
                            {errors.originalPrice && <p className={errorStyle}>{errors.originalPrice.message}</p>}
                        </div>

                        <div>
                            <label className={labelStyle}>Condition</label>
                            <input type="text" {...register("Condition", { required: 'Condition is required' })} placeholder="e.g. Excellent / New / Old" className={inputStyle} />
                            {errors.Condition && <p className={errorStyle}>{errors.Condition.message}</p>}
                        </div>

                        <div>
                            <label className={labelStyle}>Year of Purchase</label>
                            <input type="text" {...register("purchase", { required: 'Purchase year required' })} placeholder="e.g. 2021" className={inputStyle} />
                            {errors.purchase && <p className={errorStyle}>{errors.purchase.message}</p>}
                        </div>

                        <div>
                            <label className={labelStyle}>Description</label>
                            <textarea {...register("Description", { required: 'Description required' })} rows="4" placeholder="Write laptop details..." className={inputStyle}></textarea>
                            {errors.Description && <p className={errorStyle}>{errors.Description.message}</p>}
                        </div>
                    </div>

                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-cyan-500/20 transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                            Adding Product...
                        </>
                    ) : (
                        "Add Product"
                    )}
                </button>
            </form>
        </div>
    );
};

export default AddProduct;