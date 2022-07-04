import axios from "axios";
import { API_URL } from "../config/config";

async function publish(data) {
    return await axios.post(`${API_URL}/posts`, data, { headers: { "Content-Type": "application/json" } })
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response
        });
}

export default {
    publish
}