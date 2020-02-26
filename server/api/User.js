const express = require('express')
const User = require('../db/User')
const route = express.Router()

const userPost = route.post('/',async (req, res)=>{  
  let user  = {}
  user.email        = req.body.email
  user.password     = req.body.password
  user.wallet       = 5000
  user.data         = []
  let userModel = new User(user)
  await userModel.save()
  res.json(userModel)
})

module.exports = userPost