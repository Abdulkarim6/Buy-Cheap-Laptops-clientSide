import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Contexts/AuthProvider';
import toast from 'react-hot-toast';
import { GoogleAuthProvider } from 'firebase/auth';
import useToken from '../../hooks/useToken';

const provider = new GoogleAuthProvider();

const SignUP = () => {
    const { createUser, updateUser, signInGoogle } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [signupError, setSignupError] = useState('');
    const navigate = useNavigate();
    const imageHostKey = process.env.REACT_APP_imagebb_key;

    const [newUserEmail, setNewUserEmail] = useState('');
    const [token] = useToken(newUserEmail);

    if (token) {
        navigate('/')
    }


    const handleSignup = data => {
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
                const imgUrl = imageData.data.url;
                console.log(imgUrl);

                const { name, email, password, role } = data;
                setSignupError('')
                createUser(email, password)
                    .then(result => {
                        const user = result.user;
                        console.log(user);
                        toast.success('user create successfully')
                        handleUserUpdate(name, email, role, imgUrl)
                    })
                    .catch(err => {
                        setSignupError(err.message)
                        console.error(err)
                    })
            });


    };

    const handleUserUpdate = (name, email, role, imgUrl) => {
        const profile = { displayName: name }
        updateUser(profile)
            .then(() => {
                saveUserData(name, email, role, imgUrl)
            })
            .catch(err => console.log(err));
    };

    const handleGoogleSingUP = () => {
        signInGoogle(provider)
            .then(result => {
                const user = result.user;
                console.log(user);
            })
            .catch(err => console.log(err))
    };

    const saveUserData = (name, email, role, imgUrl) => {
        const user = { name, email, role, imgUrl };
        console.log(user);

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setNewUserEmail(email);
            });
    };


    return (
        <div className='my-6 flex justify-center items-center'>
            <div className='w-96 borderd'>
                <h2 className="text-4xl font-semibold text-center ">SignUp</h2>
                <form onSubmit={handleSubmit(handleSignup)}>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Name</span></label>
                        <input type="text" {...register("name", { required: 'name is Required' })} placeholder="Your Name" className="input input-bordered w-full" />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type="text" {...register("email", { required: 'email is required' })} placeholder="Your Email" className="input input-bordered w-full" />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Email</span></label>
                        <select {...register("role", { required: 'usertag is required' })} className="select select-ghost input-bordered w-full">
                            <option disabled selected className='text-xl'>select a option You buyer or seller</option>
                            <option className='text-xl my-3' >Seller</option>
                            <option className='text-xl'>Buyer</option>
                        </select>
                    </div>
                    <div className="form-control w-full mb-3">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type="password" {...register("password", {
                            required: 'password is required',
                            minLength: { value: 6, message: 'password must be 6 charecters long' },
                        })} placeholder="Your Password" className="input input-bordered w-full" />
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Product Photo</span></label>
                        <input type="file" {...register("image", { required: 'file is Required' })} className="file-input file-input-bordered file-input-primary w-full " placeholder="Your Photo" />
                        {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
                    </div>
                    <input type="submit" className='btn btn-accent w-full' value='SignUp' />
                </form>
                {
                    signupError && <p className='text-red-500'>{signupError}</p>
                }
                <p>Allready have an account <Link to='/signin' className='text-secondary'>Please Login</Link> </p>
                <div className="divider">OR</div>
                <button onClick={handleGoogleSingUP} className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default SignUP;