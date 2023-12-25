import { useState,useEffect,useContext } from "react";
import { useLocation ,useNavigate} from "react-router-dom";


import {Box,Typography,styled,FormControl,InputBase,Button,TextareaAutosize} from "@mui/material"
import {AddCircle as Add,} from '@mui/icons-material';
import { DataContext } from "../../contextAPI/dataprovider";
import { API } from "../../service/api.js";



const Error=styled(Typography)`
    font-size:20px;
    color:#ff6161;
    line-height:0;
    margin-top:10px;
    font-weight:600;
`

const Imagecontainer=styled(Box)`
    width: 100%;
    height: 40vh;
    overflow: hidden;
    background: linear-gradient(to bottom, #f2f2f2, #e0e0e0); /* Example gradient colors */
    margin-top:84px;
`
const Image=styled('img')({
    width: "100%",
    height: "100%",
    objectFit: "contain",
    
})

const Container=styled(Box)`
    margin:50px 100px;
`
const StyledIcon=styled(Add)`
    cursor:pointer;

`
const StyledFormControl=styled(FormControl)`
    margin-top:10px;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
`
const InputField=styled(InputBase)`
    flex:1;
    font-size:25px;
    width:100%;
`

const TextArea=styled(TextareaAutosize)`
    width:100%;
    margin-top:20px;
    font-size:18px;
    // border:none;
    &:focus-visible{
        outline:none;
    }
`

const initialPost={
    title:"",
    description:"",
    picture:"",
    userName:"",
    category:"",
    createdDate: new Date(),
}

const Pbutton=styled(Button)`
    margin-top:15px;
`

const CreatePost=()=>{

    
    const [post,setPost]=useState(initialPost);
    const [file,setFile]=useState("")
    const [url,setUrl]=useState("https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80")
    const [error,setError]=useState("")
    
    const {account}=useContext(DataContext)
    
    const location=useLocation();
    const navigate=useNavigate()
 
    const handleFile= async()=>{

        if(file){
            setError("")
            const data=new FormData();
            data.append("file",file)

            //API CALL
            const response=await API.uploadFile(data);
            post.picture=response.data;
            setUrl(response.data);
        }else{
            setError("Please Select file")
        }
    }

    console.log(post)
    console.log("yash")
    
    useEffect(() => {
        post.userName=account.name
        post.category=location.search?.split("=")[1] || "All"
    }, [post]);

    console.log(post)
    
    
    
    const handleChange=(e)=>{
        setPost({...post,[e.target.name]:e.target.value})
    }

    const savePost= async ()=>{

        //API CALL

        let response=await API.createPost(post)
        if(response.isSuccess){
            navigate('/')
        }

    }

    return (
        <Container style={{textAlign:"center",marginTop:"20px"}}>
            <Imagecontainer>
                <Image alt="image" src={url}></Image>
            </Imagecontainer>

            <StyledFormControl style={{marginTop:"20px"}}>
                <label htmlFor="fileInput">
                    <StyledIcon fontSize="large" color="action" />
                </label>
                {error && <Error>{error}</Error>}

                <input id="fileInput" style={{display:"none"}} type="file"  onChange={(e)=>{setFile(e.target.files[0])}} />

                 <Button onClick={()=>handleFile()} variant="contained">Upload</Button>
            </StyledFormControl>
            <Box style={{marginTop:"20px"}}>
                <InputField  placeholder="Title" onChange={(e)=>handleChange(e)} name="title"/>
                <TextArea
                minRows={5}
                placeholder="Write Your Blog Here ..."
                onChange={(e)=>handleChange(e)}
                name="description"
                />
                <Pbutton onClick={()=>savePost()}  variant="contained">Publish</Pbutton>
            </Box>
        </Container>
    )
}

export default CreatePost;