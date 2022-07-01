import React from "react";
import { Route, Routes} from "react-router-dom";
import {RequireAuth} from "./RequireAuth";
import { AuthProvider } from "./Auth";
import VideoDetails from './VideoDetails';
import Videoupload from './VideoUpload';
import SideNavBar from "./SideNav";
import NavBar from "./NavBar";

export default function Home (){
    return(
        <div className="Display">
            <SideNavBar />
            <div className="Main">
          <NavBar /> 
        <AuthProvider>
            <Routes>
                <Route exact path="/VideoDetails" element={<RequireAuth><VideoDetails /></RequireAuth>}/>
                <Route exact path="/VideoUpload" element={<RequireAuth><Videoupload /></RequireAuth>}/>
            </Routes>
        </AuthProvider>
        </div>
        </div>
    )
}