import axios from "axios";
import jwt_decode from "jwt-decode"

import { API_URL } from "../config/config";
import { deleteData, getData } from "../utils/storage";

async function getUser(id) {
    return axios.get(`${API_URL}/users/${id}`)
        .then(res => { return res.data }).catch(err => { return err })
}

async function getUserPopulate(id) {
    return axios.get(`${API_URL}/users/${id}?populate=*`)
        .then(res => { return res.data }).catch(err => { return err })
}

async function getUsers() {
    return axios.get(`${API_URL}/users`)
        .then(res => { return res.data }).catch(err => { return err })
}

async function getUsersContactPhone() {
    return axios.get(`${API_URL}/users?fields[0]=username&fields[1]=phone&fields[3]=avatarUrl&populate[pendings][fields][0]=id`)
        .then(res => {
            return res.data
        }).catch(err => {
            console.log("ERROR GETTING USERS CONTACT ====", err)
            return null
        })
}

async function getPendingsOfSponsor(idSponsor) {
    return axios.get(`${API_URL}/users/${idSponsor}?fields=id&populate[pendings][fields][0]=id`)
        .then(res => { return res.data }).catch(err => { return err })
}

async function getMePopulate(idUser) {
    return axios.get(`${API_URL}/users/${idUser}?fields=id&populate[pendings][fields][0]=username&populate[pendings][fields][1]=avatarUrl`)
        .then(res => { return res.data }).catch(err => { return err })
}

async function getSponsorsOf(idUser) {
    return axios.get(`${API_URL}/users/${idUser}?fields=id&populate[sponsors][fields][0]=id`)
        .then(res => { return res.data }).catch(err => { return err })
}

async function getMe() {
    const token = await getData("authToken")
    if (!token) {
        return null
    }
    else {
        const decode = jwt_decode(token)
        return axios.get(`${API_URL}/users/${decode.id}?populate=*`, { headers: { Authorization: `Bearer ${token}` } }).then(response => {
            return response
        }).catch(error => {
            console.log("ERR GET ME ====", error)
            return null
        })
    }
}

async function updateUser(data, id) {
    return axios.put(`${API_URL}/users/${id}`, data).then(response => {
        return response
    }).catch(error => {
        console.log("ERR UPDATE USER ====", error.response)
        return error.response
    })
}

async function getMyCity() {
    const token = await getData("authToken")

    if (!token) {
        return null
    }
    else {
        const decode = jwt_decode(token)
        return axios.get(`${API_URL}/users/${decode.id}?fields[0]=id&populate[district][populate][city]=*`, { headers: { Authorization: `Bearer ${token}` } }).then(response => {
            return response.data.district.city
        }).catch(error => {
            console.log("ERR GET ME ====", error)
            return null
        })
    }
}
///users/28


export default {
    getUser,
    getUsers,
    getMe,
    updateUser,
    getUsersContactPhone,
    getPendingsOfSponsor,
    getMePopulate,
    getUserPopulate,
    getSponsorsOf,
    getMyCity
}