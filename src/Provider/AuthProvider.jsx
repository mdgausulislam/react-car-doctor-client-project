import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../Firebase/firebase.config';



const auth = getAuth(app);
export const AuthContext=createContext();

const AuthProvider = ({children}) => {
    const [users,setUsers]=useState(null);
    const [loading,setLoading]=useState(true);


    const createUser=(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const login=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut=()=>{
        return signOut(auth);
    }
    useEffect(()=>{
       const unsubscribe= onAuthStateChanged(auth, currentUser=>{
            setUsers(currentUser);
            console.log('current user',currentUser);
            setLoading(false)
        })
        return ()=>{
            return unsubscribe;
        }
    },[])
    const authInfo={
        users,
        loading,
        createUser,
        login,
        logOut,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;