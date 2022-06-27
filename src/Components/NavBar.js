import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function NavBar(){
    return(
        <ul className="list-inline">
            <li className="list-inline-item"><Link to="/Home" className="btn btn-primary" style={{ backgroundColor : '#6d3088', borderColor : '#6d3088'}}>Dashboard </Link></li>
            <li className="list-inline-item"><Link to="/Home/VideoDetails"  className="btn btn-primary one" style={{backgroundColor : '#6d3088', borderColor : '#6d3088'}}>Video Details</Link></li>
            <li className="list-inline-item"> <Link to="/Home/VideoUpload"  className="btn btn-primary" style={{backgroundColor : '#6d3088', borderColor : '#6d3088'}}>Upload Video</Link></li>
            <li className="list-inline-item"><Link to="/" className="btn btn-primary" style={{backgroundColor : '#6d3088',borderColor : '#6d3088'}}>Logout </Link></li>
        </ul>
       
    )
}
export default NavBar;