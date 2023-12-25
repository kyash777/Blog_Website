//api notification messages

export const API_NOTIFICATION_MESSAGES={
    responseFailure:{
        title:"Error",
        message:"An error occur while fetching response from server,Please try again later"
    },
    requestFailure:{
        title:"Error",
        message:"An error occured while parsing request data"
    },
    networkError:{
        title:"error",
        message:"Unable to connect with the server please check your internet connextion"

    }
}

export const SERVICE_URLS={
    userSignup:{url:"/signup",method:"post"},
    userLogin:{url:"/login",method:"post"},
    uploadFile:{url:"/file/upload",method:"post"},
    getFile:{url:"/file/:filename",method:"get"},
    createPost:{url:"/create",method:"post"},
    getAllPosts:{url:"/posts",method:"get",params:true},
    getPostById:{url:"/post",method:"get",query:true},
    updatePost:{url:"/update",method:"put",query:true},
    deletePost:{url:"/delete",method:"delete",query:true},
    newComment:{url:"/comment/new",method:"post"},
    getComments:{url:"/comments",method:"get",query:true},
    deleteComment:{url:"/comment/delete",method:"delete",query:true}
}