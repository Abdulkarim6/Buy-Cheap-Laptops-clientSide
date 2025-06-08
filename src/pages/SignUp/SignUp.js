import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Contexts/AuthProvider';
import toast from 'react-hot-toast';
import useToken from '../../hooks/useToken';
import { useEffect } from 'react';
import { saveUserData } from '../../shared/Utils/Utils';
import SocialLogin from '../SocialLogin/SocialLogin';


const SignUP = () => {
    const { createUser, updateUser , signInWithGoogle} = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    console.log("errors", errors);
    
    const [signupError, setSignupError] = useState('');
    // const [tagInputError, setTagInputError] = useState(false);
    // console.log(tagInputError);
    
    const navigate = useNavigate();

    const [newUserEmail, setNewUserEmail] = useState('');
    const [token] = useToken(newUserEmail);
    const errorClass = "text-red-600 font-semibold bg-base-300 text-center rounded-lg mx-2 italic"

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [navigate, token])

    // const validRoles = ["seller", "buyer"];
    const handleSignup = data => {
        setSignupError('');
        // setTagInputError(false);
        const { name, email, password, role } = data;
        const normalizedRole = role.toLowerCase();
        // if (!validRoles.includes(normalizedRole)) {
        //    //toast.error(`Must be input your role corractly!`);
        //    setTagInputError(true)
        //    return;
        // }

        createUser(email, password)
            .then(result => {
                updateUser({ displayName: name })
                    .then(() => {
                        toast.success(`${result?.user?.displayName} created account successfully`)
                        saveUserData(name, email, normalizedRole);
                        setNewUserEmail(email);
                    })
                    .catch();
            })
            .catch(err => {
                setSignupError(err.message)
            })
    };

    

    return (
        <div className='my-6 flex flex-col justify-center items-center'>
            <div className='w-96 borderd'>
                <h2 className="text-4xl font-semibold text-center ">SignUp</h2>
                <form onSubmit={handleSubmit(handleSignup)}>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text text-base md:text-lg">Name</span></label>
                        <input type="text" {...register("name", { required: 'name is Required' })} placeholder="Your Name" className="input input-bordered w-full" required/>
                        {/* {errors.name && <p className={errorClass}>{errors.name.message}</p>} */}
                    </div>

                    <div className="form-control w-full">
                        <label className="label"><span className="label-text text-base md:text-lg">Email</span></label>
                        <input type="text" {...register("email")} placeholder="Your Email" className="input input-bordered w-full" required/>
                    </div>

                    <div className="form-control w-full">
                        <label className="label"><span className="label-text text-base md:text-lg">Choose your Role</span></label>
                        <input type="text" {...register("role", 
                            { validate:(value)=>  
                                    ["seller", "buyer"].includes(value.toLowerCase()) ||
                                    "Must be input your role correctly!"
                            })}
                            placeholder="Seller/Buyer" className="input input-bordered w-full" required
                        />
                       {errors.role && <p className={errorClass}>{errors.role.message}</p>}
                     </div>

                    <div className="form-control w-full mb-3">
                        <label className="label"><span className="label-text text-base md:text-lg">Password</span></label>
                        <input type="password" {...register("password", {
                            minLength: { value: 6, message: 'password must be 6 charecters long' }})}
                            placeholder="Your Password" className="input input-bordered w-full" required
                        />
                        {errors.password && <p className={errorClass}>{errors.password.message}</p>}
                    </div>
                    <input type="submit" className='btn btn-sm md:btn-md btn-primary w-full' value='SignUp' />
                </form>
                {
                    signupError && <p className={errorClass}>{signupError}</p>
                }
                <p>Allready have an account?<Link to='/signin' className='text-blue-900 underline ml-2'>Please Login</Link> </p>
                
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default SignUP;