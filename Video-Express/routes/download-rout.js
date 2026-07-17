const {postdownload}= require("../controllers/download-controller")
const express = require("express")
const router = express.Router()

router.post("/download",postdownload)

module.exports={router}