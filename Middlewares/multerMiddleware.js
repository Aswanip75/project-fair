const  multer = require('multer')
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    filename:(req,file,callback)=>{
        callback(null,`projectImg-${file.originalname}`)
    }
})

const multiMiddleware= multer({
    storage
})
module.exports=multiMiddleware