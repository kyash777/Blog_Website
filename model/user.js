import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,     
    },
    email:{
        type:String,
        requires:true,
        unique:true,
        match:/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    },
    password:{
        type:String,
        required:true,

    }
})

const user=mongoose.model('user',userSchema)

export default user;
