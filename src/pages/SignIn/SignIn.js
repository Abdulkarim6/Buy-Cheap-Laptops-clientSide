import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import toast from 'react-hot-toast';
import SocialLogin from '../SocialLogin/SocialLogin';
import useToken from '../../hooks/useToken';


const SignIn = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const { signIn} = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    const [loginUserEmail, setLoginUserEmail] = useState("");
    const navigateInfo = loginUserEmail ? { email: loginUserEmail, location, navigate } : null;
    useToken(navigateInfo);

    const handleLogin = data => {
        setLoginError('')
        signIn(data.email, data.password)
            .then((result) => {
                const user = result.user;
                setLoginUserEmail(user?.email)
                // Note: After set user email, navigate process will be complete through useToken hook
            })
            .catch(error => {
                if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
                    setLoginError("Invalid email or password. Please try again.");
                } else {
                    setLoginError(error.message);
                }
            });
    }


    return (
        <div className='min-h-[80vh] flex justify-center items-center px-4 my-6'>
        <div className='w-full max-w-md border border-slate-700 bg-slate-800/90 shadow-2xl p-8 rounded-2xl text-slate-100 backdrop-blur-md'>
            
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-6">Login</h2>
            
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                
                {/* Email Field */}
                <div className="form-control w-full">
                    <label className="label pb-1">
                        <span className="label-text text-slate-300 font-medium">Email</span>
                    </label>
                    <input 
                        type="email"
                        {...register("email", { required: "Email is required" })}
                        placeholder="Your Email" 
                        className="input w-full bg-slate-900 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none rounded-lg text-sm" 
                    />
                    {errors.email && <p className='text-red-400 text-xs mt-1 font-medium'>{errors.email?.message}</p>}
                </div>

                {/* Password Field */}
                <div className="form-control w-full">
                    <label className="label pb-1">
                        <span className="label-text text-slate-300 font-medium">Password</span>
                    </label>
                    <input 
                        type="password"
                        {...register("password", { required: "Password is required" })}
                        placeholder="Your Password" 
                        className="input w-full bg-slate-900 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none rounded-lg text-sm" 
                    />
                    {errors.password && <p className='text-red-400 text-xs mt-1 font-medium'>{errors.password?.message}</p>}
                    
                    {/* <div className="text-right mt-1">
                        <span className="text-xs text-cyan-400 hover:underline cursor-pointer">Forgot Password?</span>
                    </div> */}
                </div>

                {/* Submit Button */}
                <input 
                    type="submit" 
                    className='btn bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold border-none rounded-lg w-full transition-all duration-200 mt-2' 
                    value='LOGIN' 
                />

                {/* Error Message */}
                {loginError && <p className='text-red-400 text-xs font-medium text-center mt-2'>{loginError}</p>}
            </form>

            <p className='text-sm text-slate-400 mt-3'>
                New to this site? 
                <Link to='/signup' className='text-cyan-400 hover:underline font-medium ml-1'>
                    create new account
                </Link> 
            </p>

            <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-700"></div>
                <span className="flex-shrink mx-3 text-slate-500 text-xs">OR</span>
                <div className="flex-grow border-t border-slate-700"></div>
            </div>

            <SocialLogin currentPath="signIn" selectedRole="" />
        </div>
    </div>
    );
};

export default SignIn;