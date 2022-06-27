import React from 'react';
import "./App.css";

function Video({videoarr}){
    

    return(
            <ul className='list-inline one'>
            {videoarr.map(video=>(
                <li key={video.uri} className="list-inline-item one">
                    <iframe className='Vid' src = {video.player_embed_url}allow="fullscreen;picture-in-picture"width="auto"height="auto"allowFullScreen title={video.name}></iframe>
                    <p><strong style={{color :"#333132"}}>Name</strong> : {video.name}</p>
                    <p><strong style={{color :"#333132"}}>Plays</strong> : {video.stats.plays}</p>
                    <p><strong style={{color :"#333132"}}>Comments</strong> : {video.metadata.connections.comments.total}</p>
                </li>    
            ))}
            </ul>
        
    )
}
export default Video;