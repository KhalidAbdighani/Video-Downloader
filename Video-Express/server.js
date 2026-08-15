const express = require("express")
const cors= require("cors")
require("dotenv").config()
if (process.env.YOUTUBE_COOKIES) {
    fs.writeFileSync(
        path.join(__dirname, "cookies.txt"),
        process.env.YOUTUBE_COOKIES
    );
}
const app = express()
const {Server} = require("socket.io")
const http = require("http")
const server = http.createServer(app)

const io = new Server(server, { cors: { 
    origin:"https://video-downloader-phi-woad.vercel.app",
    credentials:true
}})


app.use(cors({
    origin:"https://video-downloader-phi-woad.vercel.app", 
    credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("io", io)
const {router}= require("./routes/download-rout")
app.use(router)



const PORT = process.env.PORT; 
server.listen(PORT,()=>{
    console.log("Concetted to the server successfully!")
})
