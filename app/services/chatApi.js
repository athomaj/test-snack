import axios from "axios";
import { API_URL } from "../config/config";

async function create(data){
    return await axios.post(`${API_URL}/chats`, data, { headers: { "Content-Type": "application/json" }})
    .then(response => {
        return response.data
    })
    .catch(error => {
        return error.response
    })
}

async function createMessage(data){
    return await axios.post(`${API_URL}/messages`, data, { headers: { "Content-Type": "application/json" }})
    .then(response => {
        return response.data
    })
    .catch(error => {
        return error.response
    })
}

async function update(id, data){
    return await axios.put(`${API_URL}/chats/${id}`, data, { headers: { "Content-Type": "application/json" }})
    .then(response => {
        return response.data
    })
    .catch(error => {
        return error.response
    })
}

async function getChat(id){
    return await axios.get(`${API_URL}/chats/${id}?populate[users][populate]=%2A&populate[post][populate]=%2A&populate[messages][populate]=%2A`)
    .then(response => {
        return response.data
    })
    .catch(error => {
        return error.response
    })
}

async function getChatUsers(id){
    return await axios.get(`${API_URL}/chats/${id}?populate=*`)
    .then(response => {
        return response.data
    })
    .catch(error => {
        return error.response
    })
}

async function getChatRelatedToPostAndUser(postId, userId){
    return await axios.get(`${API_URL}/chats?populate[messages][populate]=%2A&populate[post][populate]=%2A&filters[users][id][$eq]=${userId}&filters[post][id][$eq]=${postId}`)
    .then(response => {
        return response.data
    })
    .catch(error => {
        return error.response
    })
}

async function getChats(id){
    return await axios.get(`${API_URL}/chats?populate[users][populate]=%2A&populate[post][populate]=%2A&populate[messages][populate]=%2A&filters[users][id][$eq]=${id}`)
    .then(response => {
        return response.data
    })
    .catch(error => {
        return error.response
    })
}

export default {
    create,
    createMessage,
    update,
    getChat,
    getChatUsers,
    getChatRelatedToPostAndUser,
    getChats
}