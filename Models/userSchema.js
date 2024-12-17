
//1.import mongoose 
const mongoose= require('mongoose')

// 2.schema creation
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gitHub:{
        type:String,   
    },
    linkdIn:{
        type:String,   
    },
    profilePic:{
        type:String,   
    }

})

//3. model creation / exact same as mongoDB collection

const users = mongoose.model('users',userSchema)
module.exports=users