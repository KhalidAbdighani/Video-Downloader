import "./home.css"

export default function Home() {
  return (
    <div className="main" >
      <h1>DOWNLOAD FROM<br/> <span style={{color:"#FF0000"}}> YOUTUBE.</span></h1>
        <p style={{color:"#2d5a27"}}>Paste the video URL into the box below. If the link is supported, you will be able to download</p>
      
      <div className="bar">
        
          <input  style={{ flex:"3", padding:"6px 6px", background:"#f8f7e9", border:"solid 1px #2d5a27 ", borderRadius:"3px"}} typeof="text" id="URL" placeholder="https://www.youtube.com/watch?v=..."></input>
        
        <button style={{flex:"1",padding:"6px 0px"}}>Download Now</button>


      </div>

  
     
    </div>
  );
}
