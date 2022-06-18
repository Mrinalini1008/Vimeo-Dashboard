  import React, { useEffect, useRef, useState } from "react";
  import "./App.css";
  import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
  
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
      setUploadComplete("uploading");
      const Token = "dd837f43dd0c134c14bcc10aa4a49610";
      const resPost = await fetch(`https://api.vimeo.com/me/videos`, {
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

      const putfldr = await fetch(`https://api.vimeo.com` + uri + dataPost.uri,{
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
    }
    return(
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
            return <DropdownItem key={folder.name} onClick ={()=>{setUri(folder.uri);setShow(folder.name);}}>{folder.name}</DropdownItem>
          })}
          <DropdownItem onClick={()=>{setUri("/me/videos");setShow("All Videos")}}>All Videos</DropdownItem>
          </DropdownMenu>
          </Dropdown>
          <label className="inline-label">File</label>
          <input 
            className="Fileinput"
            ref={fileInput}
            onChange={(e) => setVideoFile(e.target.files[0])}
            type="file"
          />
          <p />
          
          <p>
          <label className="inline-label">Name of the file</label>
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
    );
  }

  export default Videoupload;

  /*<main>
          <h2 className="Top"  style={{color:'#6d3088'}}>Vimeo upload</h2>
          <div className="Videoup"  style={{color:'black'}}>
          <input 
            className="Fileinput"
            ref={fileInput}
            onChange={(e) => setVideoFile(e.target.files[0])}
            type="file"
          />
          <br />
          
          <p>
          <input
            ref={titleInput}
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            type="text"
          />
          </p>
          <button className="Buttons" onClick={uploadVideo}>Upload Video</button>
          <p>
            <strong>Upload status:</strong> {uploadComplete}
          </p>
          </div>
          
        </main>*/