import axios from "axios";
import { API_URL } from "../config/config";

async function publish(data) {
    return await axios.post(`${API_URL}/posts`, data, { headers: { "Content-Type": "multipart/form-data" } })
        .then(response => {
            return response
        })
        .catch(error => {
            console.log("ERROR PUBLISH ==== ", error)
            return null
        });
}

async function update(id, data) {
    return await axios.put(`${API_URL}/posts/${id}`, data, { headers: { "Content-Type": "application/json" } })
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log("ERROR PUBLISH ==== ", error)
            return error
        });
}

async function getPosts() {
    return await axios.get(`${API_URL}/posts?populate=*`)
        .then(response => {
            return response.data.data
        })
        .catch(error => {
            console.log("GET POSTS ERR ====", error.response)
            return null
        });
}

async function getEvent(id) {
    return await axios.get(`${API_URL}/posts?populate=*&filters[participant][id][$contains]=${id}`)
    .then(response => {
        return response.data.data
    })
    .catch(error => {
        return error.response
    })
}

async function getOne(id) {
    return await axios.get(`${API_URL}/posts/${id}?populate=*`)
        .then(response => {
            return response.data.data
        })
        .catch(error => {
            console.log("ERROR FIND ONE POST ====", error.response)
            return null
        })
}
async function getDietOfOne(id){
    return await axios.get(`${API_URL}/posts/${id}?populate[0]=*&populate[1]=diets.image`)
        .then(response => {
            return response.data.data
        })
        .catch(error => {
            console.log("ERROR FIND ONE POST ====", error.response)
            return null
        })
}

async function getMyEvent(id) {
    return await axios.get(`${API_URL}/posts?filters[user][id][$in]=${id}&populate=*`)
    .then(response => {
        return response.data.data
    })
    .catch(error => {
        return error.response
    })
}

async function getEventbyCity(city) {
    return await axios.get(`${API_URL}/posts?filters[postalCode][city][name][$eq]=${city}&sort[0]=datetime&populate=*`)
    .then(response => {
        return response.data.data
    })
    .catch(error => {
        return error.response
    })
}
///?filters[postalCode][city][name][$eq]=Marseille&sort[0]=datetime&populate=*
export default {
    publish,
    update,
    getOne,
    getPosts,
    getEvent,
    getDietOfOne,
    getMyEvent,
    getEventbyCity
}