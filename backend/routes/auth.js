const express = require("express")
const router = express.Router()
const User = require("../models/User")

router.get("/",  async(req, res) => {
    const u1 = User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    console.log("1")
    try {
        const result = await u1.save()
        console.log(result)
    }
    catch (err) {
        for (field in err.errors) {
            console.log(err.errors[field])
        }
    }
    console.log("2")
    res.send(req.body)
})

module.exports = router