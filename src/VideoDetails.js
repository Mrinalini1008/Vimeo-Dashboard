import React,{ useEffect, useState } from "react";
import Pagination from "./Pagination";
import "./App.css";
import Video from "./video";

function VideoDetails(){
  const [videoarr, setVideoarr] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);
  const [vidlength, setVidlength] = useState(0);
  useEffect(()=>{
    async function vidoedeets(){
      const Token = "a2c4b3de90fa383f2bc05d70ce966e1d";
      const url = `https://api.vimeo.com/me/videos`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setVidlength(data.data.length); 
      console.log(vidlength)
      setVideoarr(data.data);
    }
   vidoedeets()
  }, [])

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = videoarr.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return(
    <div className="Centre">
        <h2 className="Top">Video Details</h2>
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

 