import axios from "axios";
import { API_URL } from "../config/config";
import { storeData, deleteData, getData } from "../utils/storage";

async function getAllKitchen() {
    return await axios.get(`${API_URL}/kitchens?fields[0]=name`)
        .then(async response => {
            return response.data
        })
        .catch(error => {
            console.log('ERR LOGIN ==', error.response);
            return error.response
        });
}




export default {
    getAllKitchen
}