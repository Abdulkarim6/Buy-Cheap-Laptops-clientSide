import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import toast from 'react-hot-toast';
import useToken from '../../hooks/useToken';


const SignIn = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const { signIn,  } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');

    const [loginUserEmail, setLoginUserEmail] = useState('')
    const [token] = useToken(loginUserEmail)

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    if (token) {
        navigate(from, { replace: true });
    }


    const handleLogin = data => {
        // console.log(data);
        setLoginError('')
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                // console.log(user);
                toast.success(`${user.displayName} Login Successfully`);
                setLoginUserEmail(data.email)
            })
            .catch(error => {
                setLoginError(error.message)
                // console.log(error)
            });
    }

   

    return (
        <div className='h-[500px] flex justify-center items-center'>
            <div className='w-96 borderd'>
                <h2 className="text-4xl font-semibold text-center ">Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type="text"
                            {...register("email", { required: 'Email Address is required' })}
                            placeholder="Your Email" className="input input-bordered w-full" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type="password"
                            {...register("password", {
                                required: 'Password is Required',
                                minLength: { value: 6, message: 'password must be 6 characters or longer' }
                            })}
                            placeholder="Your Password" className="input input-bordered w-full" />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                        <label className="label"><span className="label-text">Forget Password ?</span></label>
                    </div>
                    {
                        loginError && <p className='text-red-500'>{loginError}</p>
                    }
                    <input type="submit" className='btn btn-accent w-full' value='Login' />
                </form>
                <p>If you are new this site!<Link to='/signup' className='text-secondary'>create new account</Link> </p>
                
            </div>
        </div>
    );
};

export default SignIn;