const express = require("express")
const router = express.Router()
const Notes = require("../models/Notes")
const fetchuser = require("../middleware/fetchuser")
const { body, validationResult } = require("express-validator")


//Route 1: Fetch all Notes - GET Request . Login Required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.users.id })
        console.log(notes)
        res.send(notes)
    }
    catch (err) {
        console.error(err.message)
        res.status(406).send("Internal Server Error")
    }
})



//Route 2: ADdd new Notes - GET Request . Login Required
router.post("/addnote", fetchuser, [
    body("title", "Please Enter a Title : ").isLength({ min: 3 }),
    body("description", "Please fill the Description field").exists()
], async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(403).json({ error: error.array() })
    }
    try {
        const { title, description, tag } = req.body;
        const note = new Notes({
            title, description, tag, user: req.users.id
        })
        console.log( title, description, tag )
        const result = await note.save()
        console.log(result)
        res.send(result+"hiiiiii")
    }
    catch (err) {
        console.error(err.message)
        res.status(406).send("Internal Server Error")
    }
})

module.exports = router