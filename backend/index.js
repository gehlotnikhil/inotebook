const connect = require("./db")
const express = require("express")
var cors = require("cors")

connect()
const app = express()
app.use(express.json())
app.use(cors())
app.use("/api/auth",require("./routes/auth"))
app.use("/api/notes",require("./routes/notes"))


const port = 5000
app.listen(port,()=>{
    console.log(`iNoteBook backend listening at localhost:${port}`)
})

app.get("/",(req,res)=>{
    res.send("Hello Nikhil")
})