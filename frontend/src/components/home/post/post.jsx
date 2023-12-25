
import { Box ,Typography,styled} from "@mui/material";
import { addElipses } from "../../../utils/common-utils.js";

const Container=styled(Box)`
    border:1px solid #d3cede;
    border-radius:10px;
    margin:10px;
    height:380px;
    display:flex;
    align-items:center;
    flex-direction:column;
    & > p{
        padding:0 5px 5px 5px;
    }
`

const Image=styled('img')({
    width: "100%",
    height: "100%",
    objectFit: "contain",
})

const Icontainer=styled(Box)`
    width: 100%;
    height: 40vh;
    overflow: hidden;
    background: linear-gradient(to bottom, #f2f2f2, #e0e0e0); /* Example gradient colors */
`

const Text=styled(Typography)`
    color:#878787;
    font-size:12px;
`

const Heading=styled(Typography)`
    font-size:18px;
    font-weight:600;
`

const Details=styled(Typography)`
    font-size:14px;
    word-break:break-word;
`


const Post=({post})=>{

    const url=post.picture?post.picture:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80"

    return (
        <Container>
            <Icontainer>
                <Image src={url} alt="Blog"></Image>
            </Icontainer>
            <Text>{post.category}</Text>
            <Heading>{addElipses(post.title,20)}</Heading>
            <Text>{post.userName}</Text>
            <Details>{addElipses(post.description,100)}</Details>
        </Container>
    )
}

export default Post;