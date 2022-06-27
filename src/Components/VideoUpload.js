  import React, { useEffect, useRef, useState } from "react";
  import "./App.css";
  import NavBar from "./NavBar";
  import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
  import { useAuth } from "./Auth";
  import * as Papa from "papaparse";
  
  function Videoupload(){
    const [videoFile, setVideoFile] = useState("no file exists");
    const [uploadComplete, setUploadComplete] = useState("awaiting file upload");
    const [videoTitle, setVideoTitle] = useState("Enter File Name");
    const fileInput = useRef(null);
    const titleInput = useRef(null);
    const [dropdown, setDropdown] = useState(false);
    const[show, setShow] = useState("Select Folder");
    const toggle =() => setDropdown(prevState => !prevState);
    const[arr, setArr] = useState([]);
    const[uri, setUri] = useState("");
    const auth = useAuth();
    const vimfdurl = process.env.REACT_APP_VIMEOFLDR_URL ;
    const Token = process.env.REACT_APP_VIMEO_TOKEN ;
    const userdburl = process.env.REACT_APP_USERDB_URL;
    const actionurl = process.env.REACT_APP_ACTIONDB_URL ;

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
        const userarr = data3.filter(user => (user.email === auth.user.email));
        auth.user.id = userarr[0].id;
        console.log(auth.user.id)
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
    },[]);

    useEffect(() => {
      if (uploadComplete === "complete") {
        setTimeout(() => {
          setUploadComplete("Awaiting file upload");
          fileInput.current.value = "";
          titleInput.current.value = "untitled";
        }, 5000);
      }
    }, [uploadComplete]);
  
    async function uploadVideo(uri) {
      if (uri === "") {
        console.log("Err!");
        if(show === "Select Folder"){
          setUploadComplete("Please select a folder");
        }
        else{
          setUploadComplete("Please select a file");
        }
        return false;
      }
      if (videoFile === "no file exists"){
        setUploadComplete("Please select a file");
        return false
      }
      setUploadComplete("uploading");
      const resPost = await fetch(process.env.REACT_APP_VIMEOVID_URL, {
        method: "POST",
        headers: {
          Authorization: "bearer " + Token ,
          "Content-Type": "application/json",
          Accept: "application/vnd.vimeo.*+json;version=3.4",
        },
        body: JSON.stringify({
          upload: {
            approach: "tus",
            size: videoFile.size,
          },
          name: videoTitle,
        }),
      });
      const dataPost = await resPost.json();
      console.log(dataPost);
  
      const resPatch = await fetch(dataPost.upload.upload_link, {
        method: "PATCH",
        headers: {
          "Tus-Resumable": "1.0.0",
          "Upload-Offset": "0",
          "Content-Type": "application/offset+octet-stream",
          Accept: "application/vnd.vimeo.*+json;version=3.4",
        },
        body: videoFile,
      });
      console.log(resPatch);

      const putfldr = await fetch(process.env.REACT_APP_VIMEOAPI_URL + uri + dataPost.uri,{
        method : "PUT",
        headers: {
          Authorization: "bearer " + Token ,
          "Content-Type": "application/json",
          Accept: "application/vnd.vimeo.*+json;version=3.4",
        }
      })

      console.log(putfldr);

  
      // await fetch(dataPost.upload.upload_link, {
      //   method: "HEAD",
      //   headers: {
      //     "Tus-Resumable": "1.0.0",
      //     Accept: "application/vnd.vimeo.*+json;version=3.4",
      //   },
      // });
  
      setUploadComplete("Complete!");
      const action = "Uploaded " + videoTitle + " to folder " + show ;
      console.log(action);
      const response = await fetch(actionurl,{
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
      console.log(response);
    }

    const logourl = process.env.REACT_APP_LOGO_URL;
    
    return(
      <div className="MAIN">
        <div className="Header">
          <img className="Logo" src = {logourl} alt="logo"/>
          <NavBar />
        </div>  
      <div className="Videoup">
        <main className="UPbox">
          <h2 className ="H1">Upload A video</h2>
          <hr />
          <div className="CEN">
          <Dropdown isOpen={dropdown} toggle={toggle}>
          <DropdownToggle caret>
          {show}
          </DropdownToggle>
          <DropdownMenu>
          {arr.map((folder)=>{
            return <DropdownItem key={folder.folderDs.name} onClick ={()=>{setUri(folder.folderDs.uri);setShow(folder.folderDs.name);}}>{folder.folderDs.name}</DropdownItem>
          })}
          </DropdownMenu>
          </Dropdown>
          <label className="label">File</label>
          <input 
            className="Fileinput"
            ref={fileInput}
            onChange={(e) => setVideoFile(e.target.files[0])}
            type="file"
          />
          <p />
          
          <p>
          <label className="label">Name of the file</label>
          <input
            className="Fileinput2"
            ref={titleInput}
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            type="text"
          />
          </p>
          <button className="Buttons" style={{color : "white"}} onClick={()=>uploadVideo(uri)}>Upload Video</button>
          <p>
            <small><strong>Upload status:</strong> {uploadComplete}</small>
          </p>
          </div>
       </main>
      </div>
      </div>
    );
  }

  export default Videoupload;