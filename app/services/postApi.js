import axios from "axios";
import { API_URL } from "../config/config";

async function publish(data) {
    return await axios.get(`${API_URL}/posts`, data, { headers: { "Content-Type": "application/json" } })
        .then(response => {
            console.log('sendingPost ==',response.data.data)
            return response.data.data
        })
        .catch(error => {
            return error.response
        });
}

export default {
    publish
}