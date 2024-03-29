import { useEffect, useState } from "react";
import { API } from "../../../service/api.js";
import { Box,Grid } from "@mui/material";
import Post from "./post.jsx"
import { useSearchParams,Link } from "react-router-dom";

const Posts=()=>{

    const [posts,setPosts]=useState([])
    const [searchParams]=useSearchParams()
    const category=searchParams;

    useEffect(()=>{
        const fetchData= async ()=>{

            //API CALL 
            let response=await API.getAllPosts({category: category || ""})

            if(response.isSuccess){
                setPosts(response.data)
            }
        }
        fetchData()
    },[category])

    return (
        <>
        {
            posts && posts.length>0 ? posts.map(post=>(
                <Grid item lg={3} sm={4} xs={12}>
                    <Link style={{textDecoration:"none",color:"inherit"}} to={`details/${post._id}`}>
                        <Post post={post}/>
                    </Link>
                </Grid>
            )) 
            :
            <Box style={{color:"#878787",margin:"30px 80px",fontSize:"18"}}> No Data</Box>
        }
        </>
    )
}

export default Posts;