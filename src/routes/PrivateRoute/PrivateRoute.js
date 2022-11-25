import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation();

    if(loading){
        return <div className='flex justify-center mt-20'><button className="btn btn-info loading ">loading</button></div> 
    }

    if (user) {
        return children
    }
    return <Navigate to='/signin' state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;