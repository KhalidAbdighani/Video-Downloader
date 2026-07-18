const ytDlp = require("yt-dlp-exec");
const path = require("path");
const fs = require("fs");
const postdownload= async  (req,res)=>{

  const { url } = req.body;
try{
    if (!url) {
    return res.status(400).json({
        message: "URL is required"
    });
}

const vidinfo = await ytDlp(url,{
    dumpSingleJson:true
});

const vidname= vidinfo.title
const fileName = vidname.replace(/[<>:"/\\|?*]/g, "");


const output = path.join(
    __dirname,
    "../downloads",
   "%(title)s.%(ext)s"
);

const filepath = path.join(__dirname, "../downloads/video.mp4");
 await ytDlp(url, {
    output:filepath,
    format: "bv*+ba/b",
    mergeOutputFormat: "mp4"
    
});


console.log(filepath);
console.log(typeof filepath);
res.download(filepath,"downloaded.mp4", (err) => {

    if (err) {
        console.log(err);
        return;
    }

    fs.unlink(filepath, (err) => {
        if (err) console.log(err);
    });

});

       

}catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Download failed"
        });

    }


}

module.exports= {postdownload}