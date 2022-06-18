import React from "react";
import VideoDetails from "./VideoDetails";
import Videoupload from "./VideoUpload";
import NavBar from "./NavBar";
import Dashboard from "./Dashboard";
import "./App.css";
import { Route, Routes, Navigate} from "react-router-dom";

export default function App(){
    return(
        <div className="MAIN">
            <img className="Logo" src = "https://www.speedlabs.in/wp-content/uploads/2022/01/logo-final.png" alt="logo"/>
            <NavBar />
            <Routes>
                <Route>
                    <Route exact path="/Dashboard" element={<Dashboard />}/>
                    <Route exact path="/VideoDetails" element={<VideoDetails />}/>
                    <Route exact path="/VideoUpload" element={<Videoupload />}/>
                    <Route path="*" element={<Navigate to="/Dashboard" replace />} />
                </Route>
                
            </Routes>
            
        </div>
    )
}