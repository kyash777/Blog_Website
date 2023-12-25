import { Box, Typography ,styled} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useContext } from "react";
import { DataContext } from "../../../contextAPI/dataprovider";
import { API } from "../../../service/api.js";
import { useNavigate } from "react-router-dom";


const Component=styled(Box)`
    margin-top:30px;
    background:#F5F5F5
`

const Container=styled(Box)`
    display:flex;
`

const Name=styled(Typography)`
    font-weight:600;
    margin-right:30px;
`

const StyledDate=styled(Typography)`
    color:#878787;
    font-size:14px;
`

const DeleteIcon=styled(Delete)`
    margin-left:auto;
`

const Comment=({comment})=>{

    const {account}=useContext(DataContext)

    const navigate=useNavigate();

    const removeComment= async ()=>{

        //API CALL

        let response=await API.deleteComment(comment._id)

        if(response.isSuccess){
            navigate("/details/:id" )
        }
    }
    return (
        <Component>
            <Container style={{alignItems:"center"}}>
                <Name>{comment.name}</Name>
                <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
                {comment.name===account.name && <DeleteIcon style={{cursor:"pointer"}} onClick={()=>removeComment()}/>}
            </Container>
            <Box >{comment.comments}</Box>
        </Component>
    )
}

export default Comment;