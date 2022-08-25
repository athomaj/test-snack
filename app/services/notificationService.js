import axios from "axios";
import jwt_decode from "jwt-decode"

import { API_URL } from "../config/config";
import { deleteData, getData } from "../utils/storage";

async function getNotifications() {
    const token = await getData("authToken")

    if (!token) {
        return null
    }
    else {
        const decode = jwt_decode(token)
        return axios.get(`${API_URL}/users/${decode.id}?populate[notifications][populate][0]=users_permissions_user`, { headers: { Authorization: `Bearer ${token}` } }).then(response => {
            if (response.data.notifications) {
                return response.data.notifications
            } else {
                return response.data
            }
        }).catch(error => {
            deleteData("authToken")
            console.log("ERR GET ME ====", error)
            return null
        })
    }
}


export default {
    getNotifications
}