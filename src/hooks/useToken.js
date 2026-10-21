import { useContext, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthProvider";
import toast from "react-hot-toast";

const useToken = (info) => {
  const email = info?.email;
  const navigate = info?.navigate;
  const from = info?.location?.state?.from?.pathname || "/";
  const { user, logOut } = useContext(AuthContext);
  const displayName = user?.displayName;

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/jwt?email=${email}`)
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) {
            const error = new Error(data.message || "Failed to fetch token");
            error.status = res.status // assign status code from server
            throw error;
          }

          return data;
        })
        .then((data) => {
          if (data?.accessToken) {
            localStorage.setItem("accessToken", data?.accessToken);
            const userName = displayName || "";

            toast.success(`${userName} Login Successfully`);
            if (navigate) {
              navigate(from, { replace: true });
            }
          }
        })
        .catch((error) => {
          logOut();
          
          console.error("Token Error:", error);
          toast.error(error.message || "Something went wrong! Please try again.");

        });
    }
  }, [email, from, navigate, logOut, displayName]);
};

export default useToken;
