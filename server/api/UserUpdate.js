const express = require('express')
const User = require('../db/User')
const route = express.Router()

const userUpdate = route.patch('/', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(req.headers.id, req.body, { new: true, useFindAndModify: false })        
        console.log("user________:",user)
        res.send(user)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

module.exports = userUpdate