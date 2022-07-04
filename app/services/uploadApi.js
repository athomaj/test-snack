import axios from "axios";
import { API_URL } from "../config/config";

async function uploadPicture(data) {
    return axios.post(`${API_URL}/upload`, data, { headers: { "Content-Type": "multipart/form-data" } }).then(response => {
        return response.data
    }).catch(error => {
        return error.response
    })
}

export default {
    uploadPicture
}