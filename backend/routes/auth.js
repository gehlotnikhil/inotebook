const express = require("express")
const router = express.Router()
const User = require("../models/User")
const {body, validationResult} = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const JWT_Secret = "NikhilGehlot"

router.post("/createuser",[
    // adding validator to check length of name
    body("name").isLength({min:3})
],  async(req, res) => {
    // after checking length of name, if error occur then execute if statement
    const error = validationResult(req)
    if(!error.isEmpty()){
      return  res.status(403).json({error:error.array()})
    }
    // here, we are checking email is unique or note by checking
    // email provided by user and all the existing email address
    const u = await User.findOne({email: req.body.email})
    if(u){
        return res.status(409).send("Soory, that email is already exists")
    }
    let salt = await bcrypt.genSalt(10)
    let secPasswd = await bcrypt.hash(req.body.password,salt)

    // creating new user
    const u1 = User({
        name: req.body.name,
        email: req.body.email,
        password: secPasswd
    })
    const data = {
        id: u1.id 
    }
    const authToken = jwt.sign(data,JWT_Secret)
    console.log(authToken)
    try {
        const result = await u1.save()
        console.log(result)
    }
    catch (err) {
        for (field in err.errors) {
            console.log(err.errors[field])
        }
        return res.status(407).send(err)
    }
    res.send(req.body)
})

module.exports = router