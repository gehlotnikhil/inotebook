const express = require("express")
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const fetchuser = require("../middleware/fetchuser")


const JWT_Secret = "NikhilGehlot"
// Creating a User: POST Request
router.post("/createuser", [
    // adding validator to check length of name
    body("name").isLength({ min: 3 })
], async (req, res) => {
    let success = false
    // after checking length of name, if error occur then execute if statement
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(403).json({ success,error: error.array() })
    }
    // here, we are checking email is unique or note by checking
    // email provided by user and all the existing email address
    const u = await User.findOne({ email: req.body.email })
    if (u) {
        return res.status(401).send({success,error:"Soory, that email is already exists"})
    }
    let salt = await bcrypt.genSalt(10)
    let secPasswd = await bcrypt.hash(req.body.password, salt)

    // creating new user
    const u1 = User({
        name: req.body.name,
        email: req.body.email,
        password: secPasswd
    })
    const data = {
        users: {
            id: u1.id
        }
    }
    const authToken = jwt.sign(data, JWT_Secret)
    console.log(authToken)
    try {
        const result = await u1.save()
        console.log(result)
    }
    catch (err) {
        for (field in err.errors) {
            console.log(err.errors[field])
        }
        return res.status(407).send({success,error:err})
    }
    success=true
    res.send({success,authToken,body:req.body})
})

// Authentication of User: POST Request
router.post("/login", [
    body("email", "Please Enter a Email in Field: ").isEmail(),
    body("password", "Please fill the Password field").exists()
], async (req, res) => {
    // Validating email and password
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(403).json({ success: success, error: error.array() })
    }
    const { email, password } = req.body;

    try {
        let success = false
        const user = await User.findOne({ email })
        //if email is wrong then if block execute
        if (!user) {
            return res.status(410).json({ success: success, error: "Please enter the correct Credential" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        //if password is wrong then if block execute
        if (!passwordCompare) {
            return res.status(410).json({ success: success, error: "Please enter the correct Credential" })
        }
        // sending token
        const data = {
            users: {
                id: user.id
            }
        }
        const authToken = await jwt.sign(data, JWT_Secret)
        success = true
        res.send({ success, authToken })
        console.log(authToken)
    }
    catch (err) {
        for (field in err.errors) {
            console.log(err.errors[field])
        }
        return res.status(407).send(err)
    }
})

// Route 3: Get the user details: 
router.post("/getuser", fetchuser, async (req, res) => {
    try {
        userid = req.users.id
        const user = await User.findById(userid).select("-password")
        res.send(user)
    }
    catch (err) {
        console.error(err.message)
        res.status(406).send("Internal Server Error")
    }
})


module.exports = router