
import mongoose from "mongoose"
import Image from "../model/image.js"

const url="http://localhost:8000"

// const con=mongoose.connection;

// let gfs,gridfsBucket;

// con.once("open",()=>{
//     gridfsBucket=new mongoose.mongo.GridFSBucket(con.db,{
//         bucketName:'fs'
//     })
//     gfs=grid(con.db,mongoose.mongo)
//     gfs.collection('fs')

// })

export const uploadImage=(request,response)=>{
    
    if(!request.file){
        console.log("Not File")
        return response.status(404).json({msg:"file Not Found"})
    }
    const image=new Image({
        imageName:request.file.filename
    })
    image.save();
    console.log("image saved")
    const imageUrl=`${url}/images/${request.file.filename}`;
    return response.status(200).json(imageUrl)
}

export const getImage= async (request,response)=>{
    try{
        console.log("get image function called")
        Image.find()
        .then(images=>response.json(images))
        .catch(error=>response.json(error))
        // const file=await gfs.files.findOne({filename:request.params.filename})
        // const readStream=gridfsBucket.openDownloadStream(file._id)
        // readStream.pipe(response)
    }catch(error){
        return response.status(500).json({msg:error.mesage})
    }
}
