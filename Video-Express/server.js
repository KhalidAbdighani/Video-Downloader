const express = require("express")
const cors= require("cors")
require("dotenv").config()
const app = express()
const {Server} = require("socket.io")
const http = require("http")
const server = http.createServer(app)

const io = new Server(server, { cors: { 
    origin:"http://localhost:3000",
    credentials:true
}})


app.use(cors({
    origin:process.env.CLIENT_PORT, 
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
