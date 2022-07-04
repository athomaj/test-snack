import axios from "axios";
import { API_URL } from "../config/config";

async function display() {
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
    display
}