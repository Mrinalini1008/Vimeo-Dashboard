import { Navigate } from "react-router-dom";
import React from "react";

export const RequireAuth = ({children}) =>{
    const user = JSON.parse(localStorage.getItem('user'));

    if(user === null){
        return <Navigate to = '/' />
    }

    return(
        children
    )
}