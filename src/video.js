import React, { useEffect } from 'react';
import "./App.css";
import * as Papa from 'papaparse';
import { useState } from "react";

const Video =({videoarr}) =>{
    const [data2, setData2] = useState([]);
    useEffect(()=>{
        fetch( './stats_export.csv' )
    .then( response => response.text() )
    .then( responseText => {
        // -- parse csv
        const data2 = Papa.parse(responseText);
        console.log('data:', data2);
        setData2(data2.data);
    });
    }, [])
    const videowithstats=videoarr.map(video=>{
        return {
        ...video,
        stats2: data2.find(stats2=> stats2[7]===video.name) // or some relation between posts and images
        }
        
    })
    console.log(videowithstats);
    

    return(
        
        <div className='table'>
            <ul className='Full'>
            {videowithstats.map(video=>(
                <li key={video.uri} className="Videos">
                    <iframe src = {video.player_embed_url}allow="autoplay;fullscreen;picture-in-picture"width="384"height="216"allowFullScreen title="Test Recording"></iframe>
                    <p><strong>Name</strong> : {video.name}</p>
                    <p><strong>Plays</strong> : {video.stats.plays}</p>
                    <p><strong>Comments</strong> : {video.metadata.connections.comments.total}</p>
                    <p><strong>Finishes</strong> : {video.stats2[2]}</p>
                </li>    
            ))}
            </ul>
        </div>
        
    )
}
export default Video;
