const jwt = require("jsonwebtoken")
const JWT_Secret = "NikhilGehlot"

const fetchuser = (req,res,next) =>{
    const token = req.header("auth-header")
    if(!token){
        res.status(401).send("Please authenticate using valid token")
    }
    try{
        const data = jwt.verify(token,JWT_Secret)
        req.users = data.users
        next()
    }
    catch(err){
        res.status(401).send("Please authenticate using valid token")
    }
}

module.exports = fetchuser