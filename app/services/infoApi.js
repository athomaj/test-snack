import axios from "axios";
import { API_URL } from "../config/config";
import { storeData, deleteData, getData } from "../utils/storage";

async function getAllinfo() {
    return await axios.get(`${API_URL}/infos?fields[0]=name&populate[image][fields][1]=url`)
        .then(async response => {
            return response.data
        })
        .catch(error => {
            console.log('ERR LOGIN ==', error.response);
            return error.response
        });
}




export default {
    getAllinfo
}