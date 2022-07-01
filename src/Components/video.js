import React from 'react';
import "./App.css";
import pic from './Playsymbol.jpeg';
import SimpleDateTime from 'react-simple-timestamp-to-date';

function Video({videoarr}){
    const convert = (stamp) =>{
        return <SimpleDateTime dateFormat="DMY" dateSeparator="/"  timeSeparator=":">{stamp}</SimpleDateTime>
    }

    return(
            <ul className='list-inline one'>
            {videoarr.map(video=>(
                <li key={video.uri} className="list-inline-item one">
                    <iframe className='Vid' src = {video.player_embed_url}allow="fullscreen;picture-in-picture"width="100%"height="fit-content"allowFullScreen title={video.name}></iframe>
                    <p className = "Vidname">{video.name}</p>
                    <p className='TimeStamp'>Uploaded at : {convert(video.created_time)}</p>
                    <p className='Play'><img src = {pic} style={{height : '15px'}} alt = "Play symbol"/><span className='Plays'>{video.stats.plays} Plays</span></p>
                    <hr style ={{color : 'solid #e3e3e3',height: '0.5px' , margin: "0"}} />
                    <p style={{margin : '6%'}}><span className='CommentsNo'>{video.metadata.connections.comments.total}</span><span className='Comments'> Comments</span></p>
                </li>    
            ))}
            </ul>
        
    )
}
export default Video;