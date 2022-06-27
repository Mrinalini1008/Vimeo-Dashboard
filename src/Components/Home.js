import React from "react";
import { useAuth } from "./Auth";
import NavBar from "./NavBar";
import './App.css';

function Home(){
    const auth = useAuth();
    console.log(auth.user)
    const logourl = process.env.REACT_APP_LOGO_URL;

    return(
        <div className="MAIN">
            <div className="Header">
                <img className="Logo" src = {logourl} alt="logo"/>
                <NavBar />
            </div>
            
            <div className="Home">
                <p>This is the dashboard. Welcome {auth.user.email}</p>
            </div>
            
        </div>
    )
}
export default Home;