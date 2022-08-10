import axios from "axios";
import { API_URL } from "../config/config";
import { storeData, deleteData, getData } from "../utils/storage";

async function getAllCities() {
    return await axios.get(`${API_URL}/cities?fields[0]=name&populate[districts][fields][0]=name`)
        .then(async response => {
            return response.data
        })
        .catch(error => {
            console.log('ERR GET ==', error.response);
            return error.response
        });
}




export default {
    getAllCities
}