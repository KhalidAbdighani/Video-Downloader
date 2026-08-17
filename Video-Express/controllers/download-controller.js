const ytDlp = require("yt-dlp-exec");
const path = require("path");
const fs = require("fs");
const os = require("os");
const postdownload= async  (req,res)=>{

     const io = req.app.get("io");

  const { url } = req.body;
   if (!url) {
    return res.status(400).json({
        message: "URL is required"
    });
}

  
try{
  const cookiesPath = path.join(__dirname, "../cookies.txt");
 
const vidinfo = await ytDlp(url,{
    dumpSingleJson:true,
    noWarnings: true,
    forceIpv4: true,
   
    cookies: cookiesPath
});

const fileName = vidinfo.title.replace(/[<>:"/\\|?*]/g, "").trim() || "downloaded_video";
const tempFilePath = path.join(os.tmpdir(), `yt_${Date.now()}.mp4`);



const subprocess = ytDlp.exec(url, {
  output: tempFilePath, 
  format: "bestvideo[height<=1080]+bestaudio/best[height<=1080]/best",
  newline: true,
  noCheckCertificates: true,
  forceIpv4: true,
  concurrentFragments: 5,
 
   cookies: cookiesPath,
  mergeOutputFormat: "mp4"
});



subprocess.stdout.on("data", (data) => {
      const line = data.toString();
      const match = line.match(/\[download\]\s+([\d.]+)%/);
      if (match) {
        const percent = parseFloat(match[1]);
        io.emit("progress", { percent });
      }
    });
    
    await subprocess;

    res.download(tempFilePath, `${fileName}.mp4`, (err) => {
      if (err) {
        console.error("Send Error:", err);
      }

  
      if (fs.existsSync(tempFilePath)) {
        fs.unlink(tempFilePath, (unlinkErr) => {
          if (unlinkErr) console.error("Unlink error:", unlinkErr);
        });
      }
    });


   


}catch (err) {

        console.log(err);

        if (!res.headersSent) {
      res.status(500).json({
        message: "Download failed"
      });
    }

    }


}

module.exports= {postdownload}