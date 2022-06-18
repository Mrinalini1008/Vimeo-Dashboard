import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function NavBar(){
    return(
        <div>
        <ul className="list-inline">
            <li className="list-inline-item"><Link to="/" className="btn btn-primary" style={{color : "white", textDecoration : "none"}}>Dashboard </Link></li>
            <li className="list-inline-item"><Link to="/VideoDetails"  className="btn btn-primary" style={{color : "white", textDecoration : "none"}}>Video Details</Link></li>
            <li className="list-inline-item"> <Link to="/VideoUpload"  className="btn btn-primary" style={{color : "white", textDecoration : "none"}}>Upload Video</Link></li>
        </ul>
        </div>
       
    )
}
export default NavBar;