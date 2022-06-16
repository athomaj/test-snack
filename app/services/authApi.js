import axios from "axios";
import { storeData, deleteData, getData } from "../utils/storage";

function isAuthenticated(){
    const token = localStorage.getItem("authToken")

    if(token){
        const {exp: expiration} = jwrDecode(token)
    }

}

async function register(firstname, email, password){
    return await axios
    .post('http://10.0.1.229:1337/api/auth/local/register', {
        username: `${firstname}`,
        email: `${email}`,
        password: `${password}`,
    })
    .then(response => {
        storeData("authToken", response.data.jwt)
        //axios.defaults.headers["Authorization"] = "Bearer " + response.data.jwt
        return response
    })
    .catch(error => {
        // console.log('An error occurred:', error.response);
        return error.response
    });
}

async function login(email, password){
    return await axios
    .post('http://10.0.1.229:1337/api/auth/local', {
        identifier: `${email}`,
        password: `${password}`,
    })
    .then(response => {
        // Handle success.
        storeData("authToken", response.data.jwt)
        //axios.defaults.headers["Authorization"] = "Bearer " + response.data.jwt
        return response
    })
    .catch(error => {
        // Handle error.
        // console.log('ERR LOGIN ==', error.response);
        return error.response
    });
}

async function disconnect(){
    deleteData("authToken")
    //axios.defaults.headers["Authorization"] = "Bearer " + ""
    const token = await getData("authToken")
    console.log(token)
}

async function update(username, email, id){
    return await axios
    .put(`http://localhost:1337/api/users/${id}`, {
        username: `${username}`,
        email: `${email}`
    })
    .then(response => {
        // Handle success.
        console.log('Updated!');
        return response
    })
    .catch(error => {
        // Handle error.
        console.log('An error occurred:', error.response);
        return error
    });
}


export default{
    register,
    login,
    update,
    disconnect
}