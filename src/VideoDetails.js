import React,{ useEffect, useState } from "react";
import Pagination from "./Pagination";
import Video from "./video";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";

function VideoDetails(){
  const [dropdown, setDropdown] = useState(false);
  const[show, setShow] = useState("Select Folder");
  const toggle =() => setDropdown(prevState => !prevState)
  const [videoarr, setVideoarr] = useState([]);
  const[arr, setArr] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const [vidlength, setVidlength] = useState(0);
  useEffect(()=>{
    async function folderdeets(){
      const Token = "dd837f43dd0c134c14bcc10aa4a49610";
      const url2 = 'https://api.vimeo.com/me/projects';
      const response2 = await fetch(url2, {
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
          Accept: "application/vnd.vimeo.*+json;version=3.4",
        },
      });
      const data2 = await response2.json();
      console.log(data2);
      setArr(data2.data);
    }
    folderdeets();
  },[])
    
    async function vidoedeets(uri){
      const Token = "dd837f43dd0c134c14bcc10aa4a49610";
      const url = `https://api.vimeo.com`;
      if (uri === "none") {
        uri = "/me/videos";
      }
      const response = await fetch(url + uri, {
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
          Accept: "application/vnd.vimeo.*+json;version=3.4",
        },
      });
     
      const data = await response.json();
      console.log(data);
      setVidlength(data.data.length); 
      setVideoarr(data.data);
    }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = videoarr.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return(
    <div className="Centre">
      <div className="Box">
      <h2 className="H1">Video Details</h2>
        <hr />
      <Dropdown isOpen={dropdown} toggle={toggle}>
      <DropdownToggle caret>
        {show}
      </DropdownToggle>
      <DropdownMenu>
        {arr.map((folder)=>{
            return <DropdownItem key={folder.name} onClick ={()=>{vidoedeets(folder.metadata.connections.videos.uri);setShow(folder.name);}}>{folder.name}</DropdownItem>
        })}
        <DropdownItem onClick={()=>{vidoedeets("none");setShow("All Videos")}}>All Videos</DropdownItem>
      
      </DropdownMenu>
      </Dropdown>
        <div>
          <Video videoarr={currentPosts}/>
        </div>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={vidlength}
          paginate={paginate}
        />
    </div>
    </div>
    
  )
}
export default VideoDetails;