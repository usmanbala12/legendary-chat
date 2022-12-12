import axios from 'axios'

const baseUrl = '/api/profiles'

const getAllUsers = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getUser = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const toggleFriends = async (id, data) => {
    const response = await axios.put(`/api/profiles/togglefriend/${id}`, data)
    return response.data
}

  
const uploadDp = async (formData) => {
    const response = await axios.post('https://codegeek-static-server.herokuapp.com/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    console.log('req sent')
    return response.data
}

const updateProfile = async (data) => {
    const response = await axios.put(`${baseUrl}/${data.id}`, data)
    return response.data
}

const createProfile = async (data) => {
    const response = await axios.post(baseUrl, data)
    return response.data
}

const login = async data => {
    const response = await axios.post(`${baseUrl}/login`, data)
    return response.data[0]
}

export default { uploadDp, updateProfile, createProfile, getUser, getAllUsers, toggleFriends, login }