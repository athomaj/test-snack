import axios from "axios";
import { API_URL } from "../config/config";

async function uploadPicture(data) {
    // const token = await getData("authToken")

    // if (!token) {
    //     return null
    // } else {
        return axios.post(`${API_URL}/upload`, data).then(response => {
            return response.data
        }).catch(error => {
            return error.response
        })
    // }
}

export default {
    uploadPicture
}