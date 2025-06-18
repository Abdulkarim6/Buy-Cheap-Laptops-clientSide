import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../Contexts/AuthProvider";
import useSaveUserData from "../../hooks/useSaveUserData";
import { useLocation, useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";
import { useQuery } from "@tanstack/react-query";

const SocialLogin = ({currentPath}) => {
      const {logOut } = useContext(AuthContext);
      const {signInWithGoogle} = useContext(AuthContext);
      const [signupError, setSignupError] = useState('');

      const { data: allUsers = [], isLoading } = useQuery({
            queryKey: ['allUsers'],
            queryFn: async () => {
                const res = await fetch('https://cheap-laptop-server-side.vercel.app/allUsers');
                const data = await res.json();
                return data;
            }
      });

      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [role, setRole] = useState("");
      let user;
          if(name !== "" && email !== "" && role !== ""){
             user = { name, email, role };
          }
    
      const [dataSaveSuccessFully] =  useSaveUserData(user);
      const [allreadyUser, setallreadyUser] = useState(false);
  
      const location = useLocation();
      const navigate = useNavigate();
      let navigateInfo;
      if(dataSaveSuccessFully === true || allreadyUser){
        navigateInfo = { email, location, navigate };
      }
      useToken(navigateInfo);

    const [selectedRole, setSelectedRole] = useState('');
        
    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };

    const handleLoginWithGoogle = (event) => {
        event.preventDefault();
        const role = event?.target?.role?.value;
        
            signInWithGoogle()
              .then((result) => {
                const user = result?.user;
                if (user) {
                   const isExistingUser = allUsers?.some(dbUser => dbUser?.email === user?.email);
             
                    if (currentPath === "signIn") {
                       if (isExistingUser) {
                        toast.success(`${result?.user?.displayName} Login successfully`);
                        setEmail(result?.user?.email);
                        setallreadyUser(true); //for, get token process if allready user
                       } else{
                        setSignupError("You haven't account. Please Sign Up");
                
                        logOut()
                          .then(() => {})
                          .catch();
                       }
                    }

                    if (currentPath === "signUp") {
                       if (!isExistingUser) {
                         toast.success(`${result?.user?.displayName} created account successfully`);
                       }else {
                           setSignupError("You allready have an account. Please Sign In");
                           logOut()
                             .then(() => {})
                             .catch();
                           return;
                       }
                       
                       //get token process start here if new account
                       setName(user?.displayName);
                       setEmail(user?.email);
                       setRole(role);
                    }
                }  
                


              }).catch((error) => {
               setSignupError(error.message)
              });
    }

    return (
        <div>
            <form onSubmit={handleLoginWithGoogle} className=" w-full">

              {
                  currentPath === "signUp" ?
                 <>
                     <label className="label py-0">
                        <span className="label-text text-base md:text-lg">Choose your Role</span>
                    </label>
                    <select name="role" className="input input-bordered w-full" required
                      onChange={handleRoleChange}
                      value={selectedRole}
                    >
                        <option value="" disabled hidden>Select a role</option>
                        <option value="seller">seller</option>
                        <option value="buyer">buyer</option>
                    </select>
                 </> : ""
              }
              <input type="submit" className='btn btn-sm md:btn-md btn-primary mt-2 w-full' value={`${currentPath} with google`} />
              {
                signupError && <p className='text-red-600 font-semibold bg-base-300 text-center rounded-lg mx-2 italic'>{signupError}</p>
              }
            </form>
        </div>
    );
};

export default SocialLogin;

/**
* With GOOGLE
1. If an user haven't an account, the user cant't 'Signin' and 'SignUp' by 'signIn page'.
2. If an user have an account, the user can only 'Signin' without 'SignUp' by 'signIn page'.

3. If an user haven't an account, the user can only 'SignUp' without 'SignIn' by 'signUp page'.
4. If an user have an account, the user can't 'SignUp' and 'Signin' by 'signUp page'.
   He will get warning that, [You allready have an account. Please Sign In]
*/