import React,{ useEffect, useState } from "react";
import Pagination from "./Pagination";
import Video from "./video";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import { useAuth } from "./Auth";
import * as Papa from "papaparse";

function VideoDetails(){
  const [dropdown, setDropdown] = useState(false);
  const[show, setShow] = useState("Select Folder");
  const toggle =() => setDropdown(prevState => !prevState)
  const [videoarr, setVideoarr] = useState([]);
  const[arr, setArr] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [vidlength, setVidlength] = useState(0);
  const auth = useAuth();
  const vimfdurl = process.env.REACT_APP_VIMEOFLDR_URL ;
  const Token = process.env.REACT_APP_VIMEO_TOKEN ;
  const userdburl = process.env.REACT_APP_USERDB_URL;
  const actionurl = process.env.REACT_APP_ACTIONDB_URL ;
  const get = localStorage.getItem('user')
  const User = JSON.parse(get);

  if(User.password !== ""){
  useEffect(()=>{
    async function folderdeets(){
      const response2 = await fetch(vimfdurl, {
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
          Accept: "application/vnd.vimeo.*+json;version=3.4",
        },
      });
      const data2 = await response2.json();
      const response3 = await fetch(userdburl, { mode: 'cors' });
      const data3 = await response3.json();
      const userarr = data3.filter(user => (user.email === User.email));
      console.log(userarr);
      User['id'] = userarr[0].id;
      localStorage.setItem('myLunch', JSON.stringify(User));
      console.log(User)
      const accessF = Papa.parse(userarr[0].access);
      const finalF = accessF.data[0];
      const finalarr = finalF.map(folder=>{
        return{
          ...folder,
          folderDs: data2.data.find(folderD => folderD.name === folder)
        }
      })
      console.log(finalarr);
      console.log(finalF);
      console.log(data2);
      console.log(userarr);
      setArr(finalarr);
    }
    folderdeets();
  },[])

  }
  else(
    useEffect(()=>{
      async function folderdeets(){
        const response2 = await fetch(vimfdurl, {
          headers: {
            Authorization: `Bearer ${Token}`,
            "Content-Type": "application/json",
            Accept: "application/vnd.vimeo.*+json;version=3.4",
          },
        });
        const data2 = await response2.json(); 
        const finalF = ['Test'];
        const finalarr = finalF.map(folder=>{
          return{
            ...folder,
            folderDs: data2.data.find(folderD => folderD.name === folder)
          }
      })
      setArr(finalarr);
    }
      folderdeets();
    },[])
  )

    async function vidoedeets(uri, name){
      const url = process.env.REACT_APP_VIMEOAPI_URL;
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
      const action = "Viewed " + name ;
      console.log(action);
      const response2 = await fetch(actionurl,{
        method : 'POST',
        mode : 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id : auth.user.id,
          action : action
        }),   
      })
      console.log(response2);
    }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = videoarr.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);


  return(
    <div className="MAIN">
      <Dropdown isOpen={dropdown} toggle={toggle} className = "Drop1">
      <DropdownToggle caret className="Drop1">
        {show}
      </DropdownToggle>
      <DropdownMenu>
        {arr.map((folder)=>{
            return <DropdownItem key={folder.folderDs.name} onClick ={()=>{setShow(folder.folderDs.name);vidoedeets(folder.folderDs.metadata.connections.videos.uri,folder.folderDs.name);}}>{folder.folderDs.name}</DropdownItem>
        })}
      
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
  )
}
export default VideoDetails;