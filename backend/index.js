const connect = require("./db")
const express = require("express")

connect()

const app = express()
const port = 3000
app.listen(port,()=>{
    console.log(`Server is Running at Port ${port}`)
})

app.get("/",(req,res)=>{
    res.send("Hello Nikhil")
})