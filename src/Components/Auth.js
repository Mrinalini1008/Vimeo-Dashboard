import { useContext } from "react";
import React, { useState, createContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider=({children})=>{
    const[user, setUser] = useState({
        email : '',
        password : '',
        id : ''
    });

    const login = (user) =>{
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    }

    const logout = () =>{
        setUser(null);
        localStorage.setItem('user', null);
    }

    return <AuthContext.Provider value ={{user, login, logout}}>{children}</AuthContext.Provider>
}

export const useAuth = () =>{
    return useContext(AuthContext);
}