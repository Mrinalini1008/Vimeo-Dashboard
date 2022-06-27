import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth";
import React from "react";

export const RequireAuth = ({children}) =>{
    const auth = useAuth();

    if(!auth.user.email){
        return <Navigate to = '/' />
    }

    return(
        children
    )
}