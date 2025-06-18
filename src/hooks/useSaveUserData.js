import { useEffect, useState } from "react";

const useSaveUserData = (user) => {
    const [dataSaveSuccessFully, setDataSaveSuccessfully] = useState("");

    useEffect(() => {
      if (user) {
        fetch('https://cheap-laptop-server-side.vercel.app/users', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setDataSaveSuccessfully(data?.acknowledged)
            });
      }
    }, [user]);
    
    return[dataSaveSuccessFully]
};

export default useSaveUserData;