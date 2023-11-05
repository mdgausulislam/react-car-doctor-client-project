import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
    const { users, loading } = useContext(AuthContext);
    const location=useLocation()

    if (loading) {
       return <progress className="progress w-56"></progress>
    }

    if (users?.email) {
        return children;
    }
    return <Navigate to='/login' state={{from:location}} replace></Navigate>
};

export default PrivateRoutes;