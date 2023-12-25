import Comment from "../model/comment.js"

export const newComment= async (request,response)=>{

    try{
        const comment=await new Comment(request.body)
        comment.save()
        response.status(200).json({msg:"Comment saved successfully"})
    }catch(error){
        response.status(500).json({msg:error.message})
    }

}

export const getComments= async (request,response)=>{

    try{
        const comments=await Comment.find({postId:request.params.id})
        console.log(comments)
        response.status(200).json(comments)
    }catch(error){
        response.status(500).json({msg:error.message})
    }

}

export const deleteComment= async (request,response)=>{
    try{
        const deletedComment = await Comment.findByIdAndDelete(request.params.id);

        if(!deletedComment){
            return response.status(404).json({msg:"Comment Not Found"})
        }

        console.log(deleteComment)

        return response.status(200).json({msg:"Comment Deleted Successfully"})
    }catch(error){
        console.log("error from here")
        response.status(500).json({msg:error.message})
    }
}