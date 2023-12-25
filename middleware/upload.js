// import {GridFsStorage} from "multer-gridfs-storage"
import multer from "multer";
import path from "path";

import dotenv from "dotenv"
dotenv.config()


// const storage=new GridFsStorage({
//     url:process.env.MONGODB_URI,
//     options:{useNewUrlParser:true},
//     file:(request,file)=>{
        
//         const match=["image/png","image/jpg"]

//         if(file){
//             console.log(file)
//         }

//         if(match.indexOf(file.mimeType)===-1){
//             console.log("file extension match returning")
//             return `${Date.now()}-blog-${file.originalname}`
//         }
//         console.log("from here")
//         return {
//             bucketName:"photos",
//             filename:`${Date.now()}-blog-${file.originalname}`

//         }
//     }
// })

const storage=multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,"./public/images")
    },
    filename:(req,file,cb)=>{
        cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload=multer({
    storage:storage
})

export default upload;

