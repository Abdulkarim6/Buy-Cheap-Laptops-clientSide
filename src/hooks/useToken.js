import { useEffect} from "react";

const useToken = (info) => {
  console.log("email", info?.email, "location", info?.location, "navigate", info?.navigate);
   const from = info?.location?.state?.from?.pathname || "/";
     
   useEffect(() => {
    if (info?.email) {
       fetch(`http://localhost:5000/jwt?email=${info?.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
            info?.navigate(from, { replace: true });
             
          }
        });
    }
  }, [info?.email, from, info?.navigate, info]);
};

export default useToken;
