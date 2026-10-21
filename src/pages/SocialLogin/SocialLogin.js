import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../Contexts/AuthProvider";
import useSaveUserData from "../../hooks/useSaveUserData";
import { useLocation, useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";
import { useQuery } from "@tanstack/react-query";

const SocialLogin = ({ currentPath, selectedRole }) => {
  const { logOut, signInWithGoogle } = useContext(AuthContext);
  const [signupError, setSignupError] = useState('');

  const { data: allUsers = [] } = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const res = await fetch('https://cheap-laptop-server-side.vercel.app/allUsers');
      return await res.json();
    }
  });

  const [userData, setUserData] = useState({ name: "", email: "", role: "" });
  const [dataSaveSuccessFully] = useSaveUserData(userData);
  const [alreadyUserEmail, setAlreadyUserEmail] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  let navigateInfo = null;
  const targetEmail = currentPath === "signUp" ? userData?.email : alreadyUserEmail;

  if ((dataSaveSuccessFully && targetEmail) || alreadyUserEmail) {
    navigateInfo = { email: targetEmail, location, navigate };
  }
  
  useToken(navigateInfo);

  const resetStates = () => {
    setUserData({ name: "", email: "", role: "" });
    setAlreadyUserEmail("");
  };

  const handleLoginWithGoogle = (event) => {
    event.preventDefault();
    setSignupError('');

    if (currentPath === "signUp" && !selectedRole) {
      setSignupError("Please select a role above first!");
      return;
    }

    signInWithGoogle()
      .then((result) => {
        const user = result?.user;

        if (user) {
          const isExistsUser = allUsers?.find(dbUser => dbUser?.email === user?.email);

          // 1. SignIn Flow
          if (currentPath === "signIn") {
            if (isExistsUser) {
              setAlreadyUserEmail(user?.email);
            } else {
              setSignupError("You don't have an account. Please Sign Up");
              resetStates();
              logOut();
            }
          }

          // 2. SignUp Flow
          if (currentPath === "signUp") {
            if (!isExistsUser) {
              toast.success(`${result?.user?.displayName} created account successfully`);
              setUserData({
                name: user?.displayName || "",
                email: user?.email || "",
                role: selectedRole?.toLowerCase() || ""
              });
            } else {
              setSignupError("You already have an account. Please Sign In");
              resetStates();
              logOut();
            }
          }
        }
      })
      .catch((error) => {
        setSignupError(error.message);
      });
  };

  return (
    <div>
      <form onSubmit={handleLoginWithGoogle} className="w-full">
        <input
          type="submit"
          className="btn btn-sm md:btn-md btn-primary mt-2 w-full bg-cyan-500 text-slate-950 border border-slate-700 hover:bg-cyan-400 cursor-pointer font-bold"
          value={`${currentPath} with google`}
        />

        {signupError && (
          <p className="text-red-400 font-medium text-xs text-center mt-2">
            {signupError}
          </p>
        )}
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