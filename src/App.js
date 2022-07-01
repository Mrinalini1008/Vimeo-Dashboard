import React from "react";
import "./Components/App.css";
import { Route, Routes} from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import { AuthProvider } from "./Components/Auth";
import { RequireAuth } from "./Components/RequireAuth";

export default function App(){
    console.log(process.env);
    return(
        <div className="MAIN">
            <AuthProvider>
                <Routes>
                   <Route exact path="/" element={<Login />}/>
                   <Route exact path="/Home/*" element={<RequireAuth><Home /></RequireAuth>}/>
                </Routes>
            </AuthProvider>
            
            
        </div>
    )
}