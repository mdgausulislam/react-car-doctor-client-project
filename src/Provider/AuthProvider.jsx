import React, { createContext, useState } from 'react';
import { getAuth } from "firebase/auth";
import app from '../Firebase/firebase.config';



const auth = getAuth(app);
export const AuthContext=createContext();

const AuthProvider = ({children}) => {
    const [users,setUsers]=useState(null);
    const [loading,setLoading]=useState(true);
    const authInfo={
        users,
        loading
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;