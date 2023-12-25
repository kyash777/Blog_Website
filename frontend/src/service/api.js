import axios from "axios"
import { API_NOTIFICATION_MESSAGES } from "../constants/config";
import { SERVICE_URLS } from "../constants/config";
import { getAccessToken ,getType} from "../utils/common-utils.js";

const API_URL="http://localhost:8000";

const axiosInstance=axios.create({
    baseURL:API_URL,
    timeout:100000,
})

axiosInstance.interceptors.request.use(

    function(config){
        if(config.TYPE.params){
            config.params=config.TYPE.params
        }else if(config.TYPE.query){
            config.url=config.url+'/'+config.TYPE.query
        }
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(

    function(response){
        return processResponse(response);
    },
    function(error){
        console.log(error);
        return (processError(error));
    }
)

const processResponse=(response)=>{
    if(response?.status===200){
        return {isSuccess:true,data:response.data}
    }else{
        return {
            isFailure:true,
            status:response?.status,
            msg:response?.msg,
            code:response?.code
        }
    }
}

const processError=(error)=>{
    if(error.response){
        //request made successfully but server responded with status code other than 200
        console.log("Error in response",error.toJSON());
        return {
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.responseFailure,
            code:error.response.status
        }
    }
    else if(error.request){
        //request made but no response received (connextion issue between frontend and backend)
        console.log("Error in request",error.toJSON());
        return {
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.requestFailure,
            code:""

        }
    }else{
        //something wrong happened in front end
        console.log("Error in network",error.toJSON());
        return {
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.networkError,
            code:""

        }
    }
}

const API={}

for(const [key,value] of Object.entries(SERVICE_URLS)){
    API[key]=(body)=>{
        return axiosInstance({
            method:value.method,
            url:value.url,
            data: value.method==="delete"?{}:body,
            responseType:value.responseType,
            headers:{
                authorization:getAccessToken()
            },
            TYPE:getType(value,body),

        })
    }
}

export {API}

