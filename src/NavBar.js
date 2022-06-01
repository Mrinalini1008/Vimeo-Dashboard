import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function NavBar(){
    return(
        <ul className="NavL">
            <li className="Nav"><Link to="/">Home</Link></li>
            <li className="Nav"><Link to="/VideoDetails">Video Details</Link></li>
            <li className="Nav"><Link to="/VideoUpload">Upload Video</Link></li>
        </ul>
    )
}
export default NavBar;