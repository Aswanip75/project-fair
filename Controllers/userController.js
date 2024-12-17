//1.import mongoose 
const mongoose = require('mongoose')
//2. import useschema
const users = require('../Models/userSchema')

const jwt = require('jsonwebtoken')

// 3. register logic 
exports.registerAPI= async(req,res)=>{
   
    console.log("Inside Register API");
    const {username,email,password}=req.body;
try{
    const existingUser = await users.findOne({email})

    if (existingUser){
res.status(402).json ({message:"user already existing...."})
    }else{
        const newUser =new users({
            username:username,
            email:email,
            password:password,
            gitHub:"",
            linkdIn:"",
            profilePic:""

        })
        //to save the details to mongoDB
        await newUser.save()
        res.status(200).json("user registration successful....")
    }


}
catch(err){
    res.status(401).json(err)
}
   
    
}

//4. Login logic 
exports.loginAPI=async(req,res)=>{
    console.log("inside Login API");
    const {email, password}=req.body;
    try{
        const existingUser = await users.findOne({email,password})
    
    if(existingUser){
       

const token =jwt.sign({userId:existingUser._id},process.env.jwtkey)
console.log(token);
res.status(200).json({currentUser:existingUser,token})


    }else{
        res.status(404).json("Incorrect email or password")
    }
    }
    catch(err){
        res.status(401).json(err)
    }
}

