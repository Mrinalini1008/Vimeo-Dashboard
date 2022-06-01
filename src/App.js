import React from "react";
import VideoDetails from "./VideoDetails";
import Videoupload from "./VideoUpload";
import NavBar from "./NavBar";
import Home from "./Home";
import "./App.css";
import { Route, Routes, Navigate} from "react-router-dom";

export default function App(){
    return(
        <div className="MAIN">
            <h1 className="Head">Vimeo Dashboard</h1>
            <NavBar />
            <Routes>
                <Route>
                    <Route exact path="/Home" element={<Home />}/>
                    <Route exact path="/VideoDetails" element={<VideoDetails />}/>
                    <Route exact path="/VideoUpload" element={<Videoupload />}/>
                    <Route path="*" element={<Navigate to="/Home" replace />} />
                </Route>
                
            </Routes>
            
        </div>
    )
}