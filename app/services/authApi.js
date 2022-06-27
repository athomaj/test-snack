import axios from "axios";
import { API_URL } from "../config/config";
import { storeData, deleteData, getData } from "../utils/storage";

async function login(email, password) {
    return await axios.post(`${API_URL}/auth/local`, {
        identifier: email,
        password: password,
    })
        .then(async response => {
            await storeData('authToken', response.data.jwt + "")
            axios.defaults.headers["Authorization"] = "Bearer " + response.data.jwt
            return response
        })
        .catch(error => {
            console.log('ERR LOGIN ==', error.response);
            return error.response
        });
}

async function register(data) {
    return await axios.post(`${API_URL}/auth/local/register`, data, { headers: { "Content-Type": "application/json" } })
        .then(response => {
            storeData("authToken", response.data.jwt)
            axios.defaults.headers["Authorization"] = "Bearer " + response.data.jwt
            return response
        })
        .catch(error => {
            console.log("ERR RES REGISTER ====", error.response);
            return error.response
        });
}

async function update(username, email, id) {
    return await axios.put(`${API_URL}/users/${id}`, {
        username: username,
        email: email
    })
        .then(response => {
            return response
        })
        .catch(error => {
            console.log('An error occurred:', error.response);
            return error
        });
}

async function disconnect() {
    await deleteData("authToken")
}


export default {
    login,
    register,
    update,
    disconnect
}