import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function SideNavBar(){
    return(
        <ul className="list-inline two">
            <li className="list-item two" ><Link to="/Dashboard" className="Links" style={{padding : 0, margin : 0}}>Dashboard </Link></li>
            
            <li className="list-item" ><hr /><Link to="/zoom" className="Links">Zoom meeting Project</Link></li>
            
            <li className="list-item" ><hr /> <Link to="/Mailchimp" className="Links">Mailchimp Project</Link></li>
            
            <li  className="list-item"><hr /><Link to="/Youtube" className="Links">Youtube Video </Link></li>
           
            <li className="list-item"> <hr /><Link to="/Home" className="Links">Vimeo Video </Link> <hr /></li>
           
        </ul>
       
    )
}
export default SideNavBar;