import axios from 'axios';

const headers = {
    "Content-Type": "application/json"
};

const BASE_URL = 'https://prep-buddy-backend.herokuapp.com/'


export const createInterviewExperience = async (userId, payload) => {
    try {
        const res = await axios({
            url: `${BASE_URL}/user/${userId}/interview-experiences`,
            method: 'POST',
            header: headers,
            data: payload
        })

        return res.data
    } catch (err) {
        console.error("axios catch error: ", err)

        return {}
    }
}

export const getAllInterviewExperience = async (userId) => {
    try {
        const res = await axios({
            url: `${BASE_URL}/user/${userId}/interview-experiences`,
            method: 'GET',
            header: headers,
        })
        return res.data
    } catch (err) {
        console.error("axios catch error: ", err)
        return []
    }
}

export const modifyInterviewExperience = async (userId, experienceId, payload) => {
    try {
        const res = await axios({
            url: `${BASE_URL}/user/${userId}/interview-experiences/${experienceId}`,
            method: 'PUT',
            header: headers,
            data: payload
        })

        return res.data
    } catch (err) {
        console.error("axios catch error: ", err)

        return {}
    }
}

export const deleteInterviewExperience = async (userId, experienceId) => {
    try {
        const res = await axios({
            url: `${BASE_URL}/user/${userId}/interview-experiences/${experienceId}`,
            method: 'DELETE',
            header: headers,
        })

        return true
    } catch (err) {
        console.error("axios catch error: ", err)

        return false
    }
}

export const createInterviewExperienceComment = async (userId, experienceId, payload) => {
    try {
        const res = await axios({
            url: `${BASE_URL}/user/${userId}/interview-experiences/${experienceId}/comment`,
            method: 'POST',
            header: headers,
            data: payload
        })


        return res.data
    } catch (err) {
        console.error("axios catch error: ", err)

        return {}
    }
}

export const fetchComments = async(userId, experienceId) => {
    try {
        const res = await axios({
            url: `${BASE_URL}/user/${userId}/interview-experiences/${experienceId}`,
            method: 'GET',
            header: headers,
        })

        return res.data
    } catch (err) {
        console.error("axios catch error: ", err)

        return []
    }
}

export const deleteInterviewExperienceComment = async (userId, experienceId, commentId) => {
    try {
        const res = await axios({
            url: `${BASE_URL}/user/${userId}/interview-experiences/${experienceId}/comment/${commentId}`,
            method: 'DELETE',
            header: headers,
        })
        return true
    } catch (err) {
        console.error("axios catch error: ", err)
        return false
    }
}

export const modifiyUpvotes = async (userId, experienceId, payload) => {
    try {
        const res = await axios({
            url: `${BASE_URL}/user/${userId}/interview-experiences/${experienceId}`,
            method: 'PATCH',
            header: headers,
            data: payload
        })

        return res.data
    } catch (err) {
        console.error("axios catch error: ", err)

        return {}
    }
}



