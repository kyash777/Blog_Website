import { Box,TextareaAutosize,styled} from "@mui/material";
import { useState,useContext,useEffect } from "react";
import {Send} from '@mui/icons-material';
import { API } from "../../../service/api.js";
import { DataContext } from "../../../contextAPI/dataprovider";


//components
import Comment from "./comment.jsx";



const ChatIcon=styled(Send)`
    padding-left:10px
`
const Container=styled(Box)`
    margin-top:100px;
    display:flex;
`

const Image=styled("img")({
    width:50,
    height:50,
    borderRadius:"50%",
})

const Textarea=styled(TextareaAutosize)`
    
    width:100%;
    margin:0 20px;
    margin:0px;
    font-weight:600;
    font-size:15px;
    outline:none
`
const initialValues={
    name:"",
    postId:"",
    comments:"",
    date:new Date()
}
export const Comments=({post})=>{

    const url= 'https://static.thenounproject.com/png/12017-200.png'

    const [comment,setComment]=useState(initialValues)
    const[comments,setComments]=useState([])

    const {account}=useContext(DataContext)

    const handleChange=(e)=>{
        setComment({
            ...comment,
            name:account.name,
            postId:post._id,
            comments:e.target.value
        })
    }

    const addComment=async(e)=>{

        //API CALL

        const response = await API.newComment(comment)

        if(response.isSuccess){
            setComment(initialValues)
        }

    }

    useEffect(()=>{
        const getData=async()=>{

            // API CALL

            const response=await API.getComments(post._id)

            if(response.isSuccess){
                setComments(response.data)
            }

        }
        getData()
    },[comments,post._id])

    return (

        <Box style={{marginBottom:"50px"}}> 
            <Container>
                <Image src={url} alt="dp"/>
                <Textarea
                minRows={2}
                placeholder="Whats On Your Mind"
                value={comment.comments}
                onChange={(e)=>handleChange(e)}
                />
                <ChatIcon onClick={(e)=>addComment(e)} style={{fontSize:"40",cursor:"pointer"}}/>
            </Container>
            <Box>
                {comments && comments.length>0 && comments.map(comment=>(
                    <Comment comment={comment}/>
                ))

                }
            </Box>
        </Box>
    )
}

export default Comments;