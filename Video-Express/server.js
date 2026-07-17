const express = require("express")
const cors= require("cors")
require("dotenv").config()
const app = express()

app.use(cors({
    origin:process.env.CLIENT_PORT, 
    credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const {router}= require("./routes/download-rout")
app.use(router)

PORT= process.env.PORT
app.listen(PORT,()=>{
    console.log("Connected to the server successfully!")
})