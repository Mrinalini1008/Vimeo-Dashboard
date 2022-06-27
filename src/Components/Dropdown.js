import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import VideoDetails from "../VideoDetails";

function DropdownM({arr}){
    const [dropdown, setDropdown] = useState(false);
    const[show, setShow] = useState("Select Folder");
    const toggle =() => setDropdown(prevState => !prevState)
    return(
    <div>
    <div className="d-flex justify-content-center p-5">
    <Dropdown isOpen={dropdown} toggle={toggle}>
    <DropdownToggle caret>
      {show}
    </DropdownToggle>
    <DropdownMenu
    >
        {arr.map((folder)=>{
            return <DropdownItem key={folder.name} onClick ={()=>setShow(folder.metadata.connections.videos.uri)}>{folder.name}</DropdownItem>
        })}
      
    </DropdownMenu>
    </Dropdown>
    </div>
    </div>
    )
}
export default DropdownM;
