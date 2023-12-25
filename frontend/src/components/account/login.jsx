import {Box,TextField,Button,styled,Typography} from '@mui/material'
import { useState,useContext } from 'react'
import { API } from '../../service/api'
import { DataContext } from '../../contextAPI/dataprovider'
import { useNavigate } from 'react-router-dom'



const Component=styled(Box)`
    width:400px;
    margin:auto;
    box-shadow:5px 2px 5px 2px rgb(0 0 0 /0.6)
`

const Image=styled('img')({
    width:300,
    margin:"auto",
    display:"flex",
})

const SizeImage=styled(Image)`
    width:200px;
    border-radius:100%
`

const Wrapper=styled(Box)`
    display:flex;
    flex-direction:column;
    padding: 0px 25px 25px 25px
`


const Error=styled(Typography)`
font-size:12px;
color:#ff6161;
line-height:0;
margin-top:10px;
font-weight:600;
`

const signupInitialValues={
    name:"",
    email:"",
    password:""
}

const loginInitialValues={
    email:"",
    password:""
}

const Login=({setAuthenticated})=>{

    const imageURL = 'https://cdn2.vectorstock.com/i/1000x1000/70/01/mobile-learning-logo-design-template-vector-20727001.jpg';

    const [account,toggleaccount]=useState('login') //state to toggle login and signup page
    const [signup,setSignup]=useState(signupInitialValues) // Signup state
    const [login,setLogin]=useState(loginInitialValues) // Login state
    const [error,setError]=useState(""); //error state

    const {setAccount}=useContext(DataContext)//context api
    const navigate=useNavigate();

    const toggleSignup=()=>{
        toggleaccount('signup')
    }

    const toggleLogin=()=>{
        toggleaccount('login')
    }

    const onInputChange=(e)=>{
        setSignup({...signup,[e.target.name]:e.target.value})
        setError("")
    }

    const onLoginChange=(e)=>{
        setLogin({...login,[e.target.name]:e.target.value})
        setError("")
    }

    const loginUser= async()=>{
        if(login.email==="" || login.password===""){
            setError("Please Enter Your  Credentials")
        }else{

            ///API CALL

            let response=await API.userLogin(login);

            if(response.isSuccess){

                console.log(response);
                setError("")
                sessionStorage.setItem("accessToken",`Bearer ${response.data.accesstoken}`)
                sessionStorage.setItem("refreshToken",`Bearer ${response.data.refreshtoken}`)
                setAccount({name:response.data.name});
                setAuthenticated(true);
                navigate("/")


            }else{
                setError("Something went wrong ! ")
            }


        }

    }

    const signupUser= async ()=>{

        if(signup.name==="" || signup.email==="" || signup.password===""){
            setError("Please Enter All the Fields Above")
        }else{

            //API CALL
            let response =await API.userSignup(signup);

            if(response.isSuccess ){
                setError("");
                setSignup(signupInitialValues);
                toggleaccount("login")
            }
            else if(response.isError){
                setError("Something Went Wrong");
                setSignup(signupInitialValues);
            }else if (response.isFailure){
                setError("Something Went Wrong");
                setSignup(signupInitialValues);
            }
        }
    }
    return (
            <Component style={{marginTop:"100px"}}>
                <Box>
                    <SizeImage  src={imageURL} alt="Image1"/>
                        {
                            account==='login' ?
                                <Wrapper>
                                    <TextField onChange={(e)=>onLoginChange(e)} style={{marginTop:"20px"}}  variant="standard" name='email' label="Enter User Email" />
                                    <TextField onChange={(e)=>onLoginChange(e)} style={{marginTop:"20px"}} type='password' variant="standard" name='password'  label="Enter Password"/>

                                    {error && <Error>{error}</Error>}

                                    <Button onClick={()=>loginUser()} style={{marginTop:"20px"}} variant="contained">Login</Button>
                                    <Typography  style={{marginTop:"10px",textAlign:"center"}}>OR</Typography>
                                    <Button onClick={()=>toggleSignup()} style={{boxShadow:"0 2px 4px 0 rgb(0 0 0 /60%)",marginTop:"10px",marginBottom:"10px"}}  variant="text">Create an account</Button>
                                </Wrapper>
                            : 
                                <Wrapper>
                                    <TextField onChange={(e)=>onInputChange(e)} name="name" style={{marginTop:"20px"}} variant="standard" label="Enter Name" />
                                    <TextField onChange={(e)=>onInputChange(e)} type='email' name="email" style={{marginTop:"20px"}} variant="standard"  label="Enter Email"/>
                                    <TextField onChange={(e)=>onInputChange(e)} type="password" name="password" style={{marginTop:"20px"}} variant="standard"  label="Enter Password"/>
                                    {error && <Error>{error}</Error>}
                                    <Button onClick={()=>signupUser()} style={{marginTop:"20px"}} variant="contained">Signup</Button>
                                    <Typography  style={{marginTop:"10px",textAlign:"center"}}>OR</Typography>
                                    <Button onClick={()=>toggleLogin()} style={{boxShadow:"0 2px 4px 0 rgb(0 0 0 /60%)",marginTop:"10px",marginBottom:"10px"}}  variant="text">Already Have an Account</Button>
                              </Wrapper>
                        }
                </Box>
            </Component>
    )
}

export default Login;