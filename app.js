require("dotenv").config()
const { Router } = require("./src/user")
const express = require("express")
const app = express()

app.use(express.json())

app.use(Router)
app.listen(5001,()=>{
    console.log("Server is running on port 5001")
})