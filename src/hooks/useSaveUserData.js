import { useEffect, useState } from "react";

const useSaveUserData = (userData) => {
    const [dataSaveSuccessFully, setDataSaveSuccessfully] = useState(false);
    const email = userData?.email;
    const name = userData?.name;
    const role = userData?.role;

    useEffect(() => {
      if (email && name && role) {
        const user = {name, email, role};
        
        fetch('https://cheap-laptop-server-side.vercel.app/users', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setDataSaveSuccessfully(data?.acknowledged)
            });
      }
    }, [name, email, role]);
    
    return[dataSaveSuccessFully]
};

export default useSaveUserData;