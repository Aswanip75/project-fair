
//1. import express
const express = require('express')


//3. import userControl
const userController = require('../Controllers/userController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const projectController = require('../Controllers/projectController')
const multiMiddleware = require('../Middlewares/multerMiddleware')
//2. create router
const router = express.Router()


router.post('/api/register',userController.registerAPI)
router.post('/api/login',userController.loginAPI)
router.post('/api/addproject',jwtMiddleware,multiMiddleware.single('projectImg'), projectController.addProjectAPI)
router.get('/api/getAllUsersProject',jwtMiddleware,projectController.getAllUsersProject)
router.get('/api/getAUserProject',jwtMiddleware,projectController.getUserProject)
router.get('/api/getHomeProject',projectController.getHomeProject)
router.put('/api/editproject/:projectId',jwtMiddleware,multiMiddleware.single('projectImg'), projectController.editProjectAPI)
router.delete('/api/deleteproject/:projectId',jwtMiddleware, projectController.deleteProjectAPI)
module.exports= router