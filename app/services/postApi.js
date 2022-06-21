import axios from "axios";
import { API_URL } from "../config/config";

async function display() {
    return await axios.get(`${API_URL}/posts`, {})
        .then(response => {
            console.log('posts ==',response.data.data)
            return response.data.data
        })
        .catch(error => {
            return error.response
        });
}

export default {
    display
}