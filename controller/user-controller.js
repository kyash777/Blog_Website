import User from "../model/user.js";
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import Token from "../model/token.js";

dotenv.config()

export const signUp= async (request,response)=>{
    try{

        const {name,email,password}=request.body

        // const salt=await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password,10);

        if(!validator.isEmail(email)){
            return response.status(400).json({message:"Invalid Email Adress"})
        }

        const user={
            name:request.body.name,
            email:request.body.email,
            password:hashPassword
        }
        const newUser=new User(user)
        await newUser.save()
        return response.status(200).json({message:"Signed up Successfully"})

    }catch(error){
        console.log(error)
        return response.status(500).json({message:"Internal Server Error"})
    }

}


 export const login=async(request,response)=>{
    try{
        const {email,password}=request.body;
        console.log(email,password)
        let user= await User.findOne({email:email})
        if(!user){
            return response.status(400).json({msg:"No User With This Email.Plase Signup"})
        }
        let match=await bcrypt.compare(password,user.password)
        
        if(match){

            const accessToken=jwt.sign(user.toJSON(),process.env.access_secret_key,{expiresIn:"15m"})
            const refreshToken=jwt.sign(user.toJSON(),process.env.refresh_secret_key,{expiresIn:"15m"})

            const newToken= new Token({token:refreshToken})
            await newToken.save()

            return response.status(200).json({accesstoken:accessToken,refreshtoken:refreshToken,name:user.name,email:user.email})

        }else{
            response.status(400).json({msg:"Password Does Not Match"})
        }
    }catch(error){

        return response.status(500).json({msg:"Error while login in user"})
    }
}