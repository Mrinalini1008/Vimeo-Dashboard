import React from "react";
import { Link } from "react-router-dom";
import "./App.css";
import {useAuth} from './Auth';


function NavBar(){
    const auth = useAuth();
    return(
        <div>
            <ul className="Topbar">
                <li className="Topbar-item"><span style ={{paddingLeft: '80%'}}></span><a className = "Toplink" href="/Home">Mrinalini</a></li>
            </ul> 
            <h3 className="H2">Vimeo Video</h3>
        <ul className="list-inline three">
            <li className="list-inline-item three"><Link className= "Links2" to="/Home/VideoDetails">Video Details</Link></li>
            <li className="list-inline-item three"> <Link className="Links2" to="/Home/VideoUpload">Upload Video</Link></li>
            <li className="list-inline-item three"><Link className="Links2" to="/" onClick= {auth.logout}>Logout </Link></li>
        </ul>
    </div>
        
       
    )
}
export default NavBar;