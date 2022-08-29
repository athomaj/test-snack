import axios from "axios";
import { API_URL } from "../config/config";

async function createNotification(data, contentType){
    return await axios.post(`${API_URL}/notifications`, data, contentType)
    .then(response => {
        return response.data
    })
    .catch(error => {
        return error.response
    })
}

async function update(id, data){
    return await axios.put(`${API_URL}/notifications/${id}`, data, { headers: { "Content-Type": "application/json" }})
    .then(response => {
        return response.data
    })
    .catch(error => {
        return error.response
    })
}

async function getNotification(id){
    return await axios.get(`${API_URL}/notifications/${id}?populate=*`)
    .then(response => {
        return response.data
    })
    .catch(error => {
        return error.response
    })
}

async function getNotifications(id){
    return await axios.get(`${API_URL}/notifications?populate[post][populate]=%2A&populate[user][populate]=%2A&populate[userRequest][populate]=%2A&filters[user][id][$eq]=${id}`)
    .then(response => {
        return response.data
    })
    .catch(error => {
        return error.response
    })
}

async function deleteNotification(id){
    return await axios.delete(`${API_URL}/notifications/${id}`)
    .then(response => {
        return response.data
    })
    .catch(error => {
        return error.response
    })
}

export default {
    createNotification,
    update,
    getNotification,
    getNotifications,
    deleteNotification
}