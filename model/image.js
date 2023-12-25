import mongoose, { mongo }  from "mongoose";

const imageSchema=new mongoose.Schema({
    imageName:String
})

const image=mongoose.model("image",imageSchema)

export default image