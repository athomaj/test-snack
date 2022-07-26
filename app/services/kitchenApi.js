import axios from "axios";
import { API_URL } from "../config/config";
import { storeData, deleteData, getData } from "../utils/storage";

async function getAllKitchen() {
    return await axios.get(`${API_URL}/`)
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




export default {
    getAllKitchen
}