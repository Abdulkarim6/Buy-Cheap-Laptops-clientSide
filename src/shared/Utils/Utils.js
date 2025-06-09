
export const saveUserData = (name, email, role) => {
        const user = { name, email, role }; 
   
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

            });
        
};