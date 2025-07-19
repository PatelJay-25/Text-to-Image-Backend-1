const mongoose=require('mongoose')

const usermodel=new mongoose.Schema({
    "name":{
        type:String,
        required:true,
    },

    "email":{
        type:String,
        required:true,
        unique:true
    },

    "password":{
        type:String,
        required:true,  
    },

    "creditBalance":{
        type:Number,
        default:5,
    }
})

const User = mongoose.model('User', usermodel);
module.exports=User

