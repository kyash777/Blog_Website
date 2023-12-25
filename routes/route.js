import express from "express"
import { signUp } from "../controller/user-controller.js";
import { login } from "../controller/user-controller.js";
import {uploadImage,getImage} from "../controller/imageController.js";
import upload from "../middleware/upload.js";
import { createPost } from "../controller/createPost.js";
import { authenticateToken } from "../controller/authenticateToken.js";
import { getPosts,getPost,updatePost,deletePost } from "../controller/createPost.js";
import { newComment,getComments,deleteComment } from "../controller/comment-controller.js";


const router=express.Router();

//////post routes
router.post("/signup",signUp);
router.post("/login",login)
router.post("/file/upload",upload.single("file"),uploadImage)
router.post("/create",authenticateToken,createPost)
router.post("/comment/new",authenticateToken,newComment)

/////get routes 
router.get("/file/:filename",getImage)
router.get("/posts",authenticateToken,getPosts)
router.get("/post/:id",authenticateToken,getPost)
router.get("/comments/:id",authenticateToken,getComments)

///update route

router.put("/update/:id",authenticateToken,updatePost)

///delete route

router.delete("/delete/:id",authenticateToken,deletePost)
router.delete("/comment/delete/:id",authenticateToken,deleteComment)

export default router;