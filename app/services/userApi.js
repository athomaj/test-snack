import axios from "axios";
import { API_URL } from "../config/config";
import { getData } from "../utils/storage";

async function getUser(id) {
    return axios.get(`${API_URL}/api/users/${id}`)
        .then(res => { return res.data }).catch(err => { return err })
}

async function getUsers() {
    return axios.get(`${API_URL}/api/users`)
        .then(res => { return res.data }).catch(err => { return err })
}

async function getMe() {
    const token = await getData("authToken")

    if (!token) {
        return null
    }
    else{
        return axios.get(`${API_URL}/api/user`).then(response => {
            console.log(response.data)
            return response.data
        }).catch(error => {
            console.log("ERR GET ME ====", error)
            return error.response
        })
    }
}

export default {
    getUser,
    getUsers,
    getMe
}