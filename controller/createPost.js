
import Post from "../model/post.js"
export const createPost=async (request,response)=>{

    try{
        const post=await new Post(request.body)
        post.save()

        return response.status(200).json("Post saved")
    }catch(error){
        return response.status(500).json({msg:error.message});
    }

}

export const getPosts= async (request,response) =>{
    let category=request.query.category.split("=")[1]
    let posts;
    try{
        if(category){
            posts=await Post.find({category:category})
        }else{
            posts=await Post.find({})  
        }
        return response.status(200).json(posts)
    }catch(error){
        response.status(500).json({msg:"Internal Server Error"})
    }
}

export const getPost= async (request,response)=>{
    try{
        const post=await Post.findById(request.params.id)
        response.status(200).json(post)
    }catch(error){
        response.status(200).json({msg:error.message})
    }
}

export const updatePost= async(request,response)=>{
    try{
        const post=await Post.findById(request.params.id)

        if(!post){
            return response.status(404).json({msg:error.message})
        }

        await Post.findByIdAndUpdate(request.params.id,{$set:request.body})
        response.status(200).json({msg:"Post Updated Successfully"})
    }catch(error){
        response.status(500).json({msg:error.message})
    }

}

export const deletePost=async(request,response)=>{
    try{
        const deletedPost = await Post.findByIdAndDelete(request.params.id);

        if(!deletedPost){
            return response.status(404).json({msg:"Post Not Found"})
        }

        console.log(deletedPost)

        return response.status(200).json({msg:"Post Deleted Successfully"})
    }catch(error){
        console.log("error from here")
        response.status(500).json({msg:error.message})
    }
}