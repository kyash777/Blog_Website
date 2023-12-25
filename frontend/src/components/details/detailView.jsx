import {Box,Typography,styled} from "@mui/material"
import {useParams,Link, useNavigate} from "react-router-dom"
import { useEffect,useState,useContext } from "react"
import {API} from "../../service/api.js"
import {Edit,Delete} from '@mui/icons-material';
import { DataContext } from "../../contextAPI/dataprovider.jsx";

//components
import Comments from "./comments/comments.jsx";

const Image=styled('img')({
    width: "100%",
    height: "100%",
    objectFit: "contain",
})

const Author=styled(Box)`
    color:#878787;
    margin 20px 0;
    display : flex
`
const Icontainer=styled(Box)`
    width: 100%;
    height: 40vh;
    overflow: hidden;
    background: linear-gradient(to bottom, #f2f2f2, #e0e0e0); /* Example gradient colors */
    margin:104px auto 10px
`

const Heading=styled(Typography)`
    font-size:38px;
    font-weight:600;
    text-align:center
    word-break:break-word;
`
const Description=styled(Typography)`
    word-break:break-word;
`

const EditIcon=styled(Edit)`
    margin:5px;
    padding:5px;
    border:1px solid #878787;
    border-radius:10px;
`
const DeleteIcon=styled(Delete)`
    margin:5px;
    padding:5px;
    border:1px solid #878787;
    border-radius:10px;
`

const DetailView=()=>{

    const[post,setPost]=useState("")
    const {id}=useParams()
    const {account}=useContext(DataContext);

    const navigate=useNavigate()


 
    useEffect(()=>{
        const fetchData=async()=>{

            //API CALL 
           let response= await API.getPostById(id)

           if(response.isSuccess){
            setPost(response.data)
           }

        }
        fetchData()
    },[])

    const deleteBlog=async()=>{
        
         // API CALL 
        let response =await API.deletePost(post._id)

        if(response.isSuccess){
            navigate('/')
        }
    }

   
    const url=post.picture?post.picture:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80"
    // console.log(account)
    // console.log(account.name,"=",post.userName)
    return (
        <Box style={{width:"95%",margin:"auto"}}>
            <Icontainer>
                <Image src={url} alt="Blog"/>
            </Icontainer>
            <Box style={{float:"right"}}>
                {
              
                    account.name===post.userName &&
                    <>
                    <Link to={`/update/${post._id}`} style={{textDecoration:"none",color:"inherit"}}><EditIcon color="primary"/></Link>
                    <DeleteIcon onClick={()=>deleteBlog()} color="error"/>
                    </>
                }
            </Box>
            <Heading>{post.title}</Heading>
            <Author>
                <Typography>Author:<Box component="span" style={{fontWeight:600}}>{post.userName}</Box></Typography>
                <Typography style={{marginLeft:"auto"}}>{new Date(post.createdDate).toDateString()}</Typography>
            </Author>
            <Description>{post.description}</Description>
            <Box>
                <Comments post={post}/>
            </Box>
        </Box>
    )
}

export default DetailView;