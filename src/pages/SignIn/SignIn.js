import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import toast from 'react-hot-toast';
import useToken from '../../hooks/useToken';
import { useEffect } from 'react';
import SocialLogin from '../SocialLogin/SocialLogin';


const SignIn = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const { signIn} = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');

    const [loginUserEmail, setLoginUserEmail] = useState('')
    const [token] = useToken(loginUserEmail)

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [navigate, token, from])


    const handleLogin = data => {
        setLoginError('')
        signIn(data.email, data.password)
            .then((result) => {
                const user = result.user;
                toast.success(`${user.displayName} Login Successfully`);
                setLoginUserEmail(data.email)
            })
            .catch(error => {
                setLoginError(error.code)
                //const errorMessage = error.message;
              });
    }


    return (
        <div className='h-[500px] flex justify-center items-center'>
            <div className='w-96 borderd'>
                <h2 className="text-3xl md:text-5xl font-semibold text-center ">Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text text-base md:text-lg">Email</span></label>
                        <input type="text"
                            {...register("email")}
                            placeholder="Your Email" className="input input-bordered w-full" required />
                        {errors.email && <p className='text-red-600 font-semibold italic'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text text-base md:text-lg">Password</span></label>
                        <input type="password"
                            {...register("password")}
                            placeholder="Your Password" className="input input-bordered w-full" required/>
                        {errors.password && <p className='text-red-600 font-semibold italic'>{errors.password?.message}</p>}
                        <label className="label"><span className="label-text text-base md:text-lg">Forget Password ?</span></label>
                    </div>
                    <input type="submit" className='btn btn-sm md:btn-md btn-primary w-full' value='Login' />
                    {
                        loginError && <p className='text-red-600 font-semibold italic'>{loginError}</p>
                    }
                </form>
                <p className='text-base md:text-lg'>You are new in this site?<Link to='/signup' className='text-blue-900 underline ml-2'>create new account</Link> </p>
            
               <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default SignIn;