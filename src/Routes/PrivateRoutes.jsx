import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
    const { users, loading } = useContext(AuthContext);

    if (loading) {
       return <progress className="progress w-56"></progress>
    }

    if (users?.email) {
        return children;
    }
    return <Navigate to='/login' replace></Navigate>
};

export default PrivateRoutes;