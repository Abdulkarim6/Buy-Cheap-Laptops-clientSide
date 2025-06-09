import { useEffect, useState } from "react";

const useSaveUserData = (user) => {
    const [dataSaveSuccessFully, setDataSaveSuccessfully] = useState("");

    useEffect(() => {
      if (user) {
        console.log(user);
        
        fetch('http://localhost:5000/users', {
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