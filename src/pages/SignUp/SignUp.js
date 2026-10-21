import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Contexts/AuthProvider';
import toast from 'react-hot-toast';
import useToken from '../../hooks/useToken';
import SocialLogin from '../SocialLogin/SocialLogin';
import useSaveUserData from '../../hooks/useSaveUserData';

const SignUP = () => {
    const { createUser, updateUser } = useContext(AuthContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [signupError, setSignupError] = useState('');

    const selectedRole = watch("role");

    const [userData, setUserData] = useState({ name: "", email: "", role: "" });
    const [dataSaveSuccessFully] = useSaveUserData(userData); // Stored new user data in database

    const location = useLocation();
    const navigate = useNavigate();

    let navigateInfo = null;
    if (dataSaveSuccessFully && userData?.email) {
        navigateInfo = { email: userData.email, location, navigate };
    }
    useToken(navigateInfo);

    const handleSignup = data => {
        setSignupError('');
        const { name, email, password, role } = data;
        const normalizedRole = role.toLowerCase();

        createUser(email, password)
            .then(result => {
                if(result?.user){
                    updateUser({ displayName: name })
                    .then(() => {
                        toast.success(`${name} created account successfully`);
                        
                        setUserData({
                            name,
                            email,
                            role: normalizedRole
                        });
                    })
                    .catch(err => setSignupError(err.message));
                }
            })
            .catch(error => {
               if (error.code === 'auth/network-request-failed') {
                   setSignupError("Check your network connection and try again.");
               } else {
                   setSignupError(error.code);
                    }
                });
    };

    return (
        <div className='flex justify-center items-center px-4 my-6'>
            <div className='w-full max-w-md border border-slate-700 bg-slate-800/90 shadow-2xl p-8 rounded-2xl text-slate-100 backdrop-blur-md'>
                
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-6">SignUp</h2>
                
                <form onSubmit={handleSubmit(handleSignup)} className="space-y-2">
                    
                    {/* Name Field */}
                    <div className="form-control w-full">
                        <label className="label pb-1">
                            <span className="label-text text-slate-300 font-medium">Name</span>
                        </label>
                        <input 
                            type="text" 
                            {...register("name", { required: 'Name is required' })} 
                            placeholder="Your Name" 
                            className="input w-full bg-slate-900 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none rounded-lg text-sm" 
                        />
                        {errors.name && <p className='text-red-400 text-xs mt-1 font-medium'>{errors.name.message}</p>}
                    </div>

                    {/* Email Field */}
                    <div className="form-control w-full">
                        <label className="label pb-1">
                            <span className="label-text text-slate-300 font-medium">Email</span>
                        </label>
                        <input 
                            type="email" 
                            {...register("email", { required: 'Email is required' })} 
                            placeholder="Your Email" 
                            className="input w-full bg-slate-900 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none rounded-lg text-sm" 
                        />
                        {errors.email && <p className='text-red-400 text-xs mt-1 font-medium'>{errors.email.message}</p>}
                    </div>

                    {/* Role Field (Dropdown UI for better UX) */}
                    <div className="form-control w-full">
                        <label className="label pb-1">
                            <span className="label-text text-slate-300 font-medium">Choose your Role</span>
                        </label>
                        <select 
                            {...register("role", { required: 'Role selection is required' })}
                            className="select w-full bg-slate-900 border border-slate-700 text-slate-100 focus:border-cyan-400 focus:outline-none rounded-lg text-sm"
                            defaultValue=""
                        >
                            <option value="" disabled hidden>Select Role</option>
                            <option value="buyer">Buyer</option>
                            <option value="seller">Seller</option>
                        </select>
                        {errors.role && <p className='text-red-400 text-xs mt-1 font-medium'>{errors.role.message}</p>}
                    </div>

                    {/* Password Field */}
                    <div className="form-control w-full">
                        <label className="label pb-1">
                            <span className="label-text text-slate-300 font-medium">Password</span>
                        </label>
                        <input 
                            type="password" 
                            {...register("password", { 
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Password must be at least 6 characters long' }
                            })} 
                            placeholder="Your Password" 
                            className="input w-full bg-slate-900 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none rounded-lg text-sm" 
                        />
                        {errors.password && <p className='text-red-400 text-xs mt-1 font-medium'>{errors.password.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <input 
                        type="submit" 
                        className='btn bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold border-none rounded-lg w-full transition-all duration-200 mt-2 cursor-pointer' 
                        value='SIGN UP' 
                    />

                    {/* Error Message */}
                    {signupError && <p className='text-red-400 text-xs font-medium text-center mt-2'>{signupError}</p>}
                </form>

                <p className='text-sm text-slate-400 mt-3'>
                    Already have an account? 
                    <Link to='/signin' className='text-cyan-400 hover:underline font-medium ml-1'>
                        Please Login
                    </Link> 
                </p>

                {/* OR Divider */}
                <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-slate-700"></div>
                    <span className="flex-shrink mx-3 text-slate-500 text-xs">OR</span>
                    <div className="flex-grow border-t border-slate-700"></div>
                </div>

                <SocialLogin currentPath="signUp" selectedRole={selectedRole} />
            </div>
        </div>
    );
};

export default SignUP;