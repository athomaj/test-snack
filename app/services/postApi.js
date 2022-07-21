import axios from "axios";
import { API_URL } from "../config/config";

async function publish(data) {
    return await axios.post(`${API_URL}/posts`, data, { headers: { "Content-Type": "application/json" } })
        .then(response => {
            return response
        })
        .catch(error => {
            console.log("ERROR PUBLISH ==== ", error)
            return error.response
        });
}

async function getPosts() {
    return await axios.get(`${API_URL}/posts?populate=*`)
        .then(response => {
            return response.data.data
        })
        .catch(error => {
            console.log("GET POSTS ERR ====", error.response)
            return null
        });
}

export default {
    publish,
    getPosts
}