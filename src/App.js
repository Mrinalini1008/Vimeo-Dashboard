import React from "react";
import Home from "./Components/Home";
import "./Components/App.css";
import { Route, Routes} from "react-router-dom";
import Login from "./Components/Login";
import VideoDetails from "./Components/VideoDetails";
import Videoupload from "./Components/VideoUpload";
import { AuthProvider } from "./Components/Auth";
import { RequireAuth } from "./Components/RequireAuth";

export default function App(){
    console.log(process.env);
    return(
        <div className="MAIN">
            <AuthProvider>
                <Routes>
                   <Route exact path="/" element={<Login />}/>
                   <Route exact path="/Home" element={<Home/>}/>
                   <Route exact path="/Home/VideoDetails" element={<RequireAuth><VideoDetails /></RequireAuth>}/>
                   <Route exact path="/Home/VideoUpload" element={<RequireAuth><Videoupload /></RequireAuth>}/>
                
                </Routes>
            </AuthProvider>
            
            
        </div>
    )
}