const connect = require("./db")
const express = require("express")
connect()
const app = express()
app.use(express.json())
app.use("/api/auth",require("./routes/auth"))
app.use("/api/notes",require("./routes/notes"))


const port = 3000
app.listen(port,()=>{
    console.log(`Server is Running at Port ${port}`)
})

app.get("/",(req,res)=>{
    res.send("Hello Nikhil")
})