"use client"
import "./home.css"
import { useState,useEffect } from "react";
import { io } from "socket.io-client";

export default function Home() {

  const [URLbox, SetURLbox] =useState("")
  const [loading, Setloading] =useState("")
  const [progress, setProgress]=useState(0)

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


        if(!response.ok){
          throw new Error("Download failed on server")

        }
        const blob = await response.blob()
        const bloburl= URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href=bloburl
        a.download="downloaded-Video.mp4"
        
        a.click()
        window.URL.revokeObjectURL(bloburl);
        

        setProgress(0)
      } catch(err){
        console.log(err)
        alert("URL seems to be not supported");


    } finally{
      Setloading(false)
      setProgress(0)
    }
  }
// socket 

    useEffect(() => {

    const socket = io("http://localhost:5000");

    socket.on("progress", (data) => {

        setProgress(data.percent);

    });

    return () => {
        socket.disconnect();
    };

}, []);

  return (
    <div className="main" >
      <h1>DOWNLOAD FROM<br/> <span style={{color:"#FF0000"}}> YOUTUBE.</span></h1>
        <p style={{color:"#2d5a27"}}>Paste video URL into the box below. If the link is supported, you will be able to download</p>
      
      <div className="bar">
        
          <input value={URLbox} onChange={(e)=>SetURLbox(e.target.value)}  style={{ flex:"3", padding:"6px 6px", background:"#f8f7e9", border:"solid 1px #2d5a27 ", borderRadius:"3px"}} type="text" id="URL" placeholder="https://www.youtube.com/watch?v=..."></input>
        
        <button onClick={download} disabled={loading} style={{
    flex: "1",
    padding: "8px 16px",
    whiteSpace: "nowrap",       
    minWidth: "fit-content",  
    cursor: "pointer"
  }}>
    
    {loading?"Downloading..":"Download Now"}</button>


      </div>

      {loading &&(
        <div>

               <p style={{
        whiteSpace: "nowrap",
        display: "flex",
        alignItems: "center",
        gap: "6px"
      }} >Downloading --</p>
                    <div style={{width:"100%", height:"2px", background:"#ddd", borderRadius:"15px", overflow:"hidden"}}>
                    <div style={{width:`${progress}%`, height:"100%", background:"rgb(43, 67, 17)", transition:"width .2s linear"}}></div>
                    </div>

                    <p>{progress}%</p>


        </div>
      )}
     
    </div>
  );
}

