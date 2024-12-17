//backend creation using express

//1.Load .env file
require('dotenv').config()//Loads .env file contents into process.env by default.

//2.import express 
const express = require ('express')

//6. import cors 
const cors = require('cors')

//8. import db
const db=require('./DB/connection')

// 9.import router
const router = require('./Routes/router')
// const ApplicationMiddleware = require('./Middlewares/ApplicationMiddleWare')


//3. create an application using express
const pfServer =express()

//7.middleware creation using express
pfServer.use(cors())
pfServer.use(express.json())
// pfServer.use(ApplicationMiddleware)
pfServer.use(router)

//export img to frontend
pfServer.use('/uploads',express.static('uploads'))




//4. port creation
const PORT = 3000 || process.env.PORT

//5. server run 
pfServer.listen(PORT,()=>{
    console.log("projectFair running on PORT : " +PORT);
    
})

pfServer.get('/',(req,res)=>{
    res.send("welcome to PROJECT FAIR")
})