const mongoose = require('mongoose')

const user = new mongoose.Schema({
    email:{
        type:String,        
    },
    password:{
        type:String,        
    },
    wallet:{
        type:Number
    },
    data:{
        type:Array
    }
})


module.exports = User = mongoose.model('user',user)