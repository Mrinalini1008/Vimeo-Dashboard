  import React, { useEffect, useRef, useState } from "react";
  import "./App.css";
  
  function Videoupload(){
    const [videoFile, setVideoFile] = useState("no file exists");
    const [uploadComplete, setUploadComplete] = useState("awaiting file upload");
    const [videoTitle, setVideoTitle] = useState("Enter File Name");
    const fileInput = useRef(null);
    const titleInput = useRef(null);
  
    useEffect(() => {
      if (uploadComplete === "complete") {
        setTimeout(() => {
          setUploadComplete("awaiting file upload");
          fileInput.current.value = "";
          titleInput.current.value = "untitled";
        }, 3000);
      }
    }, [uploadComplete]);
  
    async function uploadVideo() {
      setUploadComplete("uploading");
      const resPost = await fetch(`https://api.vimeo.com/me/videos`, {
        method: "POST",
        headers: {
          Authorization: "bearer " + "a2c4b3de90fa383f2bc05d70ce966e1d",
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
      console.log(resPost);
  
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
  
      // await fetch(dataPost.upload.upload_link, {
      //   method: "HEAD",
      //   headers: {
      //     "Tus-Resumable": "1.0.0",
      //     Accept: "application/vnd.vimeo.*+json;version=3.4",
      //   },
      // });
  
      setUploadComplete("complete");
    }
    return(
      <div>
        <main>
          <h2 className="Top">Vimeo upload</h2>
          <div className="Videoup">
          <input 
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
          
        </main>
      </div>
    );
  }

  export default Videoupload;