import React from 'react';
import "./App.css";

const Video =({videoarr}) =>{
    return(
        <div className='table'>
            <ul className='Full'>
            {videoarr.map(video=>(
                <li key={video.uri} className="Videos">
                    <iframe src = {video.player_embed_url}allow="autoplay;fullscreen;picture-in-picture"width="384"height="216"allowFullScreen title="Test Recording"></iframe>
                    <p><strong>Name</strong> : {video.name}</p>
                    <p><strong>Plays</strong> : {video.stats.plays}</p>
                    <p><strong>Comments</strong> : {video.metadata.connections.comments.total}</p>
                </li>    
            ))}
            </ul>
        </div>
        
    )
}
export default Video;
