import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../Contexts/AuthProvider";
import { saveUserData } from "../../shared/Utils/Utils";

const SocialLogin = () => {
    
      const { updateUser , signInWithGoogle} = useContext(AuthContext);
      const [signupError, setSignupError] = useState('');

    const validRoles = ["seller", "buyer"];
    const handleLoginWithGoogle = (event) => {
        event.preventDefault();
        const role = event.target.role.value;
        const normalizedRole = role.toLowerCase();
        console.log(normalizedRole);
        
        setSignupError('');
        
        if (!validRoles.includes(normalizedRole)) {
           //toast.error(`Must be input your role corractly!`);
           setSignupError(`Must be input your role corractly!`)
           return;
        }
        
            signInWithGoogle()
              .then((result) => {
                const user = result.user;
                toast.success(`${result?.user?.displayName} created account successfully`)
                saveUserData(user.displayName, user.email, normalizedRole)
              }).catch((error) => {
               setSignupError(error.message)
              });
       
    }

    return (
        <div>
                <form onSubmit={handleLoginWithGoogle} className=" w-full">
                    <label className="label py-0"><span className="label-text text-base md:text-lg">Choose your Role</span></label>
                    <input type="text" placeholder="Seller/Buyer" name='role' className="input input-bordered w-full" required/>
                    
                {
                    signupError && <p className='text-red-600 font-semibold bg-base-300 text-center rounded-lg mx-2 italic'>{signupError}</p>
                }
                    <input type="submit" className='btn btn-sm md:btn-md btn-primary mt-2 w-full' value='Continue with google' />
                </form>
        </div>
    );
};

export default SocialLogin;