import { API_URL, URL_LOGIN } from "../config";
import axios from "axios";

async function profile(id){
    return axios.get(`${API_URL}/api/users/${id}`)
    .then(res => {return res.data}).catch(err => {return err})
}

async function getMe(){
    
}

export default{
    profile
}