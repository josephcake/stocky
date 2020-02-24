const express = require('express')
const User = require('../db/User')
const route = express.Router()

const userPost = route.post('/',async (req, res)=>{      
  let user  = {}
  user.email        = req.body.email
  user.password     = req.body.password

  let userModel = new User(user)
  await userModel.save()
  res.json(userModel)
})

const userEmailGet = route.get('/',async (req, res)=>{
  let userCorrentCredential;
  if(req.headers.password !== undefined){
    userCorrentCredential = await User.findOne({'email':req.headers.email, 'password':req.headers.password})
  }
  const userEmailExist = await User.findOne({'email':req.headers.email}) ? true : false
  try {    
    if(req.headers.password !== undefined){//user is trying to log in     
      if(userCorrentCredential){
        res.send(userCorrentCredential)
      }else{
        res.send(false)
      } 
      
    }else{
      res.send(userEmailExist);
    }    
  } catch (err) {
    res.status(500).send(err);
  }
})
module.exports = {userPost,  userEmailGet}