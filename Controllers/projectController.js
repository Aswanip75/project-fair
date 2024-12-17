const mongoose =require('mongoose')

const projects = require('../Models/projectSchema');

exports.addProjectAPI = async (req, res) => {
    console.log("inside addProjectAPI");

    const { title, language, github, website, overview } = req.body;

    // Check if a file is uploaded
    if (!req.file) {
        return res.status(400).json({ message: "Project image is required" });
    }

    const projectImg = req.file.filename;
    const userId = req.payload.userId;  // Ensure you get the userId from req.payload

    // Check if userId exists (this is a safeguard, but it should always be present if JWT is correct)
    if (!userId) {
        return res.status(400).json({ message: "User ID is missing from the token" });
    }

    console.log("Project Img:", projectImg);
    console.log("Project Details:", title, language, github, website, overview);
    console.log("User ID:", userId);

    try {
        console.log("inside try");

        // Check if the project already exists based on the GitHub URL
        const existingProject = await projects.findOne({ github });
        if (existingProject) {
            return res.status(400).json({ message: "Project with this GitHub URL already exists" });
        } else {
            // Create a new project if it doesn't exist already
            const newProject = new projects({ title, language, github, website, overview, projectImg, userId });
            await newProject.save();
            return res.status(200).json(newProject); // Respond with the created project
        }

    } catch (err) {
        console.error("Error during project creation:", err);  // Log error for debugging
        // Return error message and proper status code
        return res.status(500).json({
            message: "An error occurred while adding the project",
            error: err.message || "Unknown error"
        });
    }
};

exports.getHomeProject=async(req,res)=>{
    try {
        const response = await projects.find().limit(3)
        res.status(200).json(response)  
      } catch (err) {
          res.status(406).json(err)
          
      }
}

exports.getUserProject=async(req,res)=>{
    console.log('req.payload:', req.payload);
    const userId =req.payload.userId
    try {
        const response = await projects.find({userId})
        console.log({userId});
        
        res.status(200).json(response)  
      } catch (err) {
          res.status(406).json(err)
          
      }
}

exports.getAllUsersProject=async(req,res)=>{
    try {
      const response = await projects.find()
      res.status(200).json(response)  
    } catch (err) {
        res.status(406).json(err)
        
    }
}

exports.editProjectAPI = async (req, res) => {
    console.log("inside editProjectAPI");

    const { title, language, github, website, overview, projectImg } = req.body;

    // Check if a file is uploaded
    if (!req.file) {
        return res.status(400).json({ message: "Project image is required" });
    }
    const updateImg = req.file? req.file.filename : projectImg ;
    const {projectId}=req.params
    const userId = req.payload.userId;  // Ensure you get the userId from req.payload

    // Check if userId exists (this is a safeguard, but it should always be present if JWT is correct)
    if (!userId) {
        return res.status(400).json({ message: "User ID is missing from the token" });
    }

    console.log("Project Img:", updateImg)
    console.log("Project Details:", title, language, github, website, overview);
    console.log("User ID:", userId);

    try {
        console.log("inside try");

        // Check if the project already exists based on the GitHub URL
        const project = await projects.findByIdAndUpdate(
            { _id:projectId },
            {
            title:title, 
            language:language,
            github:github,
            website:website,
            overview:overview,
            projectImg:updateImg 
            }
        )
        await project.save()
        res.status(200).json(project)

    } catch (err) {
        console.error("Error during project creation:", err);  // Log error for debugging
        // Return error message and proper status code
        return res.status(500).json({
            message: "An error occurred while adding the project",
            error: err.message || "Unknown error"
        });
    }
};

exports.deleteProjectAPI = async(req,res)=>{
    console.log("inside delete API");
    const {projectId}=req.params
    try {
        const project = await projects.findByIdAndDelete({_id:projectId})
        res.status(200).json(project)
    } catch (err) {
        console.error("Error during project creation:", err);  // Log error for debugging
        // Return error message and proper status code
        return res.status(500).json({
            message: "An error occurred while adding the project",
            error: err.message || "Unknown error"
        });
    }
    
}