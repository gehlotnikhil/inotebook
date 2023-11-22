const mongoose = require("mongoose")
const mongoURL = "mongodb://127.0.0.1/testNew"

const connect = ()=>{ mongoose.connect(mongoURL)
.then(()=>{console.log("Connection Established")})
.catch(()=>{console.log("Connection not Established")})
}
module.exports = connect