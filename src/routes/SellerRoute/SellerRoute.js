import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import useSeller from '../../hooks/useSeller';


const SellerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isSeller, isSellerLoading] = useSeller(user?.email);
    const location = useLocation();

    if (loading || isSellerLoading) {
        return <div className='flex justify-center mt-20'><button className="btn btn-info loading ">loading</button></div> 
    }

    if (user && isSeller) {
        return children;
    }

    return <Navigate to="/signin" state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;