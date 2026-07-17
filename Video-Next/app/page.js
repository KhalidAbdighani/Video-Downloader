"use client"
import "./home.css"
import { useState } from "react";
export default function Home() {

  const [URLbox, SetURLbox] =useState("")
  const [loading, Setloading] =useState("")

  const download= async ()=>{

    if(!URLbox.trim()){
      return alert("Enter a video URL")
    }
    try{
      Setloading(true)
      const response = await fetch("http://localhost:5000/download",
        {
          method:"POST",
          credentials:"include",

           headers: {
        "Content-Type": "application/json",
          },

          body: JSON.stringify({url:URLbox})
        })
        const data = await response.json()
        console.log(data)
        if (!response.ok) {
      throw new Error("Download failed");
    }
    
    
    
    
    
    
    
      } catch{

    }
  }

  return (
    <div className="main" >
      <h1>DOWNLOAD FROM<br/> <span style={{color:"#FF0000"}}> YOUTUBE.</span></h1>
        <p style={{color:"#2d5a27"}}>Paste the video URL into the box below. If the link is supported, you will be able to download</p>
      
      <div className="bar">
        
          <input value={URLbox} onChange={(e)=>SetURLbox(e.target.value)}  style={{ flex:"3", padding:"6px 6px", background:"#f8f7e9", border:"solid 1px #2d5a27 ", borderRadius:"3px"}} type="text" id="URL" placeholder="https://www.youtube.com/watch?v=..."></input>
        
        <button onClick={download} disabled={loading} style={{flex:"1",padding:"6px 0px"}}>{loading?"Downloading..":"Download Now"}</button>


      </div>

  
     
    </div>
  );
}
